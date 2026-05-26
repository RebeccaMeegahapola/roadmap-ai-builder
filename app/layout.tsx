import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navigation/Navbar'
import { createServerClient } from '@/lib/supabase/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Roadmap Generator',
  description: 'Generate professional roadmaps with AI',
}

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                            try {
                                const darkMode = localStorage.getItem('theme') === 'dark' ||
                                    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                                if (darkMode) {
                                    document.documentElement.classList.add('dark');
                                }
                            } catch (_) {}
                        `,
            }}
        />
      </head>
      <body className={inter.className}>
      {user && <Navbar />}
      {children}
      </body>
      </html>
  )
}