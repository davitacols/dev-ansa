import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Code, GitCompare, Eye, FileDown, BarChart, FolderTree } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Features - ansa-fs",
  description: "Overview of ansa-fs features",
}

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center px-3 py-1 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
          Capabilities
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Features</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Explore the powerful features that make ansa-fs a versatile tool for file system analysis.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        <p className="text-lg">
          ansa-fs provides a comprehensive set of features for working with file system structures. This section
          provides an overview of the main features and links to detailed documentation.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center">
                <Code className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                Content Analysis
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              >
                v2.0
              </Badge>
            </div>
            <CardDescription>Analyze file contents, detect languages, and extract metadata</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Detect programming languages based on file extensions and content</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Calculate code metrics like line count, comment count, and complexity</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Identify dependencies and imports in code files</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href="/docs/features/content-analysis"
              className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline inline-flex items-center"
            >
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center">
                <GitCompare className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                Directory Comparison
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              >
                v2.0
              </Badge>
            </div>
            <CardDescription>Compare two directory structures to identify differences</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Identify added, removed, and modified files and directories</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Generate detailed reports of changes between versions</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Visualize differences in various formats</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href="/docs/features/directory-comparison"
              className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline inline-flex items-center"
            >
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center">
                <Eye className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                Watch Mode
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              >
                v2.0
              </Badge>
            </div>
            <CardDescription>Watch directories for changes and get real-time updates</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Monitor directories for file and directory changes</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Get real-time updates when files are added, removed, or modified</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Trigger custom actions when changes are detected</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href="/docs/features/watch-mode"
              className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline inline-flex items-center"
            >
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center">
                <FileDown className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                Export Formats
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              >
                v2.0
              </Badge>
            </div>
            <CardDescription>Export structures in various formats for documentation and sharing</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Export file structures as JSON for programmatic use</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Generate tree views for visual representation</span>
              </li>
              <li className="flex items-start">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-2">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L3 5L1 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Create comprehensive Markdown documentation</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href="/docs/features/export-formats"
              className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline inline-flex items-center"
            >
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Additional Features</h2>

        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mr-4">
              <FolderTree className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Flexible Extraction Options</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Customize extraction with options like depth limits, file filters, and pattern exclusions. Control
                exactly what gets included in your file structure with fine-grained configuration options.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mr-4">
              <BarChart className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Enhanced Metadata</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track file sizes, modification times, and generate file hashes for comprehensive analysis. Get detailed
                information about your files beyond just their names and paths for deeper insights into your codebase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
