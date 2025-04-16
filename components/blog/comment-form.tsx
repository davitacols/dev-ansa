"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, Send, MessageSquare, LogIn } from "lucide-react"

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
})

type FormValues = z.infer<typeof commentSchema>

interface CommentFormProps {
  postId: string
  parentId?: string
  onSuccess?: () => void
}

export function CommentForm({ postId, parentId, onSuccess }: CommentFormProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [charCount, setCharCount] = useState(0)
  
  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (status !== "authenticated") {
      toast({
        title: "Authentication required",
        description: "You must be logged in to comment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/blog/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          parentId,
          content: values.content,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
      }

      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      })

      form.reset()
      setCharCount(0)
      router.refresh()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post comment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "loading") {
    return (
      <Card className="w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            <span className="text-sm text-zinc-500">Loading comment form...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status === "unauthenticated") {
    return (
      <Card className="w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-3">
              <MessageSquare className="h-6 w-6 text-zinc-500" />
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-1">Join the conversation</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Sign in to share your thoughts on this post
              </p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <a href="/api/auth/signin" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In to Comment
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 mb-8">
      <CardContent className="p-4 pt-6">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 rounded-full">
                {session?.user?.name?.[0] || "U"}
              </div>
            )}
          </Avatar>
          
          <div className="flex-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder={parentId ? "Write your reply..." : "Share your thoughts..."}
                          className="resize-none min-h-[100px] border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500 focus-visible:ring-offset-0"
                          {...field}
                          rows={4}
                          onChange={(e) => {
                            field.onChange(e)
                            setCharCount(e.target.value.length)
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-zinc-500">
                    {charCount > 0 && `${charCount} characters`}
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    size="sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-3 w-3" />
                        {parentId ? "Post Reply" : "Post Comment"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}