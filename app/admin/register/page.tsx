import { AdminRegistrationForm } from "@/components/admin-registration-form"

export default function AdminRegistrationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md">
        <AdminRegistrationForm />
      </div>
    </div>
  )
}
