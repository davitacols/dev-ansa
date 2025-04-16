import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z } from "zod"

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string

    // Validate the email
    const result = subscribeSchema.safeParse({ email })

    if (!result.success) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Here you would typically add the email to your newsletter service
    // For example, using a service like Mailchimp, ConvertKit, etc.

    // For now, we'll just simulate a successful subscription
    console.log(`Newsletter subscription for: ${email}`)

    // Redirect back to the blog with a success message
    return NextResponse.redirect(new URL("/blog?subscribed=true", request.url))
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe to the newsletter" }, { status: 500 })
  }
}
