import type { Metadata } from "next"

interface SocialSharingMetaProps {
  title: string
  description: string
  url: string
  imageUrl?: string
}

export function generateSocialMeta({
  title,
  description,
  url,
  imageUrl = "/abstract-file-system.png",
}: SocialSharingMetaProps): Metadata {
  // Ensure the image URL is absolute
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_APP_URL || "https://ansa-fs.vercel.app"}${imageUrl}`

  // Ensure the page URL is absolute
  const fullUrl = url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_APP_URL || "https://ansa-fs.vercel.app"}${url}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
  }
}
