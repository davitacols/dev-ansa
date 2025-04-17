import Link from "next/link"
import { FolderTreeIcon as FileTree } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 md:py-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileTree className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            <span className="text-sm font-medium">ansa-fs</span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Built by{" "}
            <Link
              href="https://github.com/davitacols"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-900 dark:text-zinc-300 hover:underline"
            >
              DataDisk
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/davitacols/ansa-fs"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-900 dark:text-zinc-300 hover:underline"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
