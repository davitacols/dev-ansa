import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // Allow access to the registration page without authentication
  if (request.nextUrl.pathname === "/admin/register") {
    return NextResponse.next()
  }

  // Check if the request is for the admin dashboard
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // If not logged in, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // If logged in but not an admin, redirect to home
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

// Update the matcher to only protect admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
