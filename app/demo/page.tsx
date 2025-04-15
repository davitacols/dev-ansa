import { FileStructureAnalyzer } from "@/components/file-structure-analyzer"
import { ErrorBoundary } from "@/components/error-boundary"
import { ErrorFallback } from "@/components/error-fallback"
import { InteractiveCLI } from "@/components/interactive-cli"
import { StructureVisualizer } from "@/components/structure-visualizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Code, FolderTree } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center px-3 py-1 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Try it out
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Interactive Demo</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Experience ansa-fs directly in your browser with our interactive demo tools.
          </p>
        </div>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8 rounded-lg">
            <TabsTrigger value="cli" className="rounded-lg flex items-center">
              <Terminal className="mr-2 h-4 w-4" />
              CLI Simulator
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="rounded-lg flex items-center">
              <Code className="mr-2 h-4 w-4" />
              Structure Analyzer
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="rounded-lg flex items-center">
              <FolderTree className="mr-2 h-4 w-4" />
              Visualizer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">CLI Simulator</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Try out the ansa-fs command-line interface directly in your browser. Enter commands like{" "}
                <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm">ansa-fs --help</code> to
                see how the CLI works.
              </p>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <InteractiveCLI />
              </ErrorBoundary>
            </div>
          </TabsContent>

          <TabsContent value="analyzer" className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">File Structure Analyzer</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Enter a directory path to analyze its structure. For this demo, we'll generate a mock structure based on
                the path you provide.
              </p>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FileStructureAnalyzer />
              </ErrorBoundary>
            </div>
          </TabsContent>

          <TabsContent value="visualizer" className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Structure Visualizer</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Visualize a sample file structure with this interactive tree view. Expand and collapse directories to
                explore the structure.
              </p>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <StructureVisualizer className="h-96" />
              </ErrorBoundary>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Ready to try it for real?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            Install ansa-fs on your machine to use all its features with your actual projects.
          </p>
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 mb-6">
            <pre className="text-sm font-mono overflow-x-auto">
              <code>npm install -g ansa-fs</code>
            </pre>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="/docs/installation"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:focus-visible:ring-emerald-600"
            >
              Installation Guide
            </a>
            <a
              href="/docs/usage"
              className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-emerald-600"
            >
              Usage Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
