import { Suspense } from "react"
import BlogClientPage from "./BlogClientPage"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPage({ searchParams }) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogClientPage searchParams={searchParams} />
    </Suspense>
  )
}

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="relative overflow-hidden">
        <div className="container relative px-4 py-24 mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-8 w-2/3 mx-auto" />
        </div>
      </div>

      <div className="container px-4 sm:px-6 py-12 mx-auto max-w-7xl">
        <Skeleton className="h-16 w-full mb-8" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-80 w-full" />
                ))}
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
