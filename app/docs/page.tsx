import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, FolderTreeIcon, Code, GitCompare, FileDown, 
  Eye, BookOpen, Terminal, Package, ChevronRight, Github, 
  Star, Download, Activity, Layers
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-100 dark:border-emerald-900/50 p-8 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-emerald-500/10 [mask-image:linear-gradient(to_bottom_right,white,transparent,white)]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 bg-white/90 dark:bg-zinc-900/90 rounded-xl shadow-sm border border-emerald-200/50 dark:border-emerald-800/30">
            <FolderTreeIcon className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">ansa-fs</h1>
              <Badge variant="outline" className="font-medium text-xs py-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">v2.0.0</Badge>
            </div>
            <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-6">File system structure extraction and analysis with power and precision</p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 shadow-md shadow-emerald-600/10">
                <Download className="mr-2 h-4 w-4" /> Install Package
              </Button>
              <Button variant="outline" className="rounded-full border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Button>
              <Button variant="outline" className="rounded-full border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center">
                <Star className="mr-2 h-4 w-4 text-amber-500" fill="currentColor" />
                <span>Star</span>
                <div className="ml-2 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium">1.2k</div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="prose dark:prose-invert max-w-none mb-16">
        <p className="text-xl leading-relaxed">
          ansa-fs is a lightweight and flexible Node.js package that helps you extract and visualize file system
          structures. It provides both a command-line interface and a programmatic API for working with directory
          trees, with advanced features for content analysis and comparison.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        <Link href="/docs/installation" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Package className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                Installation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Get started with ansa-fs in your project
              </CardDescription>
            </CardContent>
            <CardFooter className="text-sm text-zinc-500 pt-0">
              <div className="flex items-center group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                <span>Read documentation</span>
                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/docs/usage" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Terminal className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Learn how to use the CLI and API
              </CardDescription>
            </CardContent>
            <CardFooter className="text-sm text-zinc-500 pt-0">
              <div className="flex items-center group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                <span>Read documentation</span>
                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/docs/api" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-teal-600 to-teal-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Code className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Detailed API documentation
              </CardDescription>
            </CardContent>
            <CardFooter className="text-sm text-zinc-500 pt-0">
              <div className="flex items-center group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                <span>Read documentation</span>
                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Core Features</h2>
        </div>
        
        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-end mb-4">
            <TabsList className="bg-zinc-100 dark:bg-zinc-800/50">
              <TabsTrigger value="grid" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">
                <Layers className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">
                <Activity className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                    <Code className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Content Analysis</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Analyze file contents, detect programming languages, measure code complexity, and identify dependencies with precision.
                </p>
                <Link
                  href="/docs/features/content-analysis"
                  className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                    <GitCompare className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Directory Comparison</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Compare two directory structures to identify added, removed, and modified files with detailed change reports.
                </p>
                <Link
                  href="/docs/features/directory-comparison"
                  className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                    <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Watch Mode</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Watch directories for changes and get real-time updates to your file structure with configurable refresh rates.
                </p>
                <Link
                  href="/docs/features/watch-mode"
                  className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                    <FileDown className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Export Formats</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Export structures as JSON, paths, tree view, or comprehensive Markdown documentation with customizable templates.
                </p>
                <Link
                  href="/docs/features/export-formats"
                  className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <div className="bg-white dark:bg-zinc-900 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 shrink-0">
                    <Code className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Content Analysis</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Analyze file contents, detect programming languages, measure code complexity, and identify dependencies.
                    </p>
                  </div>
                  <Link
                    href="/docs/features/content-analysis"
                    className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium shrink-0"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 shrink-0">
                    <GitCompare className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Directory Comparison</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Compare two directory structures to identify added, removed, and modified files.
                    </p>
                  </div>
                  <Link
                    href="/docs/features/directory-comparison"
                    className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium shrink-0"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 shrink-0">
                    <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Watch Mode</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Watch directories for changes and get real-time updates to your file structure.
                    </p>
                  </div>
                  <Link
                    href="/docs/features/watch-mode"
                    className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium shrink-0"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 shrink-0">
                    <FileDown className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Export Formats</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Export structures as JSON, paths, tree view, or comprehensive Markdown documentation.
                    </p>
                  </div>
                  <Link
                    href="/docs/features/export-formats"
                    className="text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center font-medium shrink-0"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Features Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1 bg-teal-500 rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">What's New in v2.0</h2>
        </div>
        
        <div className="rounded-2xl overflow-hidden border border-teal-200 dark:border-teal-900/50">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 p-6">
            <p className="text-lg font-medium mb-4 text-teal-800 dark:text-teal-300">The latest release brings powerful new capabilities</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm hover:shadow transition-all">
                <h4 className="font-medium mb-2 text-teal-700 dark:text-teal-400">Enhanced Analysis</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Deep content analysis with language detection, complexity metrics, and dependency mapping.
                </p>
              </div>

              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm hover:shadow transition-all">
                <h4 className="font-medium mb-2 text-teal-700 dark:text-teal-400">Smart Comparison</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Compare directories with content-aware diffing and detailed change reports for comprehensive insights.
                </p>
              </div>

              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm hover:shadow transition-all">
                <h4 className="font-medium mb-2 text-teal-700 dark:text-teal-400">Enhanced Metadata</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Track file sizes, modification times, and generate file hashes for comprehensive analysis.
                </p>
              </div>

              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm hover:shadow transition-all">
                <h4 className="font-medium mb-2 text-teal-700 dark:text-teal-400">Rich Documentation</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Export your file structure as comprehensive Markdown documentation with customizable templates.
                </p>
              </div>

              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm hover:shadow transition-all">
                <h4 className="font-medium mb-2 text-teal-700 dark:text-teal-400">Intelligent Watch Mode</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Watch directories with smart filtering and event debouncing for efficient processing.
                </p>
              </div>
              
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm hover:shadow transition-all">
                <h4 className="font-medium mb-2 text-teal-700 dark:text-teal-400">Plugin System</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Extend capabilities with custom plugins for specialized file analysis and processing needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Get Started Now</h2>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-lg mb-6">
            To get started with ansa-fs, you'll need to install it first. You can install it globally for CLI usage or
            locally for programmatic usage in your project.
          </p>

          <div className="bg-zinc-950 text-zinc-100 rounded-lg p-4 mb-8 relative group">
            <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>
            <pre className="text-sm font-mono overflow-x-auto text-emerald-300">
              <span className="text-zinc-500">$</span> <span className="text-zinc-100">npm install -g ansa-fs</span>
            </pre>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 mb-8 border border-zinc-200 dark:border-zinc-700/50">
            <h3 className="text-lg font-medium mb-4">Basic Usage</h3>
            <div className="bg-zinc-950 text-zinc-100 rounded-lg p-4 relative group">
              <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
              </div>
              <pre className="text-sm font-mono overflow-x-auto">
                <span className="text-indigo-400">import</span> <span className="text-zinc-100">{"{"} extractStructure {"}"}</span> <span className="text-indigo-400">from</span> <span className="text-emerald-300">'ansa-fs'</span><span className="text-zinc-100">;</span>
{"\n"}
<span className="text-indigo-400">async</span> <span className="text-indigo-400">function</span> <span className="text-teal-300">analyze</span><span className="text-zinc-100">() {"{"}</span>
<span className="text-zinc-100">  </span><span className="text-indigo-400">const</span> <span className="text-zinc-100">structure = </span><span className="text-indigo-400">await</span> <span className="text-teal-300">extractStructure</span><span className="text-zinc-100">(</span><span className="text-emerald-300">'./my-project'</span><span className="text-zinc-100">);</span>
<span className="text-zinc-100">  </span><span className="text-zinc-500">// Process the structure</span>
<span className="text-zinc-100">  console.</span><span className="text-teal-300">log</span><span className="text-zinc-100">(structure);</span>
<span className="text-zinc-100">{"}"}</span>
              </pre>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/docs/installation" passHref>
              <Button className="rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 shadow-md shadow-emerald-600/10">
                Complete Installation Guide
              </Button>
            </Link>
            <Link href="/docs/usage/cli" passHref>
              <Button variant="outline" className="rounded-lg">
                <Terminal className="mr-2 h-4 w-4" />
                CLI Usage
              </Button>
            </Link>
            <Link href="/docs/usage/programmatic" passHref>
              <Button variant="outline" className="rounded-lg">
                <Code className="mr-2 h-4 w-4" />
                API Usage
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Documentation Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Documentation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-500" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Get up and running with ansa-fs in just a few minutes with our comprehensive quick start guide.
              </p>
              <Link
                href="/docs/quick-start"
                className="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 inline-flex items-center font-medium"
              >
                View guide <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Code className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-500" />
                API Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Detailed API reference for all functions, methods, and options available in ansa-fs.
              </p>
              <Link
                href="/docs/api"
                className="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 inline-flex items-center font-medium"
              >
                Explore API <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Terminal className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-500" />
                CLI Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Command-line interface documentation with examples for all commands and options.
              </p>
              <Link
                href="/docs/cli"
                className="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 inline-flex items-center font-medium"
              >
                View commands <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <GitCompare className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-500" />
                Advanced Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Learn about advanced features including plugins, comparison tools, and custom exports.
              </p>
              <Link
                href="/docs/advanced"
                className="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 inline-flex items-center font-medium"
              >
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Community Section */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Community</h2>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-100 dark:border-purple-900/50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-300">Join Our Community</h3>
              <p className="mb-6 text-zinc-700 dark:text-zinc-300">
                Join our growing community of developers and contribute to the project. Share your use cases, ask questions, 
                and help improve ansa-fs for everyone.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
                <Button variant="outline" className="rounded-full border-purple-300 dark:border-purple-700 bg-white/80 dark:bg-zinc-900/80">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.062.062 0 0 0-.064.024 13.4 13.4 0 0 0-.584 1.18 16.27 16.27 0 0 0-4.813 0 12.646 12.646 0 0 0-.6-1.18.064.064 0 0 0-.065-.024 18.869 18.869 0 0 0-4.885 1.49.059.059 0 0 0-.027.023C.533 9.404-.32 14.185.099 18.9a.067.067 0 0 0 .026.046 19.036 19.036 0 0 0 5.693 2.839.064.064 0 0 0 .07-.023 13.394 13.394 0 0 0 1.189-1.906.062.062 0 0 0-.034-.087 12.547 12.547 0 0 1-1.8-.853.062.062 0 0 1-.006-.106c.121-.09.242-.183.357-.278a.061.061 0 0 1 .064-.008c3.248 1.468 6.765 1.468 9.984 0a.056.056 0 0 1 .064.007c.116.095.237.188.358.279a.062.062 0 0 1-.006.106c-.574.334-1.171.618-1.8.853a.062.062 0 0 0-.034.088 15.521 15.521 0 0 0 1.188 1.905.064.064 0 0 0 .07.023 18.978 18.978 0 0 0 5.694-2.84.064.064 0 0 0 .026-.045c.499-5.136-.838-9.875-3.549-13.412a.05.05 0 0 0-.026-.023zM8.02 15.967c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                  </svg>
                  Join Discord
                </Button>
                <Button variant="outline" className="rounded-full border-purple-300 dark:border-purple-700 bg-white/80 dark:bg-zinc-900/80">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                  Follow on Twitter
                </Button>
              </div>
            </div>
            
            <div className="flex-1 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-purple-200 dark:border-purple-900/50 shadow-sm">
              <h4 className="font-medium mb-4">Star Contributors</h4>
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-full bg-purple-100 dark:bg-purple-950/50 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-300 to-indigo-300 dark:from-purple-700 dark:to-indigo-700"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100 dark:border-purple-900/50">
                <Link
                  href="/community/contributors"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center font-medium"
                >
                  View all contributors <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <FolderTreeIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              <h3 className="font-bold text-lg">ansa-fs</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
              File system structure extraction and analysis with power and precision. 
              Open source under MIT license.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              © {new Date().getFullYear()} ansa-fs Contributors. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-3">Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs/installation" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Installation</Link></li>
                <li><Link href="/docs/usage" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Usage</Link></li>
                <li><Link href="/docs/api" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">API Reference</Link></li>
                <li><Link href="/docs/cli" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">CLI Reference</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/community/contributing" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Contributing</Link></li>
                <li><Link href="https://github.com/ansa-fs/ansa-fs" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">GitHub</Link></li>
                <li><Link href="https://discord.gg/ansa-fs" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Discord</Link></li>
                <li><Link href="https://twitter.com/ansafs" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Twitter</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">More</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Blog</Link></li>
                <li><Link href="/showcase" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Showcase</Link></li>
                <li><Link href="/roadmap" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Roadmap</Link></li>
                <li><Link href="/changelog" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500">Changelog</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}