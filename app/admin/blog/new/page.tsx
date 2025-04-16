import Link from "next/link"
import { getPosts } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Eye, EyeOff } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function BlogAdminPage() {
  const { posts } = await getPosts({ published: undefined })

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{post.title}</h3>
                      {post.published ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <Eye className="mr-1 h-3 w-3" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>
                        {post.category ? (
                          <Link href={`/blog/category/${post.category.slug}`} className="hover:underline">
                            {post.category.name}
                          </Link>
                        ) : (
                          "Uncategorized"
                        )}
                      </span>
                      <span>
                        {post.createdAt
                          ? `Created ${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}`
                          : ""}
                      </span>
                      <span>{post._count.comments} comments</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.slug}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">View</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
                <p>No blog posts found. Create your first post!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
