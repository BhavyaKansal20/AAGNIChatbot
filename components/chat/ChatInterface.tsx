'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble, TypingIndicator } from '@/components/chat/MessageBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { CodeCanvas } from '@/components/chat/CodeCanvas'
import { EmptyState } from '@/components/chat/EmptyState'
import { RightPanel } from '@/components/chat/RightPanel'
import { VoiceModeOverlay } from '@/components/chat/VoiceModeOverlay'
import { Settings } from 'lucide-react'

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
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [voiceModeOpen, setVoiceModeOpen] = useState(false)
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
    window.history.replaceState(null, '', `/chat/${newId}`)
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
      const isIncognito = localStorage.getItem('aagni_incognito') === 'true'
      const activeChatId = isIncognito ? null : await ensureChatId()
      
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
          incognito: isIncognito,
        }),
      })

      if (!res.ok) {
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const err = await res.json()
          throw new Error(err.error || `Error ${res.status}: Failed to get response`)
        } else {
          const errText = await res.text()
          throw new Error(`Error ${res.status}: ${errText.slice(0, 100)}...`)
        }
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
    <>
      <div className="flex h-full overflow-hidden w-full relative">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* Top Navbar / Header area */}
          <div className="h-14 flex items-center px-6 justify-between shrink-0 sticky top-0 z-10 bg-[#FBF8F3]/80 backdrop-blur-md">
            {/* Left placeholder for the absolute layout sidebar toggle */}
            <div className="w-10 h-10" />
            
            <h2 className="text-sm font-semibold text-[#1A1F3B]/90">AAGNI Chat</h2>
            
            {/* Right Panel Toggle */}
            <button 
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`p-2 rounded-lg transition-colors ${rightPanelOpen ? 'bg-black/5 text-white' : 'text-[#1A1F3B]/50 hover:text-white hover:bg-black/5'}`}
              title="Toggle Utilities"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative">
            {isEmpty ? (
              <EmptyState
                userName={session?.user?.name}
                onSuggestion={(text) => handleSend(text)}
              />
            ) : (
              <div className="max-w-[900px] mx-auto px-4 py-8 space-y-8">
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
          <div className="flex-shrink-0 pt-4 pb-6 px-4 relative z-20">
            <div className="max-w-[900px] mx-auto">
              <ChatInput
                onSend={handleSend}
                isLoading={isLoading}
                disabled={false}
                onVoiceMode={() => {
                  if (typeof window !== 'undefined' && window.speechSynthesis) {
                    // iOS Mobile Safari Hack: Fire a blank utterance synchronously on user tap
                    // to unlock the Web Speech API audio context for future async responses.
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance(''))
                  }
                  setVoiceModeOpen(true)
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />

        {/* Code Canvas panel */}
        <CodeCanvas block={codeCanvas} onClose={() => setCodeCanvas(null)} />
      </div>

      <VoiceModeOverlay isOpen={voiceModeOpen} onClose={() => setVoiceModeOpen(false)} />
    </>
  )
}
