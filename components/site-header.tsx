import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FolderTreeIcon as FileTree, Menu, Github, Lightbulb } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DocSearch } from "@/components/doc-search"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileTree className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            <span className="font-bold text-lg">ansa-fs</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <DocSearch />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/docs/installation"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Installation
          </Link>
          <Link
            href="/docs/usage"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Usage
          </Link>
          <Link
            href="/docs/api"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            API
          </Link>
          <Link
            href="/demo"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Demo
          </Link>
          <Link
            href="/feature-suggestions"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <Lightbulb className="h-4 w-4" />
            Suggest
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/davitacols/ansa-fs"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex"
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] pr-0">
              <div className="mt-6 mb-8">
                <DocSearch />
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/docs/installation" className="block px-2 py-1 text-lg">
                  Installation
                </Link>
                <Link href="/docs/usage" className="block px-2 py-1 text-lg">
                  Usage
                </Link>
                <Link href="/docs/api" className="block px-2 py-1 text-lg">
                  API
                </Link>
                <Link href="/demo" className="block px-2 py-1 text-lg">
                  Demo
                </Link>
                <Link href="/feature-suggestions" className="block px-2 py-1 text-lg flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Suggest Features
                </Link>
                <Link href="https://github.com/davitacols/ansa-fs" className="block px-2 py-1 text-lg">
                  GitHub
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
