"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const authenticatedCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
})

const guestCommentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  content: z.string().min(1, "Comment cannot be empty"),
})

type AuthenticatedFormValues = z.infer<typeof authenticatedCommentSchema>
type GuestFormValues = z.infer<typeof guestCommentSchema>

interface CommentFormProps {
  postId: string
  parentId?: string
  onSuccess?: () => void
}

export function CommentForm({ postId, parentId, onSuccess }: CommentFormProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [commentType, setCommentType] = useState<"guest" | "auth">(status === "authenticated" ? "auth" : "guest")

  const authenticatedForm = useForm<AuthenticatedFormValues>({
    resolver: zodResolver(authenticatedCommentSchema),
    defaultValues: {
      content: "",
    },
  })

  const guestForm = useForm<GuestFormValues>({
    resolver: zodResolver(guestCommentSchema),
    defaultValues: {
      name: "",
      email: "",
      content: "",
    },
  })

  const onSubmitAuthenticated = async (values: AuthenticatedFormValues) => {
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

      authenticatedForm.reset()
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

  const onSubmitGuest = async (values: GuestFormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/blog/comments/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          parentId,
          name: values.name,
          email: values.email,
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

      guestForm.reset()
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
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <div className="mb-8">
      <Tabs value={commentType} onValueChange={(value) => setCommentType(value as "guest" | "auth")}>
        <TabsList className="mb-4">
          <TabsTrigger value="guest">Comment as Guest</TabsTrigger>
          {status === "authenticated" && <TabsTrigger value="auth">Comment as {session?.user?.name}</TabsTrigger>}
        </TabsList>

        <TabsContent value="guest">
          <Form {...guestForm}>
            <form onSubmit={guestForm.handleSubmit(onSubmitGuest)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={guestForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={guestForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email (not published)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={guestForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your comment..." className="resize-none" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Comment"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>

        {status === "authenticated" && (
          <TabsContent value="auth">
            <Form {...authenticatedForm}>
              <form onSubmit={authenticatedForm.handleSubmit(onSubmitAuthenticated)} className="space-y-4">
                <FormField
                  control={authenticatedForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Write your comment..." className="resize-none" {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
