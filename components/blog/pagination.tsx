import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
  className?: string
}

export function Pagination({ currentPage, totalPages, basePath = "/blog", className }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Determine if we need to show first/last page buttons
  const showFirst = currentPage > 2
  const showLast = currentPage < totalPages - 1

  // Create an array of page numbers to display
  const pageNumbers = []

  // Always show current page
  pageNumbers.push(currentPage)

  // Show previous page if it exists
  if (currentPage > 1) {
    pageNumbers.unshift(currentPage - 1)
  }

  // Show next page if it exists
  if (currentPage < totalPages) {
    pageNumbers.push(currentPage + 1)
  }

  // Add one more page on either side if we have space
  if (pageNumbers.length < 3) {
    if (currentPage === 1 && totalPages >= 3) {
      pageNumbers.push(currentPage + 2)
    } else if (currentPage === totalPages && totalPages >= 3) {
      pageNumbers.unshift(currentPage - 2)
    }
  }

  // Function to generate the correct URL with query parameters
  const getPageUrl = (page: number) => {
    // Extract the base path and any existing query parameters
    const [path, existingQuery] = basePath.split("?")

    // Parse existing query parameters
    const params = new URLSearchParams(existingQuery || "")

    // Update or add the page parameter
    if (page > 1) {
      params.set("page", page.toString())
    } else {
      params.delete("page") // Remove page param if it's page 1
    }

    // Reconstruct the URL
    const query = params.toString()
    return `${path}${query ? `?${query}` : ""}`
  }

  return (
    <nav className={cn("flex justify-center", className)} aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
        {/* Previous page button */}
        <li>
          <Link
            href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
            className={cn(
              "flex items-center justify-center h-10 px-4 rounded-l-lg border",
              currentPage > 1
                ? "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                : "text-gray-300 bg-white cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600",
            )}
            aria-disabled={currentPage <= 1}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </li>

        {/* First page button */}
        {showFirst && (
          <>
            <li>
              <Link
                href={getPageUrl(1)}
                className="flex items-center justify-center h-10 px-4 border text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </Link>
            </li>
            {currentPage > 3 && (
              <li>
                <span className="flex items-center justify-center h-10 px-4 border text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                  ...
                </span>
              </li>
            )}
          </>
        )}

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <Link
              href={getPageUrl(page)}
              className={cn(
                "flex items-center justify-center h-10 px-4 border",
                page === currentPage
                  ? "text-white bg-indigo-600 border-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:border-indigo-600 dark:hover:bg-indigo-700"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Last page button */}
        {showLast && (
          <>
            {currentPage < totalPages - 2 && (
              <li>
                <span className="flex items-center justify-center h-10 px-4 border text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                  ...
                </span>
              </li>
            )}
            <li>
              <Link
                href={getPageUrl(totalPages)}
                className="flex items-center justify-center h-10 px-4 border text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}

        {/* Next page button */}
        <li>
          <Link
            href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
            className={cn(
              "flex items-center justify-center h-10 px-4 rounded-r-lg border",
              currentPage < totalPages
                ? "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                : "text-gray-300 bg-white cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600",
            )}
            aria-disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
