"use client"

import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { marked } from "marked"

interface BlogPostContentProps {
  content: string
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  const [renderedContent, setRenderedContent] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (!content) {
        setError("No content available")
        return
      }

      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        headerPrefix: "heading-",
        mangle: false,
        pedantic: false,
        sanitize: false, // We'll use DOMPurify instead
        silent: false,
      })

      // Parse markdown to HTML
      const rawHtml = marked.parse(content)

      // Sanitize HTML to prevent XSS
      const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ["target", "rel"],
      })

      setRenderedContent(sanitizedHtml)
      setError(null)
    } catch (err) {
      console.error("Error rendering markdown:", err)
      setError("Failed to render content")
    }
  }, [content])

  if (error) {
    return (
      <div className="prose prose-zinc dark:prose-invert mx-auto py-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="prose prose-zinc dark:prose-invert mx-auto py-4"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
}
