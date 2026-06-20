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
    <div className="dark-premium min-h-screen bg-aagni-darkbg flex overflow-hidden h-screen text-aagni-text relative">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
        currentChatId={chatId}
      />
      
      {/* Sidebar Toggle Button (Floating) */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg dark-glass-panel border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        title="Toggle Sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </button>

      <main
        className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 relative"
        style={{ marginLeft: sidebarOpen ? 260 : 0 }}
      >
        {children}
      </main>
    </div>
  )
}
