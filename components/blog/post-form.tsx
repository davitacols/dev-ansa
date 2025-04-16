"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { slugify } from "@/lib/blog"
import { toast } from "@/components/ui/use-toast"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import {
  Eye,
  Pencil,
  FileImage,
  Link2,
  Code,
  ListOrdered,
  Bold,
  Italic,
  Heading2,
  Hash,
  ImageIcon,
  Undo,
  Redo,
  ListChecks,
  Quote,
  CodeSquare,
  Save,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  published: z.boolean().default(false),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

type FormValues = z.infer<typeof formSchema>

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

interface PostFormProps {
  categories: Category[]
  tags: Tag[]
  initialData?: Partial<FormValues> & { id?: string }
  isEditing?: boolean
}

export function PostForm({ categories, tags, initialData = {}, isEditing = false }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("edit")
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData.tags || [])

  const form = useForm<FormValues>({
    defaultValues: {
      title: initialData.title || "",
      slug: initialData.slug || "",
      excerpt: initialData.excerpt || "",
      content: initialData.content || "",
      featuredImage: initialData.featuredImage || "",
      published: initialData.published || false,
      categoryId: initialData.categoryId || undefined,
      tags: initialData.tags || [],
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      const url = isEditing ? `/api/blog/posts/${initialData.id}` : "/api/blog/posts"
      const method = isEditing ? "PATCH" : "POST"

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
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing
          ? "Your post has been updated successfully."
          : "Your post has been created successfully.",
      })

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = () => {
    const title = form.getValues("title")
    if (title) {
      form.setValue("slug", slugify(title))
    }
  }

  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      const newTags = [...selectedTags, tagId]
      setSelectedTags(newTags)
      form.setValue("tags", newTags)
    } else {
      const newTags = selectedTags.filter((id) => id !== tagId)
      setSelectedTags(newTags)
      form.setValue("tags", newTags)
    }
  }

  const insertMarkdown = (markdownTemplate: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = form.getValues("content")
    const before = text.substring(0, start)
    const after = text.substring(end)

    const newText = before + markdownTemplate + after
    form.setValue("content", newText)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newCursorPos =
        start + markdownTemplate.indexOf("|") !== -1
          ? start + markdownTemplate.indexOf("|")
          : start + markdownTemplate.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const watchContent = form.watch("content")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {isEditing ? "Edit Post" : "Create New Post"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Update your existing blog post with new content and settings."
                : "Create a new blog post with rich content and formatting."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title..." {...field} className="focus-visible:ring-emerald-500" />
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
                    <FormLabel className="text-sm font-medium">URL Slug</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <div className="flex rounded-md overflow-hidden border w-full">
                          <div className="bg-zinc-100 dark:bg-zinc-800 px-2 flex items-center border-r text-sm text-zinc-500">
                            /blog/
                          </div>
                          <Input
                            placeholder="post-slug"
                            {...field}
                            className="border-0 focus-visible:ring-emerald-500 rounded-none"
                          />
                        </div>
                      </FormControl>
                      <Button type="button" variant="outline" onClick={generateSlug} size="sm" className="text-xs">
                        <Hash className="h-3 w-3 mr-1" />
                        Generate
                      </Button>
                    </div>
                    <FormDescription className="text-xs">The URL-friendly version of the title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief summary of your post..."
                      {...field}
                      rows={3}
                      className="resize-none focus-visible:ring-emerald-500"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    A short summary that appears in blog listings and social shares.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium">Content</FormLabel>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">{watchContent?.length || 0} characters</span>
                    </div>
                  </div>
                  <FormDescription className="text-xs mb-2">
                    Write your post content using Markdown for rich formatting.
                  </FormDescription>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <TabsList className="h-9 p-0.5">
                        <TabsTrigger value="edit" className="flex items-center gap-1 h-8 px-3">
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="flex items-center gap-1 h-8 px-3">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {}} // Would connect to autosave
                        >
                          <Save className="h-3.5 w-3.5 mr-1" />
                          Autosaved
                        </Button>
                      </div>
                    </div>

                    <TabsContent value="edit" className="mt-0">
                      <TooltipProvider>
                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-t-md border border-b-0 p-1 flex flex-wrap gap-0.5">
                          <div className="flex items-center gap-0.5 mr-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {}} // Would implement undo
                                >
                                  <Undo className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Undo</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {}} // Would implement redo
                                >
                                  <Redo className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Redo</TooltipContent>
                            </Tooltip>
                          </div>

                          <Separator orientation="vertical" className="h-8 mx-1" />

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("**|**")}
                              >
                                <Bold className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Bold</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("*|*")}
                              >
                                <Italic className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Italic</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("\n## |")}
                              >
                                <Heading2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Heading</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("\n> |")}
                              >
                                <Quote className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Quote</TooltipContent>
                          </Tooltip>

                          <Separator orientation="vertical" className="h-8 mx-1" />

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("\n1. |\n2. \n3. ")}
                              >
                                <ListOrdered className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Ordered List</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("\n- |\n- \n- ")}
                              >
                                <ListChecks className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Bullet List</TooltipContent>
                          </Tooltip>

                          <Separator orientation="vertical" className="h-8 mx-1" />

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("`|`")}
                              >
                                <Code className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Inline Code</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("\n```\n|\n```")}
                              >
                                <CodeSquare className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Code Block</TooltipContent>
                          </Tooltip>

                          <Separator orientation="vertical" className="h-8 mx-1" />

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("[|](url)")}
                              >
                                <Link2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Link</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => insertMarkdown("![alt text](|)")}
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Image</TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>

                      <FormControl>
                        <Textarea
                          placeholder="Start writing your post here..."
                          {...field}
                          rows={15}
                          className="font-mono text-sm resize-none rounded-t-none focus-visible:ring-emerald-500 border-zinc-200 dark:border-zinc-800"
                        />
                      </FormControl>
                    </TabsContent>

                    <TabsContent value="preview" className="mt-0">
                      <ScrollArea className="w-full border rounded-md p-6 bg-white dark:bg-zinc-950 min-h-[400px] max-h-[500px]">
                        {watchContent ? (
                          <MarkdownRenderer content={watchContent} />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                            <Eye className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-2" />
                            <p className="text-zinc-500 dark:text-zinc-400">Nothing to preview yet...</p>
                            <p className="text-zinc-400 dark:text-zinc-500 text-sm">
                              Start writing in the editor to see a preview.
                            </p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Featured Image</FormLabel>
                    <div className="flex flex-col gap-3">
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                            className="focus-visible:ring-emerald-500"
                          />
                          <Button type="button" variant="outline" size="icon" className="shrink-0">
                            <FileImage className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>

                      {field.value && (
                        <div className="mt-2 relative aspect-video rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          <div className="flex items-center justify-center h-full">
                            <FileImage className="h-8 w-8 text-zinc-400" />
                          </div>
                          {/* Image preview would be shown here if uploaded */}
                        </div>
                      )}

                      <FormDescription className="text-xs">
                        URL to the featured image that appears at the top of your post and in social shares.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-emerald-500">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Published</FormLabel>
                        <FormDescription className="text-xs">
                          When checked, this post will be visible to the public.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <FormLabel className="text-sm font-medium">Tags</FormLabel>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedTags.length > 0 ? (
                    selectedTags.map((tagId) => {
                      const tag = tags.find((t) => t.id === tagId)
                      return tag ? (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
                        >
                          {tag.name}
                        </Badge>
                      ) : null
                    })
                  ) : (
                    <p className="text-sm text-zinc-500">No tags selected</p>
                  )}
                </div>

                <ScrollArea className="h-32 border rounded-md p-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {tags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag.id}`}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={(checked) => handleTagChange(tag.id, checked as boolean)}
                          className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <label htmlFor={`tag-${tag.id}`} className="text-sm leading-none cursor-pointer">
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update Post" : "Publish Post"}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
