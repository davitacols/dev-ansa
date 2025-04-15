"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string
  type: "file" | "directory"
  extension?: string
  children?: Record<string, FileNode>
}

interface StructureVisualizerProps {
  initialData?: Record<string, FileNode>
  className?: string
}

export function StructureVisualizer({ initialData, className }: StructureVisualizerProps) {
  // Default example structure if none provided
  const defaultData: Record<string, FileNode> = {
    "my-project": {
      type: "directory",
      children: {
        src: {
          type: "directory",
          children: {
            "index.js": { type: "file", extension: "js" },
            "utils.js": { type: "file", extension: "js" },
            components: {
              type: "directory",
              children: {
                "Button.jsx": { type: "file", extension: "jsx" },
                "Card.jsx": { type: "file", extension: "jsx" },
              },
            },
          },
        },
        "package.json": { type: "file", extension: "json" },
        "README.md": { type: "file", extension: "md" },
      },
    },
  }

  const data = initialData || defaultData

  return (
    <div className={cn("rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden", className)}>
      <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="text-sm font-medium">File Structure Visualization</h3>
      </div>
      <div className="bg-white dark:bg-zinc-950 p-4 max-h-96 overflow-auto">
        {Object.entries(data).map(([name, node]) => (
          <TreeNode key={name} name={name} node={node} level={0} />
        ))}
      </div>
    </div>
  )
}

interface TreeNodeProps {
  name: string
  node: FileNode
  level: number
}

function TreeNode({ name, node, level }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(level < 2)

  // Add null check for node
  if (!node) {
    return null
  }

  const isDirectory = node.type === "directory"
  const hasChildren = isDirectory && node.children && Object.keys(node.children || {}).length > 0

  // Add simulated file sizes
  const getFileSize = (name: string, extension?: string) => {
    const sizes: Record<string, string> = {
      "index.js": "1.2 KB",
      "utils.js": "3.5 KB",
      "Button.jsx": "2.1 KB",
      "Card.jsx": "1.8 KB",
      "package.json": "1.0 KB",
      "README.md": "2.3 KB",
    }

    return sizes[name] || (extension === "js" ? "1.0 KB" : extension === "jsx" ? "1.5 KB" : "0.8 KB")
  }

  const toggleExpand = () => {
    if (isDirectory) {
      setExpanded(!expanded)
    }
  }

  // Get icon based on file extension
  const getFileIcon = (extension?: string) => {
    // You could add more specific icons based on file extensions
    return <File className="h-4 w-4 text-zinc-400" />
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded px-1 -mx-1",
          isDirectory && "cursor-pointer",
        )}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={toggleExpand}
      >
        {isDirectory && hasChildren ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 text-zinc-500 mr-1 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-zinc-500 mr-1 shrink-0" />
          )
        ) : (
          <span className="w-4 mr-1" />
        )}

        {isDirectory ? (
          expanded ? (
            <FolderOpen className="h-4 w-4 text-amber-500 mr-1.5 shrink-0" />
          ) : (
            <Folder className="h-4 w-4 text-amber-500 mr-1.5 shrink-0" />
          )
        ) : (
          getFileIcon(node.extension)
        )}

        <span className="text-sm truncate">{name}</span>

        {node.extension && <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">.{node.extension}</span>}

        {!isDirectory && (
          <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">{getFileSize(name, node.extension)}</span>
        )}
      </div>

      {isDirectory && expanded && node.children && (
        <div>
          {Object.entries(node.children).map(([childName, childNode]) => (
            <TreeNode key={childName} name={childName} node={childNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
