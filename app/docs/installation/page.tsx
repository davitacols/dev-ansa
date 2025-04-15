import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Terminal, Code, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InstallationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center px-3 py-1 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
          Getting Started
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          How to install ansa-fs for CLI or programmatic usage.
        </p>
      </div>

      <div className="space-y-10">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            ansa-fs can be installed either globally for CLI usage or locally as a dependency in your project for
            programmatic usage.
          </p>
        </div>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-8 rounded-lg">
            <TabsTrigger value="global" className="rounded-lg flex items-center">
              <Terminal className="mr-2 h-4 w-4" />
              Global Installation
            </TabsTrigger>
            <TabsTrigger value="local" className="rounded-lg flex items-center">
              <Code className="mr-2 h-4 w-4" />
              Local Installation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Global Installation (for CLI usage)</CardTitle>
                <CardDescription>
                  Install ansa-fs globally to use it as a command-line tool from anywhere on your system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To use ansa-fs as a command-line tool, install it globally:</p>
                <CodeBlock code="npm install -g ansa-fs" filename="terminal" className="shadow-md" />
                <p>
                  This will make the{" "}
                  <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm">ansa-fs</code> command
                  available in your terminal.
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-4 flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Verifying Installation</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      To verify that ansa-fs is installed correctly, run:
                    </p>
                    <pre className="mt-2 bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-sm overflow-x-auto">
                      <code>ansa-fs --help</code>
                    </pre>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                      This should display the help information for the ansa-fs command.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="local" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Local Installation (for programmatic usage)</CardTitle>
                <CardDescription>
                  Install ansa-fs locally in your project to use it programmatically in your code.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To use ansa-fs programmatically in your Node.js project, install it as a dependency:</p>
                <CodeBlock code="npm install ansa-fs" filename="terminal" className="shadow-md" />
                <p>You can then import and use ansa-fs in your JavaScript or TypeScript code:</p>
                <CodeBlock
                  code={`import { extractStructure, formatAsTree } from 'ansa-fs';

// Use ansa-fs functions
const structure = await extractStructure('./my-project');`}
                  filename="example.js"
                  className="shadow-md"
                />

                <Alert
                  variant="default"
                  className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
                >
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  <AlertTitle>TypeScript Support</AlertTitle>
                  <AlertDescription>
                    ansa-fs includes TypeScript type definitions out of the box. No need to install additional @types
                    packages.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-6">
                <li>Node.js version 16.0.0 or higher</li>
                <li>npm (usually comes with Node.js)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Now that you have installed ansa-fs, you can start using it to extract and visualize file system
                structures.
              </p>
              <ul className="space-y-1 list-disc pl-6">
                <li>
                  <a href="/docs/usage/cli" className="text-emerald-600 dark:text-emerald-500 hover:underline">
                    CLI Usage Guide
                  </a>
                </li>
                <li>
                  <a href="/docs/usage/programmatic" className="text-emerald-600 dark:text-emerald-500 hover:underline">
                    Programmatic API Guide
                  </a>
                </li>
                <li>
                  <a href="/docs/examples" className="text-emerald-600 dark:text-emerald-500 hover:underline">
                    Examples
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
