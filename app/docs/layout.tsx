import type React from "react"
import { DocsSidebar } from "@/components/docs-sidebar"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 lg:py-12">
      <div className="flex flex-col md:flex-row gap-10">
        <aside className="md:w-64 lg:w-72 shrink-0">
          <div className="sticky top-20 pr-4 pb-12">
            <DocsSidebar />
          </div>
        </aside>
        <main className="flex-1 min-w-0 max-w-3xl">
          <div className="prose dark:prose-invert prose-zinc max-w-none">{children}</div>
        </main>
      </div>
    </div>
  )
}