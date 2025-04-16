"use client"

import { useState } from "react"
import { MarkdownRenderer } from "./markdown-renderer"

interface ContentDisplayProps {
  content: string
  className?: string
}

export function ContentDisplay({ content, className = "" }: ContentDisplayProps) {
  const [renderError, setRenderError] = useState(false)

  if (renderError) {
    // Fallback to basic HTML if markdown rendering fails
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{
          __html: content.replace(/\n/g, "<br>").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        }}
      />
    )
  }

  try {
    return <MarkdownRenderer content={content} className={className} />
  } catch (error) {
    console.error("Error rendering content:", error)
    setRenderError(true)
    return <div className="text-red-500">Error rendering content. Falling back to plain text...</div>
  }
}
