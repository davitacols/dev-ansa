import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FolderTreeIcon, Code, BarChart, GitCompare, FileDown, Eye, Terminal, Github } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-950 dark:to-emerald-950/20">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 border border-emerald-600/30 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                  New v2.0 Released
                </div>
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                  ansa-fs
                </h1>
                <p className="text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed">
                  A lightweight and flexible Node.js package to extract, analyze, and visualize file system structures
                  with powerful analysis tools.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/docs/installation" passHref>
                    <Button
                      size="lg"
                      className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo" passHref>
                    <Button variant="outline" size="lg" className="rounded-full px-8">
                      Try Interactive Demo
                    </Button>
                  </Link>
                </div>
                <div className="pt-4 flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                  <Link
                    href="https://github.com/davitacols/ansa-fs"
                    className="flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    <span>Open source & MIT licensed</span>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-30 blur-xl"></div>
                <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
                  <CodeBlock
                    code={`import { extractStructure, formatAsTree } from 'ansa-fs';

async function example() {
  // Extract the structure of a directory
  const structure = await extractStructure('./my-project');
  
  // Format and print as a tree
  console.log(formatAsTree(structure));
}

example();`}
                    filename="example.js"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center px-3 py-1.5 mb-4 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium">
                Features
              </div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">Powerful Capabilities</h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                Everything you need to analyze and work with file system structures
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <FolderTreeIcon className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Extract File Structures</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Extract file and directory structures from any directory with configurable options for depth,
                  filtering, and more.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <Code className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Content Analysis</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Analyze file contents, detect programming languages, measure code complexity, and identify
                  dependencies automatically.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <GitCompare className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Directory Comparison</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Compare two directory structures to identify added, removed, and modified files with detailed change
                  reports.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <BarChart className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Enhanced Metadata</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Track file sizes, modification times, and generate file hashes for comprehensive analysis and
                  auditing.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <FileDown className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Export Formats</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Export structures as JSON, paths, tree view, or comprehensive Markdown documentation for sharing and
                  reporting.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <Eye className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Watch Mode</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Watch directories for changes and get real-time updates to your file structure for continuous
                  monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLI Example Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-medium">
                  CLI & API
                </div>
                <h2 className="text-4xl font-bold tracking-tighter">Use it Your Way</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  ansa-fs provides both a powerful command-line interface and a flexible programmatic API to fit your
                  workflow.
                </p>
                <ul className="space-y-4">
                  {[
                    "Extract file structures with a single command",
                    "Compare directories to find differences",
                    "Generate documentation automatically",
                    "Integrate with your Node.js applications",
                    "Watch directories for real-time updates",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mr-3">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 1L3.5 6.5L1 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/docs/usage" passHref>
                    <Button className="rounded-full px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                      View Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-zinc-400 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 opacity-30 blur-xl"></div>
                <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl">
                  <div className="flex items-center gap-1.5 px-4 py-2 border-b border-zinc-800">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-zinc-400">terminal</div>
                  </div>
                  <pre className="p-4 text-sm font-mono overflow-x-auto">
                    <code>{`$ npm install -g ansa-fs

$ ansa-fs ./my-project
my-project
├── src
│   ├── components
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   └── index.js
├── package.json
└── README.md

$ ansa-fs --json ./my-project > structure.json

$ ansa-fs --diff ./project-v1 ./project-v2
Added files: 3
Removed files: 1
Modified files: 2`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Options Section */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center px-3 py-1.5 mb-4 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium">
                Getting Started
              </div>
              <h2 className="text-4xl font-bold tracking-tighter mb-4">Choose Your Approach</h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                Whether you prefer command-line tools or programmatic APIs, ansa-fs has you covered
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <Terminal className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Command Line Interface</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Use ansa-fs directly from your terminal to extract and visualize file structures. Perfect for quick
                  analysis and one-off tasks.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code>$ ansa-fs --depth 2 ./my-project</code>
                  </pre>
                </div>
                <Link href="/docs/usage/cli" passHref>
                  <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                    CLI Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-6">
                  <Code className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Programmatic API</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Import and use ansa-fs functions in your Node.js applications. Ideal for integration into your
                  development workflow and tools.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code>{`import { extractStructure } from 'ansa-fs';
const structure = await extractStructure('./src');`}</code>
                  </pre>
                </div>
                <Link href="/docs/usage/programmatic" passHref>
                  <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                    API Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-900 dark:to-teal-950">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold tracking-tighter text-white">Ready to Get Started?</h2>
              <p className="text-xl text-emerald-100">
                Install ansa-fs today and start exploring your file system structure.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-md mx-auto">
                <pre className="text-lg font-mono overflow-x-auto text-emerald-100">
                  <code>npm install ansa-fs</code>
                </pre>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/docs/installation" passHref>
                  <Button
                    size="lg"
                    className="rounded-full px-8 bg-white text-emerald-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-emerald-400 dark:hover:bg-zinc-700"
                  >
                    Installation Guide
                  </Button>
                </Link>
                <Link href="/demo" passHref>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 border-white text-white hover:bg-emerald-700/30 dark:border-zinc-700 dark:hover:bg-emerald-800/30"
                  >
                    Try Interactive Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
