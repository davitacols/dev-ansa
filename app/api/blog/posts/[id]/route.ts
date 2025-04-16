import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  published: z.boolean().default(false),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        tags: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if post is published or user is admin
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "ADMIN"

    if (!post.published && !isAdmin) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const validatedData = postSchema.parse(data)

    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        tags: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if slug is changed and already exists
    if (validatedData.slug !== post.slug) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: validatedData.slug },
      })

      if (existingPost && existingPost.id !== params.id) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
      }
    }

    // Update the post
    const updatedPost = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt || "",
        content: validatedData.content,
        featuredImage: validatedData.featuredImage || "",
        published: validatedData.published,
        categoryId: validatedData.categoryId || null,
        tags: {
          disconnect: post.tags.map((tag) => ({ id: tag.id })),
          connect: validatedData.tags.map((tagId) => ({ id: tagId })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Delete the post
    await prisma.blogPost.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
