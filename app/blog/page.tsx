import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getBlogPosts, getCategories, getTags } from "@/lib/blog"
import { Pagination } from "@/components/blog/pagination"
import { ChevronRight, Filter, Search, FolderTreeIcon as FileTree } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog | ANSA File Structure",
  description: "Latest news, tutorials, and updates about ANSA File Structure",
}

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
    tag?: string
    q?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1
  const pageSize = 9
  const skip = (page - 1) * pageSize

  // Extract search parameters
  const categorySlug = searchParams.category
  const tagSlug = searchParams.tag
  const searchQuery = searchParams.q

  const { posts, total } = await getBlogPosts({
    take: pageSize,
    skip,
    categorySlug,
    tagSlug,
    searchQuery,
  }).catch(() => ({ posts: [], total: 0 }))

  const categories = await getCategories().catch(() => [])
  const tags = await getTags().catch(() => [])
  const totalPages = Math.ceil(total / pageSize)

  // Define active category and tag names for breadcrumbs
  const activeCategory = categories.find((c) => c.slug === categorySlug)
  const activeTag = tags.find((t) => t.slug === tagSlug)
  const hasFilters = categorySlug || tagSlug || searchQuery

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section with emerald/teal gradient background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-emerald-950/30">
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="container relative px-4 py-24 mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileTree className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              ansa-fs
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-500 dark:from-emerald-300 dark:to-teal-400">
            Explore Our Blog
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Discover the latest insights, tutorials, and updates about ANSA File Structure
          </p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 py-12 mx-auto max-w-7xl">
        {/* Search & Filter Bar */}
        <div className="p-4 mb-8 bg-white border rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <form action="/blog" method="get">
                {/* Preserve existing filters when searching */}
                {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
                {tagSlug && <input type="hidden" name="tag" value={tagSlug} />}
                <div className="relative">
                  <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search articles..."
                    defaultValue={searchQuery || ""}
                    className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    category.slug === categorySlug
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
                  )}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/blog/categories"
                className="flex items-center px-3 py-1.5 text-sm font-medium bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Filter className="w-4 h-4 mr-1" />
                More Filters
              </Link>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        {hasFilters && (
          <div className="flex items-center p-2 mb-6 overflow-x-auto text-sm text-gray-500 rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:text-gray-300">
            <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            {activeCategory && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">{activeCategory.name}</span>
              </>
            )}
            {activeTag && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">#{activeTag.name}</span>
              </>
            )}
            {searchQuery && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">"{searchQuery}"</span>
              </>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Blog Posts */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="overflow-hidden duration-200 transform bg-white border rounded-xl h-80 animate-pulse dark:bg-gray-800 dark:border-gray-700"
                      ></div>
                    ))}
                </div>
              }
            >
              {posts.length > 0 ? (
                <>
                  {/* Featured Post */}
                  {posts[0] && (
                    <div className="p-1 mb-12 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                      <div className="p-6 bg-white rounded-lg dark:bg-gray-900">
                        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
                          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            {posts[0].featuredImage ? (
                              <Image
                                src={posts[0].featuredImage || "/placeholder.svg"}
                                alt={posts[0].title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-gray-400">
                                <span>No image</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full dark:bg-emerald-900/40 dark:text-emerald-300">
                              Featured
                            </span>
                            <h2 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
                              <Link
                                href={`/blog/${posts[0].slug}`}
                                className="hover:text-emerald-600 dark:hover:text-emerald-400"
                              >
                                {posts[0].title}
                              </Link>
                            </h2>
                            <p className="mb-4 text-gray-600 line-clamp-3 dark:text-gray-300">{posts[0].excerpt}</p>
                            <div className="flex items-center mt-auto">
                              <div className="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                                {posts[0].author?.image ? (
                                  <Image
                                    src={posts[0].author.image || "/placeholder.svg"}
                                    alt={posts[0].author.name || "Author"}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                                    <span>{posts[0].author?.name?.charAt(0) || "A"}</span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {posts[0].author?.name || "Anonymous"}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(posts[0].createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Regular Posts Grid */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {posts.slice(1).map((post) => (
                      <div
                        key={post.id}
                        className="overflow-hidden transition-transform duration-200 bg-white border rounded-xl hover:shadow-md hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800"
                      >
                        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-400">
                              <span>No image</span>
                            </div>
                          )}
                          {post.category && (
                            <Link
                              href={`/blog?category=${post.category.slug}`}
                              className="absolute px-3 py-1 text-xs font-medium text-white bg-emerald-600 rounded-full top-4 left-4 hover:bg-emerald-700"
                            >
                              {post.category.name}
                            </Link>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="mb-2 text-xl font-bold">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="mb-4 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">{post.excerpt}</p>
                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                                {post.author?.image ? (
                                  <Image
                                    src={post.author.image || "/placeholder.svg"}
                                    alt={post.author.name || "Author"}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                                    <span>{post.author?.name?.charAt(0) || "A"}</span>
                                  </div>
                                )}
                              </div>
                              <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                                {post.author?.name || "Anonymous"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    basePath={`/blog${
                      hasFilters
                        ? `?${new URLSearchParams({
                            ...(categorySlug ? { category: categorySlug } : {}),
                            ...(tagSlug ? { tag: tagSlug } : {}),
                            ...(searchQuery ? { q: searchQuery } : {}),
                          }).toString()}`
                        : ""
                    }`}
                    className="mt-12"
                  />
                </>
              ) : (
                <div className="flex flex-col items-center p-12 text-center bg-white border rounded-xl dark:bg-gray-900 dark:border-gray-800">
                  <div className="p-6 mb-6 text-emerald-600 bg-emerald-100 rounded-full dark:bg-emerald-900/40 dark:text-emerald-300">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21 21L15 15M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold">No posts found</h3>
                  <p className="mb-8 text-gray-600 dark:text-gray-300">
                    Try changing your search criteria or check back later.
                  </p>
                  <Link
                    href="/blog"
                    className="px-6 py-3 text-white transition-colors bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    View all posts
                  </Link>
                </div>
              )}
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-20">
              <div className="p-6 bg-white border rounded-xl dark:bg-gray-900 dark:border-gray-800">
                <h3 className="mb-6 text-lg font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 rounded-lg transition-colors",
                        category.slug === categorySlug
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800",
                      )}
                    >
                      <span>{category.name}</span>
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-800">
                        {category._count?.posts || 0}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="h-px my-6 bg-gray-200 dark:bg-gray-700"></div>

                <h3 className="mb-4 text-lg font-medium">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full transition-colors",
                        tag.slug === tagSlug
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
                      )}
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>

                <div className="h-px my-6 bg-gray-200 dark:bg-gray-700"></div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800">
                  <h4 className="mb-2 text-base font-medium">Subscribe to our newsletter</h4>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    Stay updated with our latest articles and tutorials.
                  </p>
                  <form action="/api/newsletter/subscribe" method="post">
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-emerald-600 rounded-lg hover:bg-emerald-700"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
