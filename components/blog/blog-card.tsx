import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPostWithRelations } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPostWithRelations
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-0">
      {post.featuredImage && (
        <div className="relative h-56 w-full">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <CardHeader className="flex-none pt-5 pb-2">
        <div className="flex gap-2 mb-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag.id} variant="secondary" className="font-medium text-xs px-2 py-0.5">
              <Link href={`/blog?tag=${tag.slug}`}>{tag.name}</Link>
            </Badge>
          ))}
          {post.tags && post.tags.length > 3 && (
            <Badge variant="outline" className="font-medium text-xs px-2 py-0.5">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        <Link href={`/blog/${post.slug}`} className="text-xl font-bold hover:text-primary transition-colors duration-200 line-clamp-2">
          {post.title}
        </Link>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        {post.excerpt && <p className="text-muted-foreground line-clamp-3 text-sm">{post.excerpt}</p>}
      </CardContent>
      <CardFooter className="flex-none pt-2 pb-5 border-t border-muted/30">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 rounded-full overflow-hidden bg-muted">
              {post.author?.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name || "Author"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <span className="font-medium">{post.author?.name || "Anonymous"}</span>
          </div>
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>
      </CardFooter>
    </Card>
  )
}