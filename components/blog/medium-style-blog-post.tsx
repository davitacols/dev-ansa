"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  ArrowLeft,
  Bookmark,
  Share2,
  Hand,
  Twitter,
  Facebook,
  Linkedin,
  LinkIcon,
  MessageCircle,
  AlertTriangle,
  Bell,
  Menu,
  Search,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Simple comment section component
function SimpleCommentSection({ postId, comments = [] }) {
  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4 last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{comment.author || "Anonymous"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {comment.createdAt ? format(new Date(comment.createdAt), "MMM d, yyyy") : "Recently"}
                </p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-300">{comment.content}</p>
          </div>
        ))
      )}

      <div className="mt-6">
        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800"
          placeholder="Write a response..."
          rows={4}
        />
        <div className="flex justify-end mt-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Submit</Button>
        </div>
      </div>
    </div>
  )
}

// Client components for interactive elements
function ClapButton({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)
  const [clapped, setClapped] = useState(false)

  const handleClap = () => {
    setCount((prev) => prev + 1)
    setClapped(true)
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClap}
        className={`group flex flex-col items-center justify-center p-2 rounded-full transition-all ${
          clapped
            ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <Hand
          className={`h-6 w-6 ${clapped ? "fill-green-600 dark:fill-green-400" : "group-hover:fill-gray-300 dark:group-hover:fill-gray-600"}`}
        />
      </button>
      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{count}</span>
    </div>
  )
}

function FollowButton({ authorName }) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <Button
      onClick={() => setIsFollowing(!isFollowing)}
      className={`rounded-full text-sm px-4 transition-all ${
        isFollowing
          ? "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
          : "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
      }`}
      size="sm"
    >
      {isFollowing ? (
        <>
          <Bell className="h-4 w-4 mr-1" /> Following
        </>
      ) : (
        "Follow"
      )}
    </Button>
  )
}

function SaveButton() {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <Button onClick={() => setIsSaved(!isSaved)} variant="ghost" size="sm" className="p-2 rounded-full">
      <Bookmark className={`h-5 w-5 transition-all ${isSaved ? "fill-gray-800 dark:fill-gray-200" : ""}`} />
    </Button>
  )
}

function SocialSharePanel({ url, title }) {
  return (
    <div className="flex items-center gap-3">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-500 hover:text-blue-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Twitter className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Share on Twitter</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Facebook className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Share on Facebook</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-500 hover:text-blue-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Linkedin className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Share on LinkedIn</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <LinkIcon className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Copy link</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

// Main page component
export default function MediumStyleBlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>
  }

  // Safely calculate reading time - handle potential null/undefined content
  const wordCount = post.content ? post.content.split(/\s+/).length : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Format dates for display
  const publishedDate = post.publishedAt || post.createdAt
  const formattedPublishDate = format(new Date(publishedDate), "MMMM d, yyyy")
  const postUrl = `/blog/${post.slug}`

  return (
    <>
      {/* Medium-style top navigation */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-screen-xl flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              ANSA
            </Link>

            <div className="hidden md:flex items-center border rounded-full bg-gray-50 dark:bg-gray-900 px-3 py-2 w-64">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="inline mr-1 h-4 w-4" />
              <span className="hidden md:inline">Back to stories</span>
            </Link>

            <Button variant="ghost" className="rounded-full" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full hidden md:block">
              Write
            </Button>

            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 min-h-screen pb-20">
        {/* Medium-style floating sidebar with claps and share */}
        <div className="hidden lg:flex fixed left-1/12 top-1/3 flex-col gap-6 items-center">
          <ClapButton initialCount={127} />
          <div className="h-px w-6 bg-gray-200 dark:bg-gray-700 my-2"></div>
          <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bookmark className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 md:px-0 max-w-[728px]">
          {/* Article Header */}
          <header className="mt-12 mb-8">
            {post.category && (
              <Link href={`/blog?category=${post.category.slug}`}>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3 inline-block">
                  {post.category.name}
                </span>
              </Link>
            )}

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 font-serif">{post.title}</h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-serif leading-relaxed">{post.excerpt}</p>
            )}

            {/* Author + Meta info (Medium style) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3 border">
                  <AvatarImage src={post.author?.image || undefined} alt={post.author?.name || "Author"} />
                  <AvatarFallback>{post.author?.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/author/${post.author?.id}`} className="font-medium hover:underline">
                      {post.author?.name || "Anonymous"}
                    </Link>
                    <FollowButton authorName={post.author?.name || "Anonymous"} />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <time dateTime={publishedDate.toISOString()}>{formattedPublishDate}</time>
                    <span>·</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{readingTime} min read</span>
                    </div>
                    {post.isMemberOnly && (
                      <Badge className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-700 text-xs px-2 py-0.5 rounded">
                        <span className="mr-1">⭐</span> Member only
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <SaveButton />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2 rounded-full">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="p-2">
                        <SocialSharePanel url={postUrl} title={post.title} />
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button variant="ghost" size="sm" className="p-2 rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured image (full width like Medium) */}
          {post.featuredImage && (
            <div className="mb-12 -mx-4 md:-mx-16 lg:-mx-24">
              <div className="relative aspect-[2/1] w-full">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {post.featuredImageCaption && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                  {post.featuredImageCaption}
                </div>
              )}
            </div>
          )}

          {/* Medium-style article reactions - mobile only */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <div className="flex items-center gap-4">
              <ClapButton initialCount={127} />
              <button className="text-gray-500">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-500">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="text-gray-500">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Post content */}
          <article className="mb-16">{post.content && <MarkdownRenderer content={post.content} />}</article>

          {/* Medium-style highlight callout */}
          {post.highlightQuote && (
            <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-6 my-12 rounded-r">
              <p className="text-xl font-serif italic text-gray-800 dark:text-gray-200">"{post.highlightQuote}"</p>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-16">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                    <span
                      className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                      text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Medium-style clap and share section */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-16">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <ClapButton initialCount={127} />
                <p className="text-sm text-gray-500 dark:text-gray-400">Did you find this article valuable?</p>
              </div>
              <SocialSharePanel url={postUrl} title={post.title} />
            </div>
          </div>

          {/* Author bio with Medium style */}
          <div className="mb-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={post.author?.image || "/placeholder.svg"} alt={post.author?.name || "Author"} />
                  <AvatarFallback className="text-lg">{post.author?.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{post.author?.name || "Anonymous"}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      {post.author?.followers || 123} Followers
                    </p>
                  </div>
                  <FollowButton authorName={post.author?.name || "Anonymous"} />
                </div>

                <p className="text-gray-800 dark:text-gray-300 mb-4 mt-4">
                  {post.author?.bio ||
                    "Writer with a passion for technology, design, and making complex ideas accessible to everyone. Follow me for more articles on UX, development, and digital trends."}
                </p>

                <Link
                  href={`/author/${post.author?.id}`}
                  className="text-emerald-600 dark:text-emerald-400 text-sm hover:underline"
                >
                  More from {post.author?.name || "Anonymous"}
                </Link>
              </div>
            </div>
          </div>

          {/* Comments section - Medium style */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Responses ({post._count?.comments || 0})</h2>
              <Button variant="outline" className="rounded-full">
                Write a response
              </Button>
            </div>

            <SimpleCommentSection postId={post.id} comments={post.comments || []} />
          </div>
        </div>
      </div>

      {/* Medium-style bottom navigation bar (mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t dark:border-gray-800 py-3 px-4 z-20">
        <div className="flex justify-between items-center">
          <button className="p-2 text-gray-600 dark:text-gray-400">
            <Home className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400">
            <Search className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400">
            <Bookmark className="h-6 w-6" />
          </button>
          <button className="p-2 text-emerald-600 dark:text-emerald-400">
            <AlertTriangle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  )
}
