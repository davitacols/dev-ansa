"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
}

export function SearchInput({ 
  className, 
  wrapperClassName,
  defaultValue = "",
  ...props 
}: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(defaultValue)

  const handleSearch = (term: string) => {
    setValue(term)
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (term) {
        params.set("q", term)
      } else {
        params.delete("q")
      }
      
      // Reset to page 1 when searching
      params.delete("page")
      
      router.push(`/blog?${params.toString()}`)
    })
  }

  return (
    <div className={cn("relative", wrapperClassName)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className={cn("pl-9 pr-4", className)}
        placeholder="Search..."
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        disabled={isPending}
        {...props}
      />
    </div>
  )
}