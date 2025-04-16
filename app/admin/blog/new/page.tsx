import { getCategories, getTags } from "@/lib/blog"
import { PostForm } from "@/components/blog/post-form"

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <div className="bg-white dark:bg-zinc-950 rounded-lg border shadow-sm p-6">
        <PostForm categories={categories} tags={tags} />
      </div>
    </div>
  )
}
