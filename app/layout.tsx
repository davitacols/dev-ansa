import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ansa-fs Documentation",
  description:
    "Documentation for ansa-fs - A lightweight and flexible Node.js package to extract and visualize file system structures",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
