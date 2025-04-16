import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Tag, FolderOpen } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Suggestions</CardTitle>
            <CardDescription>Manage user feature suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/feature-suggestions">
                <MessageSquare className="mr-2 h-4 w-4" />
                Manage Suggestions
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/blog">
                <FileText className="mr-2 h-4 w-4" />
                Manage Posts
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage blog categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/blog/categories">
                <FolderOpen className="mr-2 h-4 w-4" />
                Manage Categories
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Manage blog tags</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/blog/tags">
                <Tag className="mr-2 h-4 w-4" />
                Manage Tags
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
