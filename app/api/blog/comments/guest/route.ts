import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { postId, name, email, content, parentId } = await request.json()

    if (!postId || !name || !email || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Find or create a guest user
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Create a new guest user
      user = await prisma.user.create({
        data: {
          name,
          email,
          role: "USER",
        },
      })
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: user.id } },
        ...(parentId && { parent: { connect: { id: parentId } } }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error("Error creating guest comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
