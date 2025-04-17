import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getBlogPostBySlug } from "@/lib/blog"
import ModernBlogPost from "@/components/blog/modern-blog-post"
import "../modern-blog.css"
import { ErrorBoundary } from "@/components/error-boundary"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    // Fetch the real post data
    const post = await getBlogPostBySlug(params.slug, true)

    if (!post) {
      notFound()
    }

    // Format the post data for the ModernBlogPost component
    const formattedPost = {
      id: post.id,
      title: post.title,
      content: post.content || "",
      excerpt: post.excerpt || "",
      slug: post.slug,
      author: {
        name: post.author?.name || "Unknown Author",
        image: post.author?.image || undefined,
      },
      publishedAt: post.createdAt?.toString() || new Date().toString(),
      updatedAt: post.updatedAt?.toString(),
      coverImage: post.featuredImage,
      tags:
        post.tags?.map((tag) => ({
          name: tag.name,
          slug: tag.slug,
        })) || [],
      category: post.category
        ? {
            name: post.category.name,
            slug: post.category.slug,
          }
        : undefined,
      readingTime: calculateReadingTime(post.content || ""),
    }

    return (
      <ErrorBoundary fallback={<BlogPostErrorFallback slug={params.slug} />}>
        <Suspense
          fallback={
            <div className="container mx-auto px-4 max-w-4xl py-12">
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
                <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              </div>
            </div>
          }
        >
          <ModernBlogPost post={formattedPost} />
        </Suspense>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return <BlogPostErrorFallback slug={params.slug} />
  }
}

// Calculate reading time based on content length
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime.toString()
}

// Error fallback component
function BlogPostErrorFallback({ slug }: { slug: string }) {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Error Loading Blog Post</h1>
        <p className="text-red-700 dark:text-red-300 mb-4">
          We encountered an error while trying to load the blog post "{slug}". This could be due to:
        </p>
        <ul className="list-disc list-inside text-red-700 dark:text-red-300 mb-4">
          <li>A temporary server issue</li>
          <li>The post content being unavailable</li>
          <li>An issue with the post format</li>
        </ul>
        <p className="text-red-700 dark:text-red-300">
          Please try again later or contact the site administrator if the problem persists.
        </p>
        <div className="mt-6">
          <a
            href="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Return to Blog
          </a>
        </div>
      </div>
    </div>
  )
}
