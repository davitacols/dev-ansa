import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, suggestion, category } = data

    // Validate the input
    if (!name || !email || !suggestion) {
      return NextResponse.json({ success: false, message: "Name, email, and suggestion are required" }, { status: 400 })
    }

    // Store the suggestion in the database
    const newSuggestion = await prisma.featureSuggestion.create({
      data: {
        name,
        email,
        suggestion,
        category: category || "other",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your suggestion! We'll review it soon.",
      suggestion: newSuggestion,
    })
  } catch (error) {
    console.error("Error processing feature suggestion:", error)
    return NextResponse.json({ success: false, message: "Failed to process your suggestion" }, { status: 500 })
  }
}

export async function GET() {
  // Check if the user is authenticated and is an admin
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get all suggestions
  const suggestions = await prisma.featureSuggestion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json({ suggestions })
}
