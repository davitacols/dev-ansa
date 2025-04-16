import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const commentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1, "Comment cannot be empty"),
  parentId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const validatedData = commentSchema.parse(data)

    // Check if the post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: validatedData.postId },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if parent comment exists if parentId is provided
    if (validatedData.parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: validatedData.parentId },
      })

      if (!parentComment) {
        return NextResponse.json({ error: "Parent comment not found" }, { status: 404 })
      }
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        authorId: session.user.id,
        postId: validatedData.postId,
        parentId: validatedData.parentId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
