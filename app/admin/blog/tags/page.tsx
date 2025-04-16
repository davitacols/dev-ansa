import { getTags } from "@/lib/blog"
import { TagForm } from "@/components/blog/tag-form"
import { TagList } from "@/components/blog/tag-list"

export default async function TagsPage() {
  const tags = await getTags()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Manage blog tags</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TagForm />
        <TagList tags={tags} />
      </div>
    </div>
  )
}
