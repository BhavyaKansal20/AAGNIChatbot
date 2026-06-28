import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { IndianVibeBackground } from '@/components/shared/IndianVibeBackground'

export const metadata: Metadata = {
  title: 'Aagni AI — India\'s Intelligent Assistant',
  description: 'A premium multimodal AI assistant powered by Sarvam AI, built for India.',
  icons: { icon: '/icons/aagni-icon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#090910',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <IndianVibeBackground />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
