"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommandResult {
  command: string
  output: string
}

export function InteractiveCLI() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandResult[]>([
    {
      command: "",
      output:
        "Welcome to the ansa-fs interactive demo! Try running commands like:\n\n- ansa-fs --help\n- ansa-fs ./example\n- ansa-fs --json ./example\n- ansa-fs --depth 2 ./example",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Mock file system structure for demo
  const mockFileSystem = {
    example: {
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
                "Input.jsx": { type: "file", extension: "jsx" },
              },
            },
          },
        },
        "package.json": { type: "file", extension: "json" },
        "README.md": { type: "file", extension: "md" },
        node_modules: {
          type: "directory",
          children: {
            react: { type: "directory", children: {} },
            lodash: { type: "directory", children: {} },
          },
        },
      },
    },
  }

  // Process commands
  const processCommand = (cmd: string) => {
    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      let output = ""
      const parts = cmd.trim().split(" ")

      if (parts[0] !== "ansa-fs") {
        output = "Command not found: " + parts[0] + "\nTry using 'ansa-fs' commands in this demo."
      } else if (parts.length === 1) {
        output = formatAsTree(mockFileSystem.example, "example")
      } else if (parts.includes("--help")) {
        output = `
ansa-fs - Extract and visualize file system structures

USAGE:
  ansa-fs [OPTIONS] [DIRECTORY]

OPTIONS:
  --help, -h          Show this help message
  --depth <n>, -d     Maximum depth to traverse
  --json, -j          Output as JSON
  --paths, -p         Output as a list of paths
  --stats, -s         Show statistics about the structure
  --ignore <path>     Ignore specific paths
  --ignore-ext <ext>  Ignore specific file extensions
  --files-only, -f    Show only files
  --dirs-only, -D     Show only directories

EXAMPLES:
  ansa-fs                           # Scan current directory
  ansa-fs ./src                     # Scan specific directory
  ansa-fs --depth 2 ./project       # Limit depth to 2 levels
  ansa-fs --ignore node_modules     # Ignore node_modules directory
`
      } else if (parts.includes("--json")) {
        const path = parts.find((p) => p.startsWith("./"))
        const targetPath = path ? path.substring(2) : null
        const target = targetPath === "example" ? mockFileSystem.example : mockFileSystem
        output = JSON.stringify(target, null, 2)
      } else if (parts.includes("--paths")) {
        output = generatePaths(mockFileSystem.example, "example").join("\n")
      } else if (parts.includes("--stats")) {
        const stats = getStats(mockFileSystem.example)
        output = `
Total directories: ${stats.directories}
Total files: ${stats.files}

File extensions:
  js: ${stats.extensions.js || 0} files
  jsx: ${stats.extensions.jsx || 0} files
  json: ${stats.extensions.json || 0} files
  md: ${stats.extensions.md || 0} files
`
      } else {
        // Handle path argument
        const path = parts.find((p) => p.startsWith("./"))
        if (path && path === "./example") {
          // Check for depth option
          const depthIndex = parts.indexOf("--depth")
          let depth = Number.POSITIVE_INFINITY
          if (depthIndex !== -1 && parts[depthIndex + 1]) {
            depth = Number.parseInt(parts[depthIndex + 1])
          }

          // Check for ignore options
          const ignoreNodeModules = parts.includes("--ignore") && parts.includes("node_modules")

          output = formatAsTree(mockFileSystem.example, "example", {
            maxDepth: depth,
            ignoreDirs: ignoreNodeModules ? ["node_modules"] : [],
          })
        } else {
          output = "Directory not found. Try './example' in this demo."
        }
      }

      setHistory((prev) => [...prev, { command: cmd, output }])
      setInput("")
      setIsLoading(false)
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    processCommand(input)
  }

  // Auto scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Helper functions to format output
  function formatAsTree(node: any, name: string, options: any = {}) {
    if (!node) return ""

    const { maxDepth = Number.POSITIVE_INFINITY, ignoreDirs = [], currentDepth = 0 } = options

    if (currentDepth > maxDepth) return ""

    let output = ""
    if (currentDepth === 0) {
      output = name + "\n"
    }

    if (node.type === "directory") {
      if (ignoreDirs.includes(name)) return output

      const entries = Object.entries(node.children || {})
      entries.forEach(([childName, childNode]: [string, any], index) => {
        if (!childNode) return

        const isLast = index === entries.length - 1
        const prefix = currentDepth === 0 ? "├── " : "│   ".repeat(currentDepth) + (isLast ? "└── " : "├── ")
        output += prefix + childName + (childNode.type === "directory" ? "/" : "") + "\n"

        if (childNode.type === "directory") {
          const childOutput = formatAsTree(childNode, childName, {
            ...options,
            currentDepth: currentDepth + 1,
          })
          if (childOutput) {
            output += childOutput
          }
        }
      })
    }

    return output
  }

  function generatePaths(node: any, basePath: string) {
    if (!node) return []

    let paths: string[] = [basePath]

    if (node.type === "directory") {
      Object.entries(node.children || {}).forEach(([name, childNode]: [string, any]) => {
        if (!childNode) return

        const childPath = `${basePath}/${name}`
        const childPaths = generatePaths(childNode, childPath)
        paths = [...paths, ...childPaths]
      })
    }

    return paths
  }

  function getStats(node: any) {
    if (!node) {
      return {
        directories: 0,
        files: 0,
        extensions: {} as Record<string, number>,
      }
    }

    const stats = {
      directories: 0,
      files: 0,
      extensions: {} as Record<string, number>,
    }

    function traverse(node: any) {
      if (!node) return

      if (node.type === "directory") {
        stats.directories++
        Object.values(node.children || {}).forEach((child: any) => traverse(child))
      } else if (node.type === "file") {
        stats.files++
        if (node.extension) {
          stats.extensions[node.extension] = (stats.extensions[node.extension] || 0) + 1
        }
      }
    }

    traverse(node)
    return stats
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" />
            <span>ansa-fs interactive demo</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs"
          onClick={() =>
            setHistory([
              {
                command: "",
                output:
                  "Welcome to the ansa-fs interactive demo! Try running commands like:\n\n- ansa-fs --help\n- ansa-fs ./example\n- ansa-fs --json ./example\n- ansa-fs --depth 2 ./example",
              },
            ])
          }
        >
          Clear
        </Button>
      </div>
      <div ref={terminalRef} className="bg-zinc-950 text-zinc-100 p-4 h-80 overflow-y-auto font-mono text-sm">
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            {item.command && (
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <span className="text-zinc-500">$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="whitespace-pre-wrap text-zinc-300">{item.output}</div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <span className="text-zinc-500">$</span>
            <span>{input}</span>
            <span className="animate-pulse">▋</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-zinc-800">
        <div className="flex items-center bg-zinc-900 text-zinc-100">
          <span className="pl-4 pr-2 text-zinc-500">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-3 px-0 text-sm font-mono"
            placeholder="Type ansa-fs command..."
            disabled={isLoading}
            aria-label="Command input"
          />
        </div>
      </form>
    </div>
  )
}
