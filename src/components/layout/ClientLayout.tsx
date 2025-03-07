'use client'

import { TopNav } from '@/components/navigation/TopNav'
import { ThemeProvider } from 'next-themes'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <TopNav />
        <main className="container pt-20 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </ThemeProvider>
  )
}
