"use client"

import { useState } from "react"
import { Twitter, Facebook, Linkedin, Mail, LinkIcon, Share2, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
  url?: string
  title: string
  description?: string
  className?: string
}

export function ShareButton({ url, title, description, className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Default to current page URL if no URL is provided
  const pageUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareUrl = url || pageUrl

  // Ensure we have the full URL
  const fullUrl =
    shareUrl && shareUrl.startsWith("http")
      ? shareUrl
      : `${process.env.NEXT_PUBLIC_APP_URL || "https://dev-ansa.vercel.app"}${shareUrl || ""}`

  // Encoded values for sharing
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || "")

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#4267B2] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0077B5] hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:bg-gray-700 hover:text-white",
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-1.5 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950 dark:hover:text-emerald-400",
            className,
          )}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 p-2 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        align="end"
      >
        <div className="grid gap-1">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              size="sm"
              className={cn("justify-start gap-2 transition-all duration-200", link.color)}
              onClick={() => {
                window.open(link.url, "_blank", "noopener,noreferrer")
                setIsOpen(false)
              }}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "justify-start gap-2 transition-all duration-200",
              copied
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
            )}
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" />
                Copy link
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
