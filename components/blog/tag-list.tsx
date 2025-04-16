"use client"
import Link from "next/link"
import type { Tag } from "@prisma/client"
import { Badge } from "@/components/ui/badge"

interface TagListProps {
  tags: Tag[]
  className?: string
}

export function TagList({ tags, className = "" }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            {tag.name}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
