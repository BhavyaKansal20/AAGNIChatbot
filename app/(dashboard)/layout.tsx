'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Sidebar } from '@/components/layout/Sidebar'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const chatId = pathname.startsWith('/chat/') ? pathname.split('/chat/')[1] : undefined

  useEffect(() => {
    // Auto-close sidebar on mobile by default
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
        setSidebarOpen(false)
      } else {
        setSidebarOpen(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen relative z-10 flex items-center justify-center">
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
    <div className="min-h-[100dvh] w-full relative z-10 flex overflow-hidden h-[100dvh] text-[#1A1F3B] selection:bg-aagni-saffron/30 selection:text-[#1A1F3B]">

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
        currentChatId={chatId}
      />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Toggle Button (Floating) */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-xl bg-white/40 backdrop-blur-md border border-white text-[#1A1F3B]/50 hover:text-[#1A1F3B] hover:bg-white/60 transition-colors shadow-sm"
        title="Toggle Sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <main
        className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 relative z-10 ${sidebarOpen ? 'md:ml-[260px]' : 'ml-0'}`}
      >
        {children}
      </main>
    </div>
  )
}
