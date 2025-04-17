import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/blog"

export async function getAllCategories() {
  return prisma.category.findMany({
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
}

export async function getAllTags() {
  return prisma.tag.findMany({
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
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })
}

export async function getTagBySlug(slug: string) {
  return prisma.tag.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })
}

export async function createCategory(data: { name: string; description?: string }) {
  const slug = slugify(data.name)

  return prisma.category.create({
    data: {
      id: `cat_${Date.now().toString(36)}`,
      name: data.name,
      slug,
      description: data.description || null,
    },
  })
}

export async function updateCategory(id: string, data: { name?: string; description?: string }) {
  const updateData: any = { ...data }

  if (data.name) {
    updateData.slug = slugify(data.name)
  }

  return prisma.category.update({
    where: { id },
    data: updateData,
  })
}

export async function deleteCategory(id: string) {
  // First, update any posts with this category to have no category
  await prisma.blogPost.updateMany({
    where: { categoryId: id },
    data: { categoryId: null },
  })

  // Then delete the category
  return prisma.category.delete({
    where: { id },
  })
}

export async function createTag(data: { name: string }) {
  const slug = slugify(data.name)

  return prisma.tag.create({
    data: {
      id: `tag_${Date.now().toString(36)}`,
      name: data.name,
      slug,
    },
  })
}

export async function updateTag(id: string, data: { name: string }) {
  return prisma.tag.update({
    where: { id },
    data: {
      name: data.name,
      slug: slugify(data.name),
    },
  })
}

export async function deleteTag(id: string) {
  // First, disconnect this tag from all posts
  await prisma.$executeRaw`DELETE FROM "_BlogPostToTag" WHERE "B" = ${id};`

  // Then delete the tag
  return prisma.tag.delete({
    where: { id },
  })
}
