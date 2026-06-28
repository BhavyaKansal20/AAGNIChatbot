'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Plus, Search, Clock, Pin, Folder, MoreHorizontal,
  Settings, LogOut, MessageSquare, Trash2,
  FileText, Image as ImageIcon, Mic, User
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
  const pathname = usePathname()
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [incognitoMode, setIncognitoMode] = useState(false)

  useEffect(() => {
    if (session) fetchChats()
    const saved = localStorage.getItem('aagni_incognito')
    if (saved) setIncognitoMode(JSON.parse(saved))
  }, [session])

  useEffect(() => {
    localStorage.setItem('aagni_incognito', JSON.stringify(incognitoMode))
  }, [incognitoMode])

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
    try {
      const res = await fetch('/api/sessions', { method: 'POST' })
      const data = await res.json()
      if (data.chat?.id) {
        router.push(`/chat/${data.chat.id}`)
      }
    } catch (e) {
      console.error(e)
    }
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
          <div className="w-full h-full clay-glass rounded-[32px] flex flex-col overflow-hidden relative">
            
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
                {[
                  { label: 'Chat', icon: <MessageSquare size={16} />, href: '/chat' },
                  { label: 'Voice Mode', icon: <Mic size={16} />, href: '/voice-mode' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                      pathname && pathname.startsWith(item.href)
                        ? 'bg-white/40 text-[#1A1F3B] shadow-sm'
                        : 'hover:bg-white/20 text-[#1A1F3B]/70 hover:text-[#1A1F3B]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent my-2" />

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 no-scrollbar">
              <div>
                <p className="text-xs font-semibold text-[#1A1F3B]/60 uppercase tracking-wider mb-2 px-4">Today's Chats</p>
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
                          currentChatId === chat.id ? 'bg-white/40 text-[#1A1F3B] shadow-sm' : 'hover:bg-white/20 text-[#1A1F3B]/70 hover:text-[#1A1F3B]'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <MessageSquare size={16} className="shrink-0 opacity-70" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate">{chat.title || 'New Conversation'}</span>
                            <span className="text-[10px] opacity-50 truncate">{formatDate(chat.updatedAt)}</span>
                          </div>
                        </div>
                        <div className="hidden group-hover:flex items-center gap-1 shrink-0 absolute right-2 bg-gradient-to-l from-white via-white/90 to-transparent pl-4 rounded-r-xl">
                          <button className="p-1.5 hover:bg-black/5 rounded-md text-[#1A1F3B]/50 hover:text-white transition-colors">
                            <MoreHorizontal size={14} />
                          </button>
                          <button onClick={(e) => deleteChat(e, chat.id)} className="p-1.5 hover:bg-red-500/20 rounded-md text-[#1A1F3B]/50 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent mt-2" />

            {/* Profile Section & Dropdown Menu */}
            <div className="p-4 mt-auto relative">
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-4 right-4 mb-2 p-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-2xl flex flex-col gap-1 z-50"
                  >
                    <button onClick={() => router.push('/profile')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 text-[#1A1F3B]/80 hover:text-white transition-colors w-full text-left">
                      <User size={16} />
                      <span className="text-sm font-medium">Profile</span>
                    </button>
                    <button onClick={() => router.push('/settings')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 text-[#1A1F3B]/80 hover:text-white transition-colors w-full text-left">
                      <Settings size={16} />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                    <button 
                      onClick={() => setIncognitoMode(!incognitoMode)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 text-[#1A1F3B]/80 hover:text-white transition-colors w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="4" y1="4" x2="20" y2="20"/></svg>
                        <span className="text-sm font-medium">Incognito Mode</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${incognitoMode ? 'bg-aagni-saffron' : 'bg-white/20'}`}>
                        <div className={`w-3 h-3 rounded-full bg-white transition-transform ${incognitoMode ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </button>
                    <div className="h-[1px] w-full bg-black/5 my-1" />
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/20 text-red-400/80 hover:text-red-400 transition-colors w-full text-left"
                    >
                      <LogOut size={16} />
                      <span className="text-sm font-medium">Log out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center justify-between p-3 rounded-[20px] bg-white/30 border border-white/50 hover:bg-white/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10">
                    <Image
                      src={session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1A1F3B] group-hover:text-aagni-saffron transition-colors">
                      {session?.user?.name || 'User'}
                    </span>
                    <span className="text-[10px] text-aagni-saffron uppercase font-bold tracking-wider">
                      {incognitoMode ? 'Incognito' : 'AI Engineer'}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-[#1A1F3B]/50 group-hover:text-[#1A1F3B] rounded-full transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
