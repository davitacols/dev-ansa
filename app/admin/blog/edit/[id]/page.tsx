import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getCategories, getTags } from "@/lib/blog"
import { PostForm } from "@/components/blog/post-form"

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const [post, categories, tags] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        tags: true,
      },
    }),
    getCategories(),
    getTags(),
  ])

  if (!post) {
    notFound()
  }

  const formData = {
    ...post,
    tags: post.tags.map((tag) => tag.id),
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <PostForm categories={categories} tags={tags} initialData={formData} isEditing />
    </div>
  )
}
