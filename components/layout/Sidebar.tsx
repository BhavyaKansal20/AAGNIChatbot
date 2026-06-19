'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  MessageSquarePlus, Trash2, ChevronLeft, ChevronRight,
  LogOut, Settings, Flame
} from 'lucide-react'
import { AagniOrb } from '@/components/effects/AagniOrb'
import { formatDate, truncate } from '@/lib/utils'

interface Chat {
  id: string
  title: string
  updatedAt: string
  messages?: { content: string; role: string }[]
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

  const createNewChat = async () => {
    const res = await fetch('/api/sessions', { method: 'POST' })
    const data = await res.json()
    if (data.chat) {
      router.push(`/chat/${data.chat.id}`)
      fetchChats()
    }
  }

  const deleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    await fetch(`/api/sessions/${chatId}`, { method: 'DELETE' })
    fetchChats()
    if (currentChatId === chatId) router.push('/dashboard')
  }

  const grouped = chats.reduce(
    (acc: Record<string, Chat[]>, chat) => {
      const label = formatDate(chat.updatedAt)
      if (!acc[label]) acc[label] = []
      acc[label].push(chat)
      return acc
    },
    {}
  )

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-black/60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <motion.aside
        className="fixed left-0 top-0 z-30 h-screen flex flex-col glass-strong border-r border-aagni-border overflow-hidden"
        animate={{ width: isOpen ? 260 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full min-w-[260px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-aagni-border">
            <div className="flex items-center gap-2">
              <AagniOrb size={32} />
              <span className="text-aagni-text font-bold text-lg tracking-tight">Aagni AI</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-aagni-subtext hover:text-aagni-text hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* New chat button */}
          <div className="p-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createNewChat}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-aagni-saffron/30 bg-aagni-saffron/5 text-aagni-text hover:bg-aagni-saffron/10 hover:border-aagni-saffron/50 transition-all text-sm"
            >
              <MessageSquarePlus size={15} className="text-aagni-saffron" />
              <span>New conversation</span>
            </motion.button>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {loading ? (
              <div className="space-y-2 p-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 rounded-lg shimmer-bg" />
                ))}
              </div>
            ) : chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-aagni-muted text-xs text-center px-4">
                <Flame size={20} className="mb-2 text-aagni-saffron/50" />
                No conversations yet.
                <br />Start a new chat above.
              </div>
            ) : (
              Object.entries(grouped).map(([label, group]) => (
                <div key={label} className="mb-3">
                  <p className="text-aagni-muted text-xs px-3 py-1.5 tracking-wider uppercase">
                    {label}
                  </p>
                  {group.map((chat) => (
                    <motion.button
                      key={chat.id}
                      whileHover={{ backgroundColor: 'rgba(255,107,0,0.05)' }}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                      className={`group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-colors text-sm mb-0.5 ${
                        currentChatId === chat.id
                          ? 'bg-aagni-saffron/10 border border-aagni-saffron/20 text-aagni-text'
                          : 'text-aagni-subtext hover:text-aagni-text'
                      }`}
                    >
                      <span className="truncate flex-1">{truncate(chat.title, 28)}</span>
                      <button
                        onClick={(e) => deleteChat(e, chat.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-aagni-muted hover:text-red-400 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </motion.button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* User section */}
          {session?.user && (
            <div className="p-3 border-t border-aagni-border">
              <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors group">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full ring-1 ring-aagni-saffron/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-aagni-saffron/20 flex items-center justify-center text-aagni-saffron text-sm font-bold">
                    {session.user.name?.[0] || 'U'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-aagni-text text-xs font-medium truncate">
                    {session.user.name}
                  </p>
                  <p className="text-aagni-muted text-xs truncate">{session.user.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-aagni-muted hover:text-red-400 transition-all"
                  title="Sign out"
                >
                  <LogOut size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Collapsed toggle */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed left-3 top-4 z-30 p-2 glass-strong rounded-lg border border-aagni-border text-aagni-subtext hover:text-aagni-saffron transition-colors"
          >
            <ChevronRight size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
