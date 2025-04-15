"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface AdminRegistrationFormProps {
  className?: string
}

export function AdminRegistrationForm({ className }: AdminRegistrationFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; errors?: any } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, secretKey }),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        // Clear the form on success
        setName("")
        setEmail("")
        setPassword("")
        setSecretKey("")

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while registering. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Register New Admin</CardTitle>
        <CardDescription>Create a new administrator account for the feature suggestion system.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
            <p className="text-xs text-zinc-500">Password must be at least 8 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secretKey">Admin Secret Key</Label>
            <Input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-zinc-500">Enter the secret key provided by the system administrator</p>
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>
                {result.message}
                {result.errors && (
                  <ul className="mt-2 text-sm">
                    {Object.entries(result.errors).map(([field, errors]) => (
                      <li key={field}>
                        <strong>{field}:</strong> {Array.isArray(errors) ? errors.join(", ") : errors}
                      </li>
                    ))}
                  </ul>
                )}
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Admin"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/login")}>
          Already have an account? Sign in
        </Button>
      </CardFooter>
    </Card>
  )
}
