import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeatureSuggestionForm } from "@/components/feature-suggestion-form"
import { Lightbulb, Sparkles, Users } from "lucide-react"

export default function FeatureSuggestionsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center px-3 py-1 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Community Input
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Suggest a Feature</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Help shape the future of ansa-fs by suggesting new features or improvements. We value your input!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-2">
                <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <CardTitle>Share Your Ideas</CardTitle>
              <CardDescription>Have a brilliant idea for a new feature? We want to hear about it!</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-2">
                <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <CardTitle>Improve Existing Features</CardTitle>
              <CardDescription>Suggest enhancements to make existing features even better.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 mb-2">
                <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <CardTitle>Community-Driven</CardTitle>
              <CardDescription>Your feedback directly influences our development roadmap.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Feature Suggestion</CardTitle>
            <CardDescription>
              Fill out the form below to submit your feature suggestion. We'll review all submissions and consider them
              for future releases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeatureSuggestionForm />
          </CardContent>
        </Card>

        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <ol className="space-y-3 list-decimal list-inside text-zinc-700 dark:text-zinc-300">
            <li>Our team reviews all feature suggestions</li>
            <li>We evaluate feasibility and alignment with our roadmap</li>
            <li>Selected features are added to our development backlog</li>
            <li>You might be contacted for more details if needed</li>
            <li>Watch our GitHub repository for updates on new features</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
