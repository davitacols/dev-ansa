import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const validatedData = tagSchema.parse(data)

    // Check if slug already exists
    const existingTag = await prisma.tag.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingTag) {
      return NextResponse.json({ error: "A tag with this slug already exists" }, { status: 400 })
    }

    // Create the tag
    const tag = await prisma.tag.create({
      data: validatedData,
    })

    return NextResponse.json(tag)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating tag:", error)
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(tags)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}
