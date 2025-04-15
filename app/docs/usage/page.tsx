import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Terminal, Code, BookOpen, Layers, FileCode, Zap } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Usage - ansa-fs",
  description: "Overview of how to use ansa-fs",
}

export default function UsagePage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Header Section */}
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center px-3 py-1 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
          Getting Started
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Usage</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          ansa-fs can be used in two main ways: as a command-line tool or programmatically in your Node.js applications.
        </p>
      </div>

      {/* Usage Options */}
      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Terminal className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
              Command Line Interface
            </CardTitle>
            <CardDescription>
              Use ansa-fs directly from your terminal to extract and visualize file structures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Perfect for quick analysis and one-off tasks. Simply run commands in your terminal to extract, analyze,
              and visualize file structures.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 font-mono text-sm">
              <code>ansa-fs --depth 2 ./my-project</code>
            </div>
            <div className="pt-2">
              <Link href="/docs/usage/cli" passHref>
                <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                  CLI Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Code className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-500" />
              Programmatic API
            </CardTitle>
            <CardDescription>Import and use ansa-fs functions in your Node.js applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Ideal for integration into your development workflow and tools. Use the API to build custom file analysis
              solutions.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 font-mono text-sm">
              <code>{`import { extractStructure } from 'ansa-fs';
const structure = await extractStructure('./src');`}</code>
            </div>
            <div className="pt-2">
              <Link href="/docs/usage/programmatic" passHref>
                <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
                  API Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Section */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Zap className="mr-2 h-5 w-5 text-emerald-500" />
          Quick Start
        </h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 rounded-lg">
            <TabsTrigger value="cli" className="rounded-lg">
              <Terminal className="mr-2 h-4 w-4" />
              CLI Usage
            </TabsTrigger>
            <TabsTrigger value="api" className="rounded-lg">
              <Code className="mr-2 h-4 w-4" />
              Programmatic Usage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Get started with the command-line interface for quick file structure analysis:
            </p>
            <CodeBlock
              code={`# Install globally
npm install -g @davitacols/ansa-fs

# Basic usage - extract and display the structure of the current directory
ansa-fs

# Extract a specific directory
ansa-fs ./my-project

# Export as JSON
ansa-fs --json ./my-project > structure.json

# Limit depth to 2 levels
ansa-fs --depth 2 ./my-project

# Exclude node_modules and .git directories
ansa-fs --exclude node_modules,.git ./my-project`}
              filename="terminal"
              className="shadow-md"
            />
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Integrate ansa-fs into your Node.js applications with the programmatic API:
            </p>
            <CodeBlock
              code={`import { extractStructure, formatAsTree } from '@davitacols/ansa-fs';

async function example() {
  // Extract the structure of a directory
  const structure = await extractStructure('./my-project', {
    depth: 3,
    excludePatterns: ['node_modules', 'dist', '.git']
  });
  
  // Format and print as a tree
  console.log(formatAsTree(structure));
  
  // Access the structure programmatically
  console.log(\`Total files: \${countFiles(structure)}\`);
}

function countFiles(node) {
  let count = 0;
  
  if (node.type === 'file') {
    return 1;
  }
  
  if (node.children) {
    Object.values(node.children).forEach(child => {
      count += countFiles(child);
    });
  }
  
  return count;
}

example();`}
              filename="example.js"
              className="shadow-md"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Next Steps Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-emerald-500" />
          Next Steps
        </h2>

        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Explore the detailed documentation to get the most out of ansa-fs:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/usage/cli" passHref>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors group">
              <div className="flex items-center mb-2">
                <Terminal className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mr-2" />
                <h3 className="font-semibold">Command Line Interface</h3>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Learn about all available CLI options and commands
              </p>
            </div>
          </Link>

          <Link href="/docs/usage/programmatic" passHref>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors group">
              <div className="flex items-center mb-2">
                <Code className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mr-2" />
                <h3 className="font-semibold">Programmatic API</h3>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Discover how to integrate ansa-fs into your Node.js applications
              </p>
            </div>
          </Link>

          <Link href="/docs/features" passHref>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors group">
              <div className="flex items-center mb-2">
                <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mr-2" />
                <h3 className="font-semibold">Features</h3>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Explore the powerful features of ansa-fs</p>
            </div>
          </Link>

          <Link href="/docs/api" passHref>
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors group">
              <div className="flex items-center mb-2">
                <FileCode className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mr-2" />
                <h3 className="font-semibold">API Reference</h3>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Get detailed information about all available functions
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
