import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Auth attempt for:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
      
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
      
          console.log("User found:", !!user);
          
          if (!user || !user.password) {
            console.log("User not found or no password");
            return null;
          }
      
          // Log the password hash for debugging (remove in production)
          console.log("Stored password hash:", user.password);
          console.log("Attempting to compare with provided password");
          
          const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
          console.log("Password match:", isCorrectPassword);
      
          if (!isCorrectPassword) {
            console.log("Password incorrect");
            return null;
          }
      
          console.log("Authentication successful");
          return user;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      try {
        // If user exists in the token flow, it's a new sign-in
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.image,
            role: user.role,
          };
        }

        // For existing sessions, fetch fresh user data
        const dbUser = await prisma.user.findUnique({
          where: {
            email: token.email as string,
          },
        });

        if (!dbUser) {
          console.warn(`JWT warning: No database user found for ${token.email}`);
          return token;
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          role: dbUser.role,
        };
      } catch (error) {
        console.error("JWT error:", error);
        return token;
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};