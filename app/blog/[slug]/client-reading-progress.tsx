"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

export function ClientReadingProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }
    
    window.addEventListener('scroll', updateReadingProgress)
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [])
  
  return <Progress value={progress} className="h-1" />
}