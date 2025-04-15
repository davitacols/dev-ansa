"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FeatureSuggestionFormProps {
  className?: string
}

export function FeatureSuggestionForm({ className }: FeatureSuggestionFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await fetch("/api/feature-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, category, suggestion }),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        // Clear the form on success
        setName("")
        setEmail("")
        setCategory("")
        setSuggestion("")
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while submitting your suggestion. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Feature Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cli">Command Line Interface</SelectItem>
                <SelectItem value="api">Programmatic API</SelectItem>
                <SelectItem value="analysis">Content Analysis</SelectItem>
                <SelectItem value="comparison">Directory Comparison</SelectItem>
                <SelectItem value="export">Export Formats</SelectItem>
                <SelectItem value="watch">Watch Mode</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggestion">Your Feature Suggestion</Label>
            <Textarea
              id="suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Describe your feature idea in detail..."
              className="min-h-[150px]"
              required
            />
          </div>
        </div>

        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Feature Suggestion"
          )}
        </Button>
      </form>
    </div>
  )
}
