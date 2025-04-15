"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FolderTreeIcon as FileTree, Menu, Github, Lightbulb, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DocSearch } from "@/components/doc-search"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const docsLinks = [
    { href: "/docs/installation", label: "Installation" },
    { href: "/docs/usage", label: "Usage" },
    { href: "/docs/api", label: "API" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 shadow-sm"
          : "bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80"
      } dark:border-zinc-800`}
    >
      <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <FileTree className="h-6 w-6 text-emerald-500 dark:text-emerald-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
            </motion.div>
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              ansa-fs
            </span>
          </Link>
        </motion.div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <DocSearch />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Docs Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("docs")}
              className="flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors"
            >
              Docs
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "docs" ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === "docs" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-1 w-48 rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 overflow-hidden z-50"
                >
                  <div className="py-1">
                    {docsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/demo"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors relative group"
          >
            Demo
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            href="/feature-suggestions"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors flex items-center gap-1 group"
          >
            <Lightbulb className="h-4 w-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
            <span>Suggest</span>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/davitacols/ansa-fs"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>

          <ThemeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pr-0 border-l border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-8 mt-2">
                <FileTree className="h-6 w-6 text-emerald-500" />
                <span className="font-bold text-lg">ansa-fs</span>
              </div>

              <div className="mb-6">
                <DocSearch />
              </div>

              <nav className="flex flex-col gap-1">
                <div className="px-1 py-2">
                  <p className="text-xs uppercase text-zinc-500 dark:text-zinc-400 font-medium mb-2 ml-2">
                    Documentation
                  </p>
                  {docsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-2 py-2 text-base rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="px-1 py-2 border-t border-zinc-200 dark:border-zinc-800">
                  <Link
                    href="/demo"
                    className="block px-2 py-2 text-base rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Demo
                  </Link>

                  <Link
                    href="/feature-suggestions"
                    className="block px-2 py-2 text-base rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Suggest Features
                  </Link>

                  <Link
                    href="https://github.com/davitacols/ansa-fs"
                    className="block px-2 py-2 text-base rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
