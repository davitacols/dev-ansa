"use client"

import { useState, useEffect } from "react"
import { ShareButton } from "./share-button"
import { cn } from "@/lib/utils"

interface FloatingShareButtonProps {
  url: string
  title: string
  description?: string
}

export function FloatingShareButton({ url, title, description }: FloatingShareButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setIsVisible(scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none",
      )}
    >
      <ShareButton
        url={url}
        title={title}
        description={description}
        className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl bg-white dark:bg-zinc-800"
      />
    </div>
  )
}
