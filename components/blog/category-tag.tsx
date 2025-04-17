"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type CategoryTagProps = {
  type: "category" | "tag"
  name: string
  slug: string
  count?: number
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export function CategoryTag({ type, name, slug, count, size = "md", className, onClick }: CategoryTagProps) {
  const href = type === "category" ? `/blog/category/${slug}` : `/blog/tag/${slug}`

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  }

  const typeClasses = {
    category: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
    tag: "bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20",
  }

  return (
    <Link href={href} onClick={onClick}>
      <Badge
        className={cn(
          "rounded-full font-medium transition-colors border",
          sizeClasses[size],
          typeClasses[type],
          className,
        )}
        variant="outline"
      >
        {name}
        {count !== undefined && <span className="ml-1.5 text-muted-foreground text-xs">({count})</span>}
      </Badge>
    </Link>
  )
}

// For displaying multiple categories or tags in a list
export function CategoryTagList({
  items,
  type,
  size = "md",
  className,
}: {
  items: Array<{ name: string; slug: string; count?: number }>
  type: "category" | "tag"
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  if (!items || items.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <CategoryTag key={item.slug} type={type} name={item.name} slug={item.slug} count={item.count} size={size} />
      ))}
    </div>
  )
}
