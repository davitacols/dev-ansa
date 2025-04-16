import { getCategories, getTags } from "@/lib/blog"
import { PostForm } from "@/components/blog/post-form"

export default async function NewBlogPostPage() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <PostForm categories={categories} tags={tags} />
    </div>
  )
}
