// layout.tsx - Server Component
import type { Metadata } from "next"
import { getBlogPostBySlug } from "@/lib/blog"
import { generateSocialMeta } from "@/components/blog/social-sharing-meta"

interface BlogPostLayoutProps {
  params: {
    slug: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = params
  const post = await getBlogPostBySlug(slug, false)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return generateSocialMeta({
    title: `${post.title} | ansa-fs Documentation`,
    description: post.excerpt || `Read ${post.title} on ansa-fs Documentation`,
    url: `/blog/${post.slug}`,
    imageUrl: post.featuredImage || "/abstract-file-system.png",
    publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    modifiedTime: post.updatedAt?.toISOString(),
    authorName: post.author?.name,
    tags: post.tags?.map(tag => tag.name) || [],
  })
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children
}