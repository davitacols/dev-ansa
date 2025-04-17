"use client"

import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { BlogPostContent } from "./blog-post-content"
import { ReadingProgress } from "@/components/reading-progress"
import { ShareButton } from "./share-button"
import type { Tag } from "@/lib/category-tag"
import { CategoryTag, CategoryTagList } from "@/components/blog/category-tag"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  author: {
    name: string
    image?: string
  }
  publishedAt?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  coverImage?: string
  tags?: Tag[]
  readingTime?: string
  category?: {
    name: string
    slug: string
  }
}

interface ModernBlogPostProps {
  post: BlogPost
}

export default function ModernBlogPost({ post }: ModernBlogPostProps) {
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Post Not Available</h1>
          <p className="text-red-700 dark:text-red-300">The requested blog post could not be loaded.</p>
          <div className="mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Return to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const dateValue = post.publishedAt || post.createdAt || post.updatedAt
  let formattedDate = ""

  if (dateValue) {
    try {
      const publishedDate = new Date(dateValue)
      // Check if the date is valid
      if (!isNaN(publishedDate.getTime())) {
        formattedDate = formatDistanceToNow(publishedDate, { addSuffix: true })
      } else {
        formattedDate = "Date unavailable"
      }
    } catch (error) {
      console.error("Error formatting date:", error)
      formattedDate = "Date unavailable"
    }
  } else {
    formattedDate = "Date unavailable"
  }

  // Create the post URL
  const postUrl = `/blog/${post.slug}`

  return (
    <>
      <ReadingProgress />
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 font-heading">{post.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6 text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              {post.author?.image && (
                <Image
                  src={post.author.image || "/placeholder.svg"}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{post.author?.name || "Unknown Author"}</p>
                <p className="text-sm">{formattedDate}</p>
              </div>
            </div>

            {post.readingTime && (
              <div className="text-sm md:ml-auto flex items-center">
                <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2 md:hidden"></span>
                <span>{post.readingTime} min read</span>
              </div>
            )}

            <div className="md:ml-auto">
              <ShareButton title={post.title} url={postUrl} description={post.excerpt} />
            </div>
          </div>

          {post.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {post.category && (
            <div className="mb-4">
              <CategoryTag type="category" name={post.category.name} slug={post.category.slug} />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <CategoryTagList type="tag" items={post.tags} size="sm" />
            </div>
          )}
        </header>

        <BlogPostContent content={post.content} />

        <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold mb-2">About the author</h3>
              <div className="flex items-center gap-3">
                {post.author?.image && (
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <p className="font-medium">{post.author?.name || "Unknown Author"}</p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <ShareButton title={post.title} url={postUrl} description={post.excerpt} />
              <Link href="/blog" className="text-primary hover:text-primary/80 text-sm font-medium">
                ← Back to all posts
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </>
  )
}
