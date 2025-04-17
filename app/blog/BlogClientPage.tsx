"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { fetchBlogPosts, fetchCategories, fetchTags, fetchRelatedPosts } from "@/app/actions/blog-actions"
import { Pagination } from "@/components/blog/pagination"
import {
  ChevronRight,
  Filter,
  Search,
  FolderTreeIcon as FileTree,
  Clock,
  Share2,
  Bookmark,
  Moon,
  Sun,
  BookOpen,
  ArrowRight,
  Heart,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination as SwiperPagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useInView } from "react-intersection-observer"

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
    tag?: string
    q?: string
    sort?: string
    view?: string
  }
}

// Function to estimate reading time
const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200
  const words = text?.trim().split(/\s+/).length || 0
  return Math.ceil(words / wordsPerMinute)
}

export default function BlogClientPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1
  const pageSize = 9
  const skip = (page - 1) * pageSize

  // Extract search parameters
  const categorySlug = searchParams.category
  const tagSlug = searchParams.tag
  const searchQuery = searchParams.q
  const sort = searchParams.sort || "newest"
  const viewMode = searchParams.view || "grid"

  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeTag, setActiveTag] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [hasFilters, setHasFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch posts using server action
        const { posts: fetchedPosts, total: fetchedTotal } = await fetchBlogPosts({
          take: pageSize,
          skip,
          categorySlug,
          tagSlug,
          searchQuery,
          published: true,
        })

        setPosts(fetchedPosts)
        setTotal(fetchedTotal)
        setTotalPages(Math.ceil(fetchedTotal / pageSize))

        // Fetch categories using server action
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)

        // Fetch tags using server action
        const fetchedTags = await fetchTags()
        setTags(fetchedTags)

        // Set active filters
        setActiveCategory(fetchedCategories.find((c) => c.slug === categorySlug) || null)
        setActiveTag(fetchedTags.find((t) => t.slug === tagSlug) || null)
        setHasFilters(Boolean(categorySlug || tagSlug || searchQuery))

        // Only fetch related posts if we have posts
        if (fetchedPosts.length > 0) {
          const fetchedRelatedPosts = await fetchRelatedPosts(
            fetchedPosts[0].id,
            fetchedPosts[0].categoryId,
            fetchedPosts[0].tags?.map((tag) => tag.id),
            3,
          )
          setRelatedPosts(fetchedRelatedPosts)
        }
      } catch (err) {
        console.error("Error fetching blog data:", err)
        setError("Failed to load blog content. Please try again later.")
        setPosts([])
        setTotal(0)
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchParams, skip, pageSize, categorySlug, tagSlug, searchQuery, sort])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
        {/* Theme Toggle - Client Component Wrapper */}
        <ThemeToggle />

        {/* Hero Section with parallax effect and animated gradient background */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-teal-50/90 to-emerald-100/90 dark:from-emerald-950/80 dark:via-teal-950/80 dark:to-emerald-950/80 transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] motion-safe:animate-subtle-grid"></div>
          </div>
          <ParallaxHero />
          <div className="container relative px-4 py-24 mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <FileTree className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
              <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                ansa-fs
              </span>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-500 dark:from-emerald-300 dark:to-teal-400"
            >
              Explore Our Blog
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              Discover the latest insights, tutorials, and updates about ANSA File Structure
            </motion.p>
          </div>
        </div>

        <div className="container px-4 sm:px-6 py-12 mx-auto max-w-7xl">
          {/* Enhanced Search & Filter Bar with View Toggle */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-4 mb-8 bg-white border rounded-xl shadow-sm dark:bg-gray-900/80 dark:border-gray-800 backdrop-blur-sm"
          >
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <form action="/blog" method="get">
                  {/* Preserve existing filters when searching */}
                  {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
                  {tagSlug && <input type="hidden" name="tag" value={tagSlug} />}
                  {sort && <input type="hidden" name="sort" value={sort} />}
                  {viewMode && <input type="hidden" name="view" value={viewMode} />}
                  <div className="relative">
                    <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="q"
                      placeholder="Search articles..."
                      defaultValue={searchQuery || ""}
                      className="w-full h-12 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
                    />
                  </div>
                </form>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CategoryDropdown categories={categories} activeCategory={activeCategory} />
                <SortSelector currentSort={sort} />
                <ViewToggle currentView={viewMode} />
              </div>
            </div>
          </motion.div>

          {/* Breadcrumbs with animated transitions */}
          <AnimatePresence>
            {hasFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center p-2 mb-6 overflow-x-auto text-sm text-gray-500 rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:text-gray-300"
              >
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
                {hasFilters && (
                  <Link
                    href="/blog"
                    className="ml-auto px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear filters
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Blog Posts */}
            <div className="lg:col-span-8 xl:col-span-9">
              {error ? (
                <ErrorDisplay message={error} />
              ) : isLoading ? (
                <SkeletonLoader count={6} />
              ) : posts.length > 0 ? (
                <>
                  {/* Featured Post with Glass Morphism */}
                  {posts[0] && <FeaturedPost post={posts[0]} estimateReadingTime={estimateReadingTime} />}

                  {/* View Mode Toggle Display */}
                  {viewMode === "grid" ? (
                    <PostsGrid posts={posts.slice(1)} estimateReadingTime={estimateReadingTime} />
                  ) : (
                    <PostsList posts={posts.slice(1)} estimateReadingTime={estimateReadingTime} />
                  )}

                  {/* Enhanced Pagination with either pagination or infinite scroll */}
                  <PaginationOrInfiniteScroll
                    currentPage={page}
                    totalPages={totalPages}
                    basePath={`/blog${
                      hasFilters
                        ? `?${new URLSearchParams({
                            ...(categorySlug ? { category: categorySlug } : {}),
                            ...(tagSlug ? { tag: tagSlug } : {}),
                            ...(searchQuery ? { q: searchQuery } : {}),
                            ...(sort ? { sort } : {}),
                            ...(viewMode ? { view: viewMode } : {}),
                          }).toString()}`
                        : ""
                    }`}
                  />
                </>
              ) : (
                <NoPostsFound />
              )}
            </div>

            {/* Enhanced Sidebar with Sticky Behavior */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-20 space-y-6">
                {/* Main Sidebar Content */}
                <div className="p-6 bg-white border rounded-xl dark:bg-gray-900/80 dark:border-gray-800 backdrop-blur-sm transition-colors duration-300">
                  {/* Related Posts Mini Carousel */}
                  {relatedPosts.length > 0 && (
                    <>
                      <h3 className="mb-4 text-lg font-medium flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-emerald-500" />
                        Related Posts
                      </h3>
                      <RelatedPostsCarousel posts={relatedPosts} />
                      <div className="h-px my-6 bg-gray-200 dark:bg-gray-700"></div>
                    </>
                  )}

                  {/* Interactive Category List */}
                  <h3 className="mb-6 text-lg font-medium flex items-center">
                    <FileTree className="w-5 h-5 mr-2 text-emerald-500" />
                    Categories
                  </h3>
                  <InteractiveCategoryList categories={categories} activeCategory={activeCategory} />

                  <div className="h-px my-6 bg-gray-200 dark:bg-gray-700"></div>

                  {/* Interactive Tag Cloud */}
                  <h3 className="mb-4 text-lg font-medium flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-emerald-500" />
                    Popular Tags
                  </h3>
                  <TagCloud tags={tags} activeTag={activeTag} />

                  <div className="h-px my-6 bg-gray-200 dark:bg-gray-700"></div>

                  {/* Newsletter with Animated Background */}
                  <NewsletterSignup />
                </div>

                {/* Social Share Links */}
                <SocialSharePanel />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button - Client Component */}
        <ScrollToTopButton />
      </div>
    </TooltipProvider>
  )
}

// Error Display Component
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-4 mb-6 text-red-600 bg-red-100 rounded-full dark:bg-red-900/30 dark:text-red-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-300">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 font-medium text-white transition-colors bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
      >
        Try Again
      </button>
    </div>
  )
}

// ===== CLIENT COMPONENTS =====

// Client Component - Theme Toggle
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
      </button>
    </div>
  )
}

// Parallax Hero Effect - Client Component
function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="absolute inset-0 opacity-10"
      style={{
        transform: `translateY(${scrollY * 0.2}px)`,
      }}
    >
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-emerald-400/30 blur-xl"></div>
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-teal-400/30 blur-xl"></div>
      <div className="absolute bottom-10 left-1/3 w-36 h-36 rounded-full bg-emerald-300/30 blur-xl"></div>
    </div>
  )
}

// Pagination or Infinite Scroll - Client Component
function PaginationOrInfiniteScroll({ currentPage, totalPages, basePath }) {
  const [showInfiniteScroll, setShowInfiniteScroll] = useState(false)
  const [loadedPages, setLoadedPages] = useState(1)
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView && showInfiniteScroll && loadedPages < totalPages) {
      setLoadedPages((prev) => prev + 1)
      // Here you would fetch more posts
    }
  }, [inView, showInfiniteScroll, loadedPages, totalPages])

  if (totalPages <= 1) return null

  return (
    <div className="mt-12">
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">View mode:</span>
          <Switch
            checked={showInfiniteScroll}
            onCheckedChange={setShowInfiniteScroll}
            className="data-[state=checked]:bg-emerald-600"
          />
          <span className="text-sm font-medium">{showInfiniteScroll ? "Infinite scroll" : "Pagination"}</span>
        </div>
      </div>

      {!showInfiniteScroll ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
      ) : (
        <div ref={ref} className="flex justify-center py-8">
          {loadedPages < totalPages ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 mb-2 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Loading more posts...</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">No more posts to load</span>
          )}
        </div>
      )}
    </div>
  )
}

// Related Posts Carousel - Client Component
function RelatedPostsCarousel({ posts }) {
  if (!posts.length) return null

  return (
    <Swiper
      modules={[Navigation, SwiperPagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      className="rounded-lg"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg group">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <span>No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors">
                <div className="absolute bottom-0 p-4">
                  <h4 className="text-sm font-bold text-white">{post.title}</h4>
                  <p className="mt-1 text-xs text-gray-300 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// Scroll To Top Button - Client Component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed p-3 bg-emerald-600 rounded-full shadow-lg bottom-6 right-6 text-white hover:bg-emerald-700 transition-colors"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}

// ===== SERVER COMPONENTS =====

// Featured Post Component
function FeaturedPost({ post, estimateReadingTime }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="p-1 mb-12 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl"
    >
      <div className="p-6 bg-white/95 dark:bg-gray-900/95 rounded-lg backdrop-blur-sm">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <span>No image</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              {post.category && (
                <Link
                  href={`/blog?category=${post.category.slug}`}
                  className="inline-block px-3 py-1 text-xs font-medium text-white bg-emerald-600/80 backdrop-blur-sm rounded-full hover:bg-emerald-700 transition-colors"
                >
                  {post.category.name}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full dark:bg-emerald-900/40 dark:text-emerald-300">
                Featured
              </span>
              <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {estimateReadingTime(post.content || post.excerpt)} min read
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mb-4 text-gray-600 line-clamp-3 dark:text-gray-300">{post.excerpt}</p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                  {post.author?.image ? (
                    <Image
                      src={post.author.image || "/placeholder.svg"}
                      alt={post.author.name || "Author"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                      <span>{post.author?.name?.charAt(0) || "A"}</span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.author?.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Save"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Posts Grid View
function PostsGrid({ posts, estimateReadingTime }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          className="group overflow-hidden transition-all duration-300 bg-white border rounded-xl hover:shadow-lg hover:-translate-y-2 dark:bg-gray-900/90 dark:border-gray-800 backdrop-blur-sm"
        >
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <span>No image</span>
              </div>
            )}
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="absolute px-3 py-1 text-xs font-medium text-white bg-emerald-600/80 backdrop-blur-sm rounded-full top-4 left-4 hover:bg-emerald-700 transition-colors"
              >
                {post.category.name}
              </Link>
            )}
            <div className="absolute top-4 right-4 flex space-x-1">
              <Tooltip content="5 min read">
                <div className="flex items-center px-2 py-1 text-xs text-white bg-black/50 backdrop-blur-sm rounded-full">
                  <Clock className="w-3 h-3 mr-1" />
                  {estimateReadingTime(post.content || post.excerpt)}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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

            {/* Engagement Stats */}
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 50) + 5}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 20)}
                </span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
              >
                Read more
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Posts List View
function PostsList({ posts, estimateReadingTime }) {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          className="group flex flex-col md:flex-row gap-6 overflow-hidden transition-all duration-300 bg-white border rounded-xl hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900/90 dark:border-gray-800 backdrop-blur-sm"
        >
          <div className="relative w-full md:w-1/3 aspect-video md:aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <span>No image</span>
              </div>
            )}
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="absolute px-3 py-1 text-xs font-medium text-white bg-emerald-600/80 backdrop-blur-sm rounded-full top-4 left-4 hover:bg-emerald-700 transition-colors"
              >
                {post.category.name}
              </Link>
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {estimateReadingTime(post.content || post.excerpt)} min read
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h3 className="mb-2 text-xl font-bold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mb-4 text-sm text-gray-600 line-clamp-3 dark:text-gray-300">{post.excerpt}</p>

            <div className="flex items-center justify-between mt-auto">
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

              {/* Post tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Continue reading
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Category Dropdown Component
function CategoryDropdown({ categories, activeCategory }) {
  return (
    <div className="relative inline-block">
      <Tooltip content="Filter by category">
        <button className="flex items-center justify-center gap-2 p-2 text-sm font-medium text-gray-600 transition-all bg-white border rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
          <Filter className="w-4 h-4 text-emerald-500" />
          <span>{activeCategory ? activeCategory.name : "Categories"}</span>
        </button>
      </Tooltip>
      <div className="absolute right-0 z-10 hidden w-48 p-2 mt-2 bg-white border rounded-lg shadow-lg group-hover:block dark:bg-gray-800 dark:border-gray-700">
        <Link
          href="/blog"
          className={cn(
            "block px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
            !activeCategory && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
          )}
        >
          All Categories
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.slug}`}
            className={cn(
              "block px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              activeCategory?.id === category.id &&
                "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Sort Selector Component
function SortSelector({ currentSort }) {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Popular" },
  ]

  return (
    <form className="inline-block">
      <select
        name="sort"
        defaultValue={currentSort}
        onChange={(e) => {
          const form = e.target.form
          if (form) form.submit()
        }}
        className="h-10 px-3 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  )
}

// View Toggle Component
function ViewToggle({ currentView }) {
  return (
    <form className="inline-flex items-center p-1 border rounded-lg dark:border-gray-700">
      <button
        type="submit"
        name="view"
        value="grid"
        className={cn(
          "p-2 rounded-md",
          currentView === "grid"
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        type="submit"
        name="view"
        value="list"
        className={cn(
          "p-2 rounded-md",
          currentView === "list"
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
    </form>
  )
}

// Interactive Category List Component
function InteractiveCategoryList({ categories, activeCategory }) {
  return (
    <div className="space-y-2 animate-fade-in">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog?category=${category.slug}`}
          className={cn(
            "flex items-center justify-between p-2 transition-colors rounded-lg group hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
            activeCategory?.id === category.id && "bg-emerald-50 dark:bg-emerald-900/30",
          )}
        >
          <span
            className={cn(
              "font-medium",
              activeCategory?.id === category.id
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-gray-700 dark:text-gray-300",
            )}
          >
            {category.name}
          </span>
          <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded dark:bg-gray-800 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-700">
            {category._count?.posts || 0}
          </span>
        </Link>
      ))}
    </div>
  )
}

// Tag Cloud Component
function TagCloud({ tags, activeTag }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/blog?tag=${tag.slug}`}
          className={cn(
            "px-3 py-1 text-sm transition-colors rounded-full",
            activeTag?.id === tag.id
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
              : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300",
          )}
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  )
}

// Newsletter Signup Component
function NewsletterSignup() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 dark:from-emerald-900/40 dark:to-teal-900/40 animate-gradient"></div>
      <div className="relative p-6">
        <h3 className="mb-3 text-lg font-medium">Subscribe to our newsletter</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Get the latest updates and articles delivered to your inbox.
        </p>
        <form className="space-y-2">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition-colors bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

// Social Share Panel Component
function SocialSharePanel() {
  return (
    <div className="flex items-center justify-center p-4 bg-white border rounded-lg dark:bg-gray-900/80 dark:border-gray-800">
      <div className="flex space-x-2">
        <Tooltip content="Share on Twitter">
          <button className="p-2 text-gray-500 transition-colors rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </button>
        </Tooltip>
        <Tooltip content="Share on Facebook">
          <button className="p-2 text-gray-500 transition-colors rounded-full hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </Tooltip>
        <Tooltip content="Share on LinkedIn">
          <button className="p-2 text-gray-500 transition-colors rounded-full hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
        </Tooltip>
        <Tooltip content="Copy link">
          <button className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

// No Posts Found Component
function NoPostsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="p-4 mb-6 text-emerald-600 bg-emerald-100 rounded-full dark:bg-emerald-900/30 dark:text-emerald-300">
        <FileTree className="w-12 h-12" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-center">No posts found</h2>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
        We couldn't find any posts matching your criteria. Try adjusting your filters.
      </p>
      <Link
        href="/blog"
        className="px-6 py-3 font-medium text-white transition-colors bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
      >
        View all posts
      </Link>
    </div>
  )
}

// Skeleton Loader Component
function SkeletonLoader({ count = 3 }) {
  return (
    <div className="space-y-8">
      {/* Featured Post Skeleton */}
      <div className="p-1 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl dark:from-gray-700 dark:to-gray-600">
        <div className="p-6 bg-white rounded-lg dark:bg-gray-800">
          <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative aspect-video rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24"></div>
                    <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-16"></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regular Posts Skeletons */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="overflow-hidden border rounded-xl animate-pulse dark:border-gray-800">
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-5/6"></div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-20"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-16"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
