"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export function FileStructureAnalyzer() {
  const [dirPath, setDirPath] = useState("./my-project")
  const [structure, setStructure] = useState<any>(null)
  const [treeView, setTreeView] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extractStructure = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create mock structure
      const mockStructure = createMockStructure(dirPath)
      setStructure(mockStructure)

      // Format as tree
      const tree = formatAsTree(mockStructure)
      setTreeView(tree)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>File Structure Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={dirPath}
              onChange={(e) => setDirPath(e.target.value)}
              placeholder="Enter directory path"
              disabled={loading}
            />
            <Button onClick={extractStructure} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </div>

          {error && <div className="p-4 text-red-500 bg-red-50 rounded-md">Error: {error}</div>}

          {structure && (
            <Tabs defaultValue="tree">
              <TabsList>
                <TabsTrigger value="tree">Tree View</TabsTrigger>
                <TabsTrigger value="json">JSON</TabsTrigger>
              </TabsList>
              <TabsContent value="tree">
                <Textarea className="font-mono text-sm h-96" readOnly value={treeView} />
              </TabsContent>
              <TabsContent value="json">
                <Textarea className="font-mono text-sm h-96" readOnly value={JSON.stringify(structure, null, 2)} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Function to create a mock structure for demo purposes
function createMockStructure(dirPath: string) {
  // For demo purposes, create a mock structure based on the path
  const mockStructure = {
    name: dirPath.split("/").pop() || dirPath,
    path: dirPath,
    type: "directory",
    children: [
      {
        name: "src",
        path: `${dirPath}/src`,
        type: "directory",
        children: [
          {
            name: "index.js",
            path: `${dirPath}/src/index.js`,
            type: "file",
            extension: "js",
            size: 1240,
          },
          {
            name: "utils.js",
            path: `${dirPath}/src/utils.js`,
            type: "file",
            extension: "js",
            size: 2450,
          },
          {
            name: "components",
            path: `${dirPath}/src/components`,
            type: "directory",
            children: [
              {
                name: "Button.jsx",
                path: `${dirPath}/src/components/Button.jsx`,
                type: "file",
                extension: "jsx",
                size: 1850,
              },
              {
                name: "Card.jsx",
                path: `${dirPath}/src/components/Card.jsx`,
                type: "file",
                extension: "jsx",
                size: 2100,
              },
            ],
          },
        ],
      },
      {
        name: "package.json",
        path: `${dirPath}/package.json`,
        type: "file",
        extension: "json",
        size: 950,
      },
      {
        name: "README.md",
        path: `${dirPath}/README.md`,
        type: "file",
        extension: "md",
        size: 2300,
      },
    ],
  }

  return mockStructure
}

// Function to format a structure as a tree
function formatAsTree(node: any, prefix = "", isLast = true, depth = 0) {
  if (!node) return ""

  let output = ""

  // Add the current node to the output
  const nodePrefix = depth === 0 ? "" : isLast ? "└── " : "├── "
  output += prefix + nodePrefix + node.name + (node.type === "directory" ? "/" : "") + "\n"

  // Process children if it's a directory
  if (node.type === "directory" && node.children) {
    const childrenArray = Array.isArray(node.children) ? node.children : node.children

    childrenArray.forEach((child: any, index: number) => {
      const childIsLast = index === childrenArray.length - 1
      const childPrefix = depth === 0 ? "" : isLast ? "    " : "│   "

      output += formatAsTree(child, prefix + childPrefix, childIsLast, depth + 1)
    })
  }

  return output
}
