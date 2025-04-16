"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [html, setHtml] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        setIsLoading(true)
        const { marked } = await import("marked")

        // Configure marked options
        marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false,
        })

        // Render markdown to HTML
        const renderedHtml = marked.parse(content)
        setHtml(renderedHtml)
      } catch (error) {
        console.error("Error rendering markdown:", error)
        // Simple fallback if marked fails
        setHtml(
          content
            .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`([^`]+)`/g, "<code>$1</code>"),
        )
      } finally {
        setIsLoading(false)
      }
    }

    renderMarkdown()
  }, [content])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  return (
    <div
      className={`prose prose-emerald max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
