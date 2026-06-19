'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble, TypingIndicator } from '@/components/chat/MessageBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { CodeCanvas } from '@/components/chat/CodeCanvas'
import { EmptyState } from '@/components/chat/EmptyState'

interface Message {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  imageUrl?: string | null
}

interface CodeBlock {
  lang: string
  code: string
  title?: string
}

interface ChatInterfaceProps {
  chatId?: string
  initialMessages?: Message[]
}

export function ChatInterface({ chatId: initialChatId, initialMessages = [] }: ChatInterfaceProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [chatId, setChatId] = useState<string | undefined>(initialChatId)
  const [isLoading, setIsLoading] = useState(false)
  const [codeCanvas, setCodeCanvas] = useState<CodeBlock | null>(null)
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const ensureChatId = async (): Promise<string> => {
    if (chatId) return chatId
    const res = await fetch('/api/sessions', { method: 'POST' })
    const data = await res.json()
    const newId = data.chat.id
    setChatId(newId)
    router.replace(`/chat/${newId}`)
    return newId
  }

  const handleSend = async (text: string, imageData?: string) => {
    if (!text && !imageData) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      imageUrl: imageData || null,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const activeChatId = await ensureChatId()
      const apiMessages = messages.concat(userMessage).map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          chatId: activeChatId,
          imageData: imageData || null,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to get response')
      }

      const data = await res.json()
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Something went wrong. Please try again.'}`,
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpeak = async (text: string, msgId?: string) => {
    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (speakingMsgId === msgId) {
      setSpeakingMsgId(null)
      return
    }

    setSpeakingMsgId(msgId || null)

    try {
      const cleanText = text.replace(/[#*`_~\[\]()>]/g, '').slice(0, 500)
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      })

      if (!res.ok) throw new Error('TTS failed')

      const data = await res.json()
      if (!data.audio) throw new Error('No audio returned')

      const audio = new Audio(`data:audio/wav;base64,${data.audio}`)
      audioRef.current = audio
      audio.play()
      audio.onended = () => setSpeakingMsgId(null)
    } catch (err) {
      console.error('TTS error:', err)
      setSpeakingMsgId(null)
    }
  }

  const handleOpenCanvas = useCallback((code: string, lang: string) => {
    setCodeCanvas({ code, lang, title: `${lang.toUpperCase()} File` })
  }, [])

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <EmptyState
              userName={session?.user?.name}
              onSuggestion={(text) => handleSend(text)}
            />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id || msg.content.slice(0, 20)}
                    message={msg}
                    userImage={session?.user?.image}
                    userName={session?.user?.name}
                    onOpenCanvas={handleOpenCanvas}
                    onSpeak={(text) => handleSpeak(text, msg.id)}
                    isSpeaking={speakingMsgId === msg.id}
                  />
                ))}
                {isLoading && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-aagni-border bg-aagni-bg/80 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <ChatInput
              onSend={handleSend}
              isLoading={isLoading}
              disabled={false}
            />
          </div>
        </div>
      </div>

      {/* Code Canvas panel */}
      <CodeCanvas block={codeCanvas} onClose={() => setCodeCanvas(null)} />
    </div>
  )
}
