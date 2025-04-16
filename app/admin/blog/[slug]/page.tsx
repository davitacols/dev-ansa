import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPostBySlug, getRecentPosts } from "@/lib/blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { CommentForm } from "@/components/blog/comment-form"
import { CommentList } from "@/components/blog/comment-list"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, true)

  if (!post || (!post.published && process.env.NODE_ENV !== "development")) {
    notFound()
  }

  const recentPosts = await getRecentPosts(3)

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                <span>
                  By <span className="font-medium text-zinc-900 dark:text-zinc-50">{post.author.name || "Admin"}</span>
                </span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                {post.category && (
                  <span>
                    In{" "}
                    <Link
                      href={`/blog/category/${post.category.slug}`}
                      className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline"
                    >
                      {post.category.name}
                    </Link>
                  </span>
                )}
                <span>{post._count?.comments || 0} comments</span>
              </div>
              {post.featuredImage && (
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                  />
                </div>
              )}
              {post.excerpt && <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">{post.excerpt}</p>}
            </header>

            <div
              className="prose prose-zinc dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="border-t pt-6 mt-12">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    <Link href={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                  </Badge>
                ))}
              </div>
            </footer>
          </article>

          <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Comments</h2>
            <CommentForm postId={post.id} />
            <CommentList comments={post.comments} />
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentPosts
                  .filter((recentPost) => recentPost.id !== post.id)
                  .map((recentPost) => (
                    <li key={recentPost.id}>
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className="text-zinc-900 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400 font-medium"
                      >
                        {recentPost.title}
                      </Link>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {formatDistanceToNow(new Date(recentPost.createdAt), { addSuffix: true })}
                      </p>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
