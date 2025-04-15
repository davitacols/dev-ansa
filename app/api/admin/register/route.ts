import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Validation schema for admin registration
const adminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  secretKey: z.string(),
})

// This is a secret key that only authorized people should know
// In production, this should be an environment variable
const ADMIN_SECRET_KEY = "ansa-fs-admin-2025"

export async function POST(request: NextRequest) {
  try {
    // Check if the user is already authenticated and is an admin
    const session = await getServerSession(authOptions)

    // Only allow admin users or users with the correct secret key to create new admins
    const requireSecretKey = !session || session.user.role !== "ADMIN"

    const data = await request.json()

    // Validate the input data
    const validationResult = adminSchema.safeParse(data)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { name, email, password, secretKey } = validationResult.data

    // If not an admin, verify the secret key
    if (requireSecretKey && secretKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json({ success: false, message: "Invalid secret key" }, { status: 403 })
    }

    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the new admin user
    const newAdmin = await prisma.user.create({
      data: {
        id: `admin_${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: newAdmin,
    })
  } catch (error) {
    console.error("Error creating admin user:", error)
    return NextResponse.json({ success: false, message: "Failed to create admin user" }, { status: 500 })
  }
}
