import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart, Code, Eye, FileDown, FolderTree, GitCompare } from "lucide-react"

export const metadata: Metadata = {
  title: "Features - ansa-fs",
  description: "Overview of ansa-fs features",
}

export default function FeaturesPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Features</h1>

      <p className="text-lg mb-10">
        ansa-fs provides a comprehensive set of features for working with file system structures. This section provides
        an overview of the main features and links to detailed documentation.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-4">
            <Code className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Content Analysis</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Analyze file contents, detect languages, measure code complexity, and identify dependencies.
          </p>
          <Link
            href="/docs/features/content-analysis"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:underline"
          >
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-4">
            <GitCompare className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Directory Comparison</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Compare two directory structures to identify added, removed, and modified files.
          </p>
          <Link
            href="/docs/features/directory-comparison"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:underline"
          >
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-4">
            <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Watch Mode</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Watch directories for changes and get real-time updates to your file structure.
          </p>
          <Link
            href="/docs/features/watch-mode"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:underline"
          >
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-4">
            <FileDown className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Export Formats</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Export structures as JSON, paths, tree view, or comprehensive Markdown documentation.
          </p>
          <Link
            href="/docs/features/export-formats"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:underline"
          >
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Additional Features</h2>

      <div className="space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mr-4">
              <FolderTree className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Flexible Extraction Options</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Customize extraction with options like depth limits, file filters, and pattern exclusions. Control
                exactly what gets included in your file structure.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mr-4">
              <BarChart className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Enhanced Metadata</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track file sizes, modification times, and generate file hashes for comprehensive analysis. Get detailed
                information about your files beyond just their names and paths.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
