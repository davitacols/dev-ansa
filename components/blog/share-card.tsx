"use client"

import { Twitter, Facebook, Linkedin, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShareCardProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareCard({ url, title, description, className }: ShareCardProps) {
  // Ensure we have the full URL
  const fullUrl = url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_APP_URL || "https://ansa-fs.vercel.app"}${url}`

  // Encoded values for sharing
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || "")

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-[#1DA1F2] hover:bg-[#1a94df] text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#4267B2] hover:bg-[#3b5998] text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0077B5] hover:bg-[#006699] text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "bg-gray-700 hover:bg-gray-800 text-white",
    },
  ]

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Share this article</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          If you found this article helpful, please share it with your friends and colleagues!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              className={cn("w-full transition-all duration-300 transform hover:scale-105", link.color)}
              onClick={() => {
                window.open(link.url, "_blank", "noopener,noreferrer")
              }}
            >
              <link.icon className="h-4 w-4 mr-2" />
              {link.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
