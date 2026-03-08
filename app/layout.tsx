import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import { SWRProvider } from '@/lib/swr-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'IntegriSentinel - Digital Infrastructure Integrity Monitoring System',
  description: 'Advanced cybersecurity monitoring platform for institutional infrastructure integrity. Real-time threat detection, compliance management, and security intelligence.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SWRProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SWRProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
