"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800", className)}>
      <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {filename && <div className="text-xs text-zinc-500 dark:text-zinc-400">{filename}</div>}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="text-sm bg-zinc-950 text-zinc-100 p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
