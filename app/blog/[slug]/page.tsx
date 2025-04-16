import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/blog"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { CommentSection } from "@/components/blog/comment-section"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MessageSquare, Share2, ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug, true)

  if (!post) {
    notFound()
  }

  // Get related posts based on category and tags
  const relatedPosts = await getRelatedPosts(
    post.id,
    post.categoryId || undefined,
    post.tags?.map((tag) => tag.id) || [],
    3,
  )

  // Estimate reading time (average reading speed: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        {/* Back to blog link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        {/* Post header */}
        <div className="mb-8">
          {post.category && (
            <Link href={`/blog?category=${post.category.slug}`}>
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60">
                {post.category.name}
              </Badge>
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>

          {post.excerpt && <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {/* Author info */}
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={post.author?.image || undefined} alt={post.author?.name || "Author"} />
                <AvatarFallback>{post.author?.name?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <span>{post.author?.name || "Anonymous"}</span>
            </div>

            {/* Date */}
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <time dateTime={post.createdAt.toISOString()}>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </time>
            </div>

            {/* Reading time */}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readingTime} min read</span>
            </div>

            {/* Comment count */}
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post._count?.comments || 0} comments</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-10">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post content */}
        <div className="mb-12">
          <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 dark:bg-gray-800 rounded-md"></div>}>
            <MarkdownRenderer content={post.content} className="prose-lg" />
          </Suspense>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                  <Badge variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    #{tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share buttons */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block overflow-hidden rounded-lg border bg-white dark:bg-gray-950 dark:border-gray-800 hover:shadow-md transition-all"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments section */}
        <CommentSection postId={post.id} comments={post.comments || []} className="mb-12" />
      </div>
    </div>
  )
}
