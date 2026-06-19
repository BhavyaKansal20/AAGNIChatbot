'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Sidebar } from '@/components/layout/Sidebar'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const chatId = pathname.startsWith('/chat/') ? pathname.split('/chat/')[1] : undefined

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-aagni-bg flex items-center justify-center">
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-aagni-saffron"
              style={{
                animation: 'bounce 1s infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="dark-premium min-h-screen bg-aagni-darkbg flex overflow-hidden h-screen text-aagni-text">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
        currentChatId={chatId}
      />
      <main
        className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 260 : 0 }}
      >
        {children}
      </main>
    </div>
  )
}
