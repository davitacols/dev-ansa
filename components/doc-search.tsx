"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Mock search index - in a real app, this would be generated at build time
const searchIndex = [
  {
    title: "Installation",
    path: "/docs/installation",
    content:
      "How to install ansa-fs for CLI or programmatic usage. Global installation, local installation, requirements.",
  },
  {
    title: "CLI Usage",
    path: "/docs/usage/cli",
    content:
      "How to use ansa-fs as a command-line tool. Basic usage, output options, filtering options, CLI options reference.",
  },
  {
    title: "Programmatic Usage",
    path: "/docs/usage/programmatic",
    content:
      "How to use ansa-fs programmatically in your Node.js projects. Basic usage, working with the structure, error handling.",
  },
  {
    title: "API Reference",
    path: "/docs/api",
    content: "Complete reference for the ansa-fs API. Structure object format, structure object properties.",
  },
  {
    title: "extractStructure",
    path: "/docs/api/extract-structure",
    content: "Extract the file structure of a directory. Syntax, parameters, options object, return value, examples.",
  },
  {
    title: "Examples",
    path: "/docs/examples",
    content:
      "Practical examples of using ansa-fs in different scenarios. Generate documentation, analyze project structure, find large files.",
  },
  {
    title: "Troubleshooting",
    path: "/docs/guides/troubleshooting",
    content:
      "Common issues and their solutions when using ansa-fs. Command not found, permission issues, large directories, memory issues.",
  },
  {
    title: "Integration",
    path: "/docs/guides/integration",
    content:
      "How to integrate ansa-fs with other tools and workflows. Integration with Git hooks, CI/CD pipelines, build tools, documentation tools.",
  },
]

interface SearchResult {
  title: string
  path: string
  content: string
  excerpt?: string
}

export function DocSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTerms = query.toLowerCase().split(" ")
    const filteredResults = searchIndex
      .filter((item) => {
        const content = `${item.title} ${item.content}`.toLowerCase()
        return searchTerms.every((term) => content.includes(term))
      })
      .map((item) => {
        // Create excerpt with highlighted match
        const lowerContent = item.content.toLowerCase()
        let matchIndex = -1

        // Find the first matching term in the content
        for (const term of searchTerms) {
          const index = lowerContent.indexOf(term)
          if (index !== -1) {
            matchIndex = index
            break
          }
        }

        // Create excerpt around the match
        let excerpt = item.content
        if (matchIndex !== -1) {
          const start = Math.max(0, matchIndex - 40)
          const end = Math.min(item.content.length, matchIndex + 100)
          excerpt = (start > 0 ? "..." : "") + item.content.slice(start, end) + (end < item.content.length ? "..." : "")
        }

        return {
          ...item,
          excerpt,
        }
      })

    setResults(filteredResults)
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          setOpen(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex])

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Handle global keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = (result: SearchResult) => {
    router.push(result.path)
    setOpen(false)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-sm text-zinc-500 dark:text-zinc-400 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 h-9"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search documentation...</span>
          </div>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-4 py-2">
          <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
          />
          {query && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuery("")}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result, i) => (
                <button
                  key={result.path}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm",
                    selectedIndex === i
                      ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <FileText className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    {result.title}
                  </div>
                  {result.excerpt && (
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{result.excerpt}</p>
                  )}
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="px-3 py-10 text-center">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="px-3 py-2">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-2 font-medium">POPULAR SEARCHES</p>
              <div className="space-y-1">
                {["installation", "cli usage", "api reference", "examples"].map((term, i) => (
                  <button
                    key={term}
                    className="w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setQuery(term)}
                  >
                    <span>{term}</span>
                    <ArrowRight className="h-3 w-3 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-2 py-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium">
                ↑
              </kbd>
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium">
                ↓
              </kbd>
              <span>to navigate</span>
            </div>
            <div className="flex gap-2">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium">
                Enter
              </kbd>
              <span>to select</span>
            </div>
            <div className="flex gap-2">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium">
                Esc
              </kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
