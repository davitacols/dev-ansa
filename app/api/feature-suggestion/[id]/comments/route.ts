import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const data = await request.json()
    const { content } = data

    // Validate the input
    if (!content) {
      return NextResponse.json({ success: false, message: "Comment content is required" }, { status: 400 })
    }

    // Create the comment
    const comment = await prisma.suggestionComment.create({
      data: {
        content,
        authorId: session.user.id,
        suggestionId: id,
      },
    })

    return NextResponse.json({
      success: true,
      comment,
    })
  } catch (error) {
    console.error("Error adding comment:", error)
    return NextResponse.json({ success: false, message: "Failed to add comment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get all comments for the suggestion
    const comments = await prisma.suggestionComment.findMany({
      where: {
        suggestionId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch comments" }, { status: 500 })
  }
}
