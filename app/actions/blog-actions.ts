"use server"

import { getBlogPosts, getCategories, getTags, getRelatedPosts } from "@/lib/blog"

// Server action wrappers for the existing blog functions
export async function fetchBlogPosts(params) {
  return getBlogPosts(params)
}

export async function fetchCategories() {
  return getCategories()
}

export async function fetchTags() {
  return getTags()
}

export async function fetchRelatedPosts(postId, categoryId, tagIds, limit) {
  return getRelatedPosts(postId, categoryId, tagIds, limit)
}
