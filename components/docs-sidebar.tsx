"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Usage",
    links: [
      { title: "Overview", href: "/docs/usage" },
      { title: "CLI", href: "/docs/usage/cli" },
      { title: "Programmatic", href: "/docs/usage/programmatic" },
    ],
  },
  {
    title: "Features",
    links: [
      { title: "Content Analysis", href: "/docs/features/content-analysis" },
      { title: "Directory Comparison", href: "/docs/features/directory-comparison" },
      { title: "Watch Mode", href: "/docs/features/watch-mode" },
      { title: "Export Formats", href: "/docs/features/export-formats" },
    ],
  },
  {
    title: "API Reference",
    links: [
      { title: "Overview", href: "/docs/api" },
      { title: "extractStructure", href: "/docs/api/extract-structure" },
      { title: "diffStructures", href: "/docs/api/diff-structures" },
      { title: "watchStructure", href: "/docs/api/watch-structure" },
      { title: "exportToMarkdown", href: "/docs/api/export-to-markdown" },
    ],
  },
  {
    title: "Guides",
    links: [
      { title: "Integration", href: "/docs/guides/integration" },
      { title: "Troubleshooting", href: "/docs/guides/troubleshooting" },
    ],
  },
  {
    title: "Examples",
    links: [{ title: "Examples", href: "/docs/examples" }],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full max-w-[240px] pb-10">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto py-6 pr-6">
        <nav className="flex flex-col space-y-6">
          {sidebarLinks.map((section) => (
            <div key={section.title} className="flex flex-col space-y-2">
              <h4 className="font-medium text-sm text-zinc-500 dark:text-zinc-400">{section.title}</h4>
              <div className="flex flex-col space-y-1">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
                      pathname === link.href
                        ? "font-medium text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400",
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
