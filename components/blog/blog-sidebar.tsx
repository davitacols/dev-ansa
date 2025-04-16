import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    posts: number
  }
}

interface Tag {
  id: string
  name: string
  slug: string
  _count: {
    posts: number
  }
}

interface BlogSidebarProps {
  categories: Category[]
  tags: Tag[]
}

export function BlogSidebar({ categories, tags }: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog?category=${category.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name} ({category._count.posts})
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                <Link href={`/blog?tag=${tag.slug}`}>
                  {tag.name} ({tag._count.posts})
                </Link>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
