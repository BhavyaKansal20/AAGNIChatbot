'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Plus, Search, Clock, Pin, Folder, MoreHorizontal,
  Settings, LogOut, MessageSquare, Trash2
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Chat {
  id: string
  title: string
  updatedAt: string
}

export function Sidebar({
  isOpen,
  onToggle,
  currentChatId,
}: {
  isOpen: boolean
  onToggle: () => void
  currentChatId?: string
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) fetchChats()
  }, [session])

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/sessions')
      const data = await res.json()
      setChats(data.chats || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const createChat = async () => {
    const res = await fetch('/api/sessions', { method: 'POST' })
    const { id } = await res.json()
    router.push(`/chat/${id}`)
  }

  const deleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    await fetch(`/api/sessions/${chatId}`, { method: 'DELETE' })
    fetchChats()
    if (currentChatId === chatId) router.push('/dashboard')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-4 top-4 bottom-4 w-[300px] z-40"
        >
          <div className="w-full h-full dark-glass-panel rounded-[32px] flex flex-col shadow-premium border border-aagni-border/50 overflow-hidden relative">
            
            {/* Top Section */}
            <div className="p-4 space-y-4">
              <button
                onClick={createChat}
                className="w-full h-12 rounded-[16px] bg-gradient-to-r from-aagni-saffron to-aagni-orange text-white font-medium flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,122,26,0.2)] hover:shadow-[0_6px_25px_rgba(255,122,26,0.3)] hover:-translate-y-0.5 transition-all"
              >
                <Plus size={18} />
                <span>New Chat</span>
              </button>

              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-aagni-muted hover:text-white transition-colors text-sm font-medium">
                  <Search size={16} />
                  <span>Search Chats</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-aagni-muted hover:text-white transition-colors text-sm font-medium">
                  <Clock size={16} />
                  <span>Recent Chats</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-aagni-muted hover:text-white transition-colors text-sm font-medium">
                  <Pin size={16} />
                  <span>Pinned Chats</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-aagni-muted hover:text-white transition-colors text-sm font-medium">
                  <Folder size={16} />
                  <span>Folders</span>
                </button>
              </div>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 no-scrollbar">
              <div>
                <p className="text-xs font-semibold text-aagni-muted uppercase tracking-wider mb-2 px-4">Today's Chats</p>
                <div className="space-y-1">
                  {loading ? (
                    <div className="px-4 py-2 text-sm text-aagni-muted/50 animate-pulse">Loading...</div>
                  ) : chats.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-aagni-muted/50">No chats yet</div>
                  ) : (
                    chats.map(chat => (
                      <div
                        key={chat.id}
                        onClick={() => router.push(`/chat/${chat.id}`)}
                        className={`group relative flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                          currentChatId === chat.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-aagni-muted hover:text-white/90'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <MessageSquare size={16} className="shrink-0 opacity-70" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate">{chat.title || 'New Conversation'}</span>
                            <span className="text-[10px] opacity-50 truncate">{formatDate(chat.updatedAt)}</span>
                          </div>
                        </div>
                        <div className="hidden group-hover:flex items-center gap-1 shrink-0 absolute right-2 bg-gradient-to-l from-[#0A0D1C] via-[#0A0D1C] to-transparent pl-4">
                          <button className="p-1.5 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors">
                            <MoreHorizontal size={14} />
                          </button>
                          <button onClick={(e) => deleteChat(e, chat.id)} className="p-1.5 hover:bg-red-500/20 rounded-md text-white/50 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-2" />

            {/* Profile Section */}
            <div className="p-4 mt-auto">
              <div className="flex items-center justify-between p-3 rounded-[20px] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white group-hover:text-aagni-saffron transition-colors">
                      {session?.user?.name || 'User'}
                    </span>
                    <span className="text-[10px] text-aagni-saffron uppercase font-bold tracking-wider">AAGNI Pro</span>
                  </div>
                </div>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 text-aagni-muted hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
