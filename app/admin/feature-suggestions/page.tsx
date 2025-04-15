"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Trash2, MessageSquare, RefreshCw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types based on Prisma schema
type SuggestionStatus = "NEW" | "REVIEWING" | "PLANNED" | "IMPLEMENTED" | "DECLINED"

interface FeatureSuggestion {
  id: string
  name: string
  email: string
  category: string | null
  suggestion: string
  status: SuggestionStatus
  createdAt: string
  updatedAt: string
}

interface SuggestionComment {
  id: string
  content: string
  authorId: string
  suggestionId: string
  createdAt: string
  updatedAt: string
}

export default function FeatureSuggestionsAdminPage() {
  const { data: session, status } = useSession()
  const [suggestions, setSuggestions] = useState<FeatureSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedSuggestion, setSelectedSuggestion] = useState<FeatureSuggestion | null>(null)
  const [comments, setComments] = useState<SuggestionComment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/")
    } else if (status === "authenticated") {
      fetchSuggestions()
    }
  }, [status, session, router])

  const fetchSuggestions = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/feature-suggestion")

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions")
      }

      const data = await response.json()

      if (data.suggestions) {
        setSuggestions(data.suggestions)
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  const fetchComments = async (suggestionId: string) => {
    try {
      const response = await fetch(`/api/feature-suggestion/${suggestionId}/comments`)

      if (!response.ok) {
        throw new Error("Failed to fetch comments")
      }

      const data = await response.json()

      if (data.comments) {
        setComments(data.comments)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast({
        title: "Error",
        description: "Failed to fetch comments. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateStatus = async (id: string, status: SuggestionStatus) => {
    try {
      const response = await fetch(`/api/feature-suggestion/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      const data = await response.json()

      if (data.success) {
        setSuggestions((prev) =>
          prev.map((suggestion) => (suggestion.id === id ? { ...suggestion, status } : suggestion)),
        )

        toast({
          title: "Status updated",
          description: `Suggestion status updated to ${status.toLowerCase()}`,
        })
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteSuggestion = async (id: string) => {
    try {
      const response = await fetch(`/api/feature-suggestion/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete suggestion")
      }

      const data = await response.json()

      if (data.success) {
        setSuggestions((prev) => prev.filter((suggestion) => suggestion.id !== id))

        toast({
          title: "Suggestion deleted",
          description: "The suggestion has been deleted successfully",
        })
      }
    } catch (error) {
      console.error("Error deleting suggestion:", error)
      toast({
        title: "Error",
        description: "Failed to delete suggestion. Please try again.",
        variant: "destructive",
      })
    }
  }

  const submitComment = async () => {
    if (!selectedSuggestion || !newComment.trim()) return

    try {
      setIsSubmittingComment(true)

      const response = await fetch(`/api/feature-suggestion/${selectedSuggestion.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (!response.ok) {
        throw new Error("Failed to add comment")
      }

      const data = await response.json()

      if (data.success) {
        setNewComment("")
        fetchComments(selectedSuggestion.id)

        toast({
          title: "Comment added",
          description: "Your comment has been added successfully",
        })
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleViewComments = (suggestion: FeatureSuggestion) => {
    setSelectedSuggestion(suggestion)
    fetchComments(suggestion.id)
  }

  const filteredSuggestions = activeTab === "all" ? suggestions : suggestions.filter((s) => s.status === activeTab)

  const getStatusColor = (status: SuggestionStatus) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "REVIEWING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "PLANNED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "IMPLEMENTED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "DECLINED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Feature Suggestions Dashboard</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Review and manage feature suggestions submitted by users.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSuggestions}
            disabled={isRefreshing}
            className="flex items-center gap-1"
          >
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="NEW">New</TabsTrigger>
            <TabsTrigger value="REVIEWING">Reviewing</TabsTrigger>
            <TabsTrigger value="PLANNED">Planned</TabsTrigger>
            <TabsTrigger value="IMPLEMENTED">Implemented</TabsTrigger>
            <TabsTrigger value="DECLINED">Declined</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredSuggestions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-zinc-500 dark:text-zinc-400">No suggestions found</p>
              {activeTab !== "all" && (
                <Button variant="ghost" onClick={() => setActiveTab("all")} className="mt-4">
                  View all suggestions
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{suggestion.category || "Other"}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span>
                          From: {suggestion.name} ({suggestion.email})
                        </span>
                        <span>•</span>
                        <span>{new Date(suggestion.createdAt).toLocaleString()}</span>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(suggestion.status)}>
                      {suggestion.status.charAt(0) + suggestion.status.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md mb-4 whitespace-pre-wrap">
                    {suggestion.suggestion}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">Update status:</span>
                      <Select
                        value={suggestion.status}
                        onValueChange={(value) => updateStatus(suggestion.id, value as SuggestionStatus)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">New</SelectItem>
                          <SelectItem value="REVIEWING">Reviewing</SelectItem>
                          <SelectItem value="PLANNED">Planned</SelectItem>
                          <SelectItem value="IMPLEMENTED">Implemented</SelectItem>
                          <SelectItem value="DECLINED">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleViewComments(suggestion)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Comments
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Comments</DialogTitle>
                            <DialogDescription>View and add comments for this feature suggestion.</DialogDescription>
                          </DialogHeader>
                          <div className="max-h-[400px] overflow-y-auto py-4">
                            {comments.length === 0 ? (
                              <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                                No comments yet. Be the first to comment!
                              </p>
                            ) : (
                              <div className="space-y-4">
                                {comments.map((comment) => (
                                  <div key={comment.id} className="flex gap-3 p-3 border rounded-md">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/vibrant-street-market.png" alt="Avatar" />
                                      <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <p className="text-sm font-medium">Admin</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                          {new Date(comment.createdAt).toLocaleString()}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-end gap-2 mt-4">
                            <Textarea
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1"
                            />
                            <Button onClick={submitComment} disabled={!newComment.trim() || isSubmittingComment}>
                              {isSubmittingComment ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 flex items-center gap-2"
                            onClick={() => deleteSuggestion(suggestion.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Suggestion
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
