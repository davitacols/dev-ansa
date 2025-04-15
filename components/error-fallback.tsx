"use client"

export function ErrorFallback() {
  return (
    <div className="p-6 border border-red-300 rounded-xl bg-red-50 dark:bg-red-900/20 dark:border-red-800">
      <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">Something went wrong</h3>
      <p className="text-sm text-red-700 dark:text-red-300">
        We're having trouble loading this component. Please try again later.
      </p>
    </div>
  )
}
