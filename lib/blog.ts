import { prisma } from "@/lib/prisma"

export type BlogPostWithRelations = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  featuredImage?: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  viewCount: number
  authorId: string
  categoryId?: string | null
  author?: {
    id: string
    name?: string | null
    image?: string | null
  }
  category?: {
    id: string
    name: string
    slug: string
    description?: string | null
  } | null
  tags?: {
    id: string
    name: string
    slug: string
  }[]
  comments?: any[]
  _count?: {
    comments: number
  }
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
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
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getTags() {
  try {
    return await prisma.tag.findMany({
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
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

export async function getBlogPosts({
  take = 10,
  skip = 0,
  categorySlug,
  tagSlug,
  searchQuery,
  published,
}: {
  take?: number
  skip?: number
  categorySlug?: string
  tagSlug?: string
  searchQuery?: string
  published?: boolean
} = {}) {
  try {
    // Build the where clause based on filters
    const where: any = {
      published: published,
    }

    // Add category filter if provided
    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      }
    }

    // Add search query if provided
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { excerpt: { contains: searchQuery, mode: "insensitive" } },
        { content: { contains: searchQuery, mode: "insensitive" } },
      ]
    }

    let posts
    let total

    if (tagSlug) {
      // When filtering by tag, we need to use a different query
      posts = await prisma.blogPost.findMany({
        where: {
          ...where,
          tags: {
            some: {
              slug: tagSlug,
            },
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
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take,
        skip,
      })

      total = await prisma.blogPost.count({
        where: {
          ...where,
          tags: {
            some: {
              slug: tagSlug,
            },
          },
        },
      })
    } else {
      // Standard query without tag filtering
      posts = await prisma.blogPost.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
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
        take,
        skip,
      })

      total = await prisma.blogPost.count({ where })
    }

    return { posts, total }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { posts: [], total: 0 }
  }
}

export async function getBlogPostBySlug(slug: string, incrementViewCount = false) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
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
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    if (!post) {
      return null
    }

    if (incrementViewCount) {
      try {
        await prisma.blogPost.update({
          where: { id: post.id },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        })
      } catch (error) {
        console.error("Error incrementing view count:", error)
        // Continue even if view count update fails
      }
    }

    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function getRecentPosts(limit = 5) {
  try {
    return await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
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
  } catch (error) {
    console.error("Error fetching recent posts:", error)
    return []
  }
}

export async function getPopularPosts(limit = 5) {
  try {
    return await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      take: limit,
      orderBy: {
        viewCount: "desc",
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
  } catch (error) {
    console.error("Error fetching popular posts:", error)
    return []
  }
}

export async function getRelatedPosts(postId: string, categoryId?: string, tagIds?: string[], limit = 3) {
  try {
    const where: any = {
      id: { not: postId },
      published: true,
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (tagIds && tagIds.length > 0) {
      where.tags = {
        some: {
          id: {
            in: tagIds,
          },
        },
      }
    }

    return await prisma.blogPost.findMany({
      where,
      take: limit,
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
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}
