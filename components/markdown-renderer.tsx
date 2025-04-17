"use client"

import { useEffect, useState } from "react"
import { marked } from "marked"
import DOMPurify from "dompurify"

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

        // Configure marked options
        marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false,
          smartypants: true,
          xhtml: true,
        })

        // Add custom renderer for our unique modern style
        const renderer = new marked.Renderer()

        // Modern heading style with gradient accent
        renderer.heading = (text, level) => {
          const sizes = {
            1: "text-4xl md:text-5xl",
            2: "text-3xl md:text-4xl",
            3: "text-2xl md:text-3xl",
            4: "text-xl md:text-2xl",
            5: "text-lg md:text-xl",
            6: "text-base md:text-lg",
          }

          const fontSizeClass = sizes[level] || "text-lg"
          const marginClass = level === 1 ? "mt-12 mb-6" : "mt-10 mb-4"

          return `<h${level} class="font-bold ${fontSizeClass} ${marginClass} tracking-tight">${text}</h${level}>`
        }

        // Modern paragraph style
        renderer.paragraph = (text) => {
          return `<p class="text-base md:text-lg leading-relaxed mb-6">${text}</p>`
        }

        // Modern list style
        renderer.list = (body, ordered) => {
          const tag = ordered ? "ol" : "ul"
          return `<${tag} class="my-6 pl-6 space-y-2 text-base md:text-lg">${body}</${tag}>`
        }

        // Modern list item style
        renderer.listitem = (text) => {
          return `<li class="leading-relaxed">${text}</li>`
        }

        // Modern blockquote style
        renderer.blockquote = (quote) => {
          return `<blockquote class="pl-4 py-3 my-8 border-l-4 border-primary bg-primary/5 rounded-r-md">${quote}</blockquote>`
        }

        // Modern code block style
        renderer.code = (code, language) => {
          return `<pre class="bg-zinc-950 dark:bg-zinc-900 text-zinc-100 p-4 rounded-lg my-6 overflow-x-auto border border-zinc-800 text-sm"><code class="language-${language || "text"}">${code}</code></pre>`
        }

        // Modern inline code style
        renderer.codespan = (code) => {
          return `<code class="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-800 dark:text-zinc-200 font-mono text-sm">${code}</code>`
        }

        // Modern link style
        renderer.link = (href, title, text) => {
          return `<a href="${href}" title="${title || ""}" class="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-colors">${text}</a>`
        }

        // Modern image style
        renderer.image = (href, title, text) => {
          return `
            <figure class="my-8">
              <img 
                src="${href}" 
                alt="${text || ""}" 
                class="rounded-lg w-full object-cover shadow-md" 
                loading="lazy"
              />
              ${title ? `<figcaption class="text-sm text-center mt-2 text-zinc-500 dark:text-zinc-400">${title}</figcaption>` : ""}
            </figure>
          `
        }

        // Modern horizontal rule
        renderer.hr = () => {
          return `<hr class="my-10 border-t border-zinc-200 dark:border-zinc-800" />`
        }

        marked.setRenderer(renderer)

        // Render markdown to HTML
        const renderedHtml = marked.parse(content)

        // Sanitize HTML to prevent XSS attacks
        const sanitizedHtml = DOMPurify.sanitize(renderedHtml)

        setHtml(sanitizedHtml)
      } catch (error) {
        console.error("Error rendering markdown:", error)
        setHtml(`<p class="text-red-500">Error rendering content</p>`)
      } finally {
        setIsLoading(false)
      }
    }

    renderMarkdown()
  }, [content])

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
      </div>
    )
  }

  return <div className={`modern-blog-content ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}
