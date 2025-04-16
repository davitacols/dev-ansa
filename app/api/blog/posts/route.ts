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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const validatedData = postSchema.parse(data)

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    // Create the post
    const post = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt || "",
        content: validatedData.content,
        featuredImage: validatedData.featuredImage || "",
        published: validatedData.published,
        authorId: session.user.id,
        categoryId: validatedData.categoryId || null,
        tags: {
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

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const categorySlug = searchParams.get("category") || undefined
    const tagSlug = searchParams.get("tag") || undefined
    const publishedParam = searchParams.get("published")

    // Check if user is admin to see unpublished posts
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "ADMIN"

    // Only admins can see unpublished posts
    const published = isAdmin && publishedParam !== null ? publishedParam === "true" : true

    // Build the where clause based on filters
    const where: any = {}

    if (published !== undefined) {
      where.published = published
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      }
    }

    if (tagSlug) {
      where.tags = {
        some: {
          slug: tagSlug,
        },
      }
    }

    const skip = (page - 1) * limit

    // Get posts with pagination
    const posts = await prisma.blogPost.findMany({
      where,
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.blogPost.count({ where })

    return NextResponse.json({
      posts,
      pagination: {
        total,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
