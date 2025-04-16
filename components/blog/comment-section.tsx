"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Loader2, ThumbsUp, Reply, MoreHorizontal } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  content: string
  createdAt: Date
  author: {
    id: string
    name: string | null
    image: string | null
    role?: string | null
  }
  replies?: Comment[]
  likes?: number
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  className?: string
}

export function CommentSection({ postId, comments: initialComments, className = "" }: CommentSectionProps) {
  const { data: session, status } = useSession()
  const [content, setContent] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)
  const [comments, setComments] = useState<Comment[]>(initialComments || [])
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/blog/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit comment")
      }

      const newComment = await response.json()
      setComments([newComment, ...comments])
      setContent("")
      toast({
        title: "Comment submitted",
        description: "Your comment has been posted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setIsSubmittingReply(true)

    try {
      const response = await fetch("/api/blog/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: replyContent,
          parentId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit reply")
      }

      const newReply = await response.json()

      // Update the local comments state to include the new reply
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            }
          }
          return comment
        }),
      )

      setReplyTo(null)
      setReplyContent("")
      toast({
        title: "Reply submitted",
        description: "Your reply has been posted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const handleLikeComment = (commentId: string) => {
    if (status !== "authenticated") {
      toast({
        title: "Authentication required",
        description: "Please sign in to like comments.",
        variant: "destructive",
      })
      return
    }

    // Optimistically update UI
    const newLikedComments = new Set(likedComments)

    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId)
    } else {
      newLikedComments.add(commentId)
    }

    setLikedComments(newLikedComments)

    // Update comments with new like count
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const currentLikes = comment.likes || 0
          return {
            ...comment,
            likes: newLikedComments.has(commentId) ? currentLikes + 1 : currentLikes - 1,
          }
        }
        return comment
      }),
    )

    // TODO: Send API request to update like count in database
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        {comments.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Newest
            </Button>
            <Button variant="ghost" size="sm">
              Most Liked
            </Button>
          </div>
        )}
      </div>

      {status === "authenticated" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || "User"} />
                <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{session.user?.name}</p>
                <p className="text-xs text-muted-foreground">Commenting as yourself</p>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmitComment}>
            <CardContent>
              <Textarea
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none"
                required
              />
            </CardContent>
            <CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-3">
              <Button type="submit" disabled={isSubmitting} className="gap-1.5">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Post Comment
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">Join the conversation</h3>
              <p className="text-muted-foreground mb-4">Sign in to leave a comment and join the discussion.</p>
              <Button asChild>
                <a href="/login">Sign In</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.image || undefined} alt={comment.author.name || "User"} />
                      <AvatarFallback>{comment.author.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{comment.author.name || "Anonymous"}</p>
                          {comment.author.role === "ADMIN" && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                            >
                              Author
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Report</DropdownMenuItem>
                              {session?.user?.id === comment.author.id && (
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{comment.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <ThumbsUp
                            className={`h-3.5 w-3.5 ${
                              likedComments.has(comment.id) ? "fill-current text-emerald-600" : ""
                            }`}
                          />
                          <span>{comment.likes || 0}</span>
                        </Button>
                        {status === "authenticated" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1.5 text-xs"
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          >
                            <Reply className="h-3.5 w-3.5" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {replyTo === comment.id && status === "authenticated" && (
                <Card className="ml-12 border-l-4 border-l-emerald-200 dark:border-l-emerald-800">
                  <form onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                    <CardContent className="pt-4 pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || "User"} />
                          <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium">Replying to {comment.author.name}</p>
                      </div>
                      <Textarea
                        placeholder={`Reply to ${comment.author.name}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px] resize-none"
                        required
                      />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 py-2">
                      <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" disabled={isSubmittingReply}>
                        {isSubmittingReply ? (
                          <>
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Reply"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 space-y-4">
                  {comment.replies.map((reply) => (
                    <Card key={reply.id} className="border-l-4 border-l-emerald-200 dark:border-l-emerald-800">
                      <CardContent className="pt-4">
                        <div className="flex space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.author.image || undefined} alt={reply.author.name || "User"} />
                            <AvatarFallback>{reply.author.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{reply.author.name || "Anonymous"}</p>
                                {reply.author.role === "ADMIN" && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                                  >
                                    Author
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg">
            <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No comments yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your thoughts on this post!</p>
          </div>
        )}
      </div>
    </div>
  )
}
