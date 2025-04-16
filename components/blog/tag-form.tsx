"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { slugify } from "@/lib/blog"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
})

type FormValues = z.infer<typeof formSchema>

interface TagFormProps {
  tag?: any
  onSuccess?: () => void
}

export function TagForm({ tag, onSuccess }: TagFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: tag
      ? {
          name: tag.name,
          slug: tag.slug,
        }
      : {
          name: "",
          slug: "",
        },
  })

  // Auto-generate slug from name
  form.watch((value, { name }) => {
    if (name === "name" && value.name && !tag) {
      form.setValue("slug", slugify(value.name as string))
    }
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      const url = tag ? `/api/blog/tags/${tag.id}` : "/api/blog/tags"

      const method = tag ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
      }

      toast({
        title: tag ? "Tag updated" : "Tag created",
        description: tag ? "The tag has been updated successfully." : "The tag has been created successfully.",
      })

      form.reset({
        name: "",
        slug: "",
      })

      if (onSuccess) {
        onSuccess()
      }

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save tag",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tag ? "Edit Tag" : "Create Tag"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tag name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="tag-slug" {...field} />
                  </FormControl>
                  <FormDescription>The URL-friendly version of the name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {tag ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{tag ? "Update" : "Create"} Tag</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
