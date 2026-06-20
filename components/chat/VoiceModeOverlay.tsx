'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, PhoneOff, Settings2, Globe2 } from 'lucide-react'
import { AagniOrb } from '@/components/effects/AagniOrb'

type VoiceStatus = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING'

export function VoiceModeOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatusState] = useState<VoiceStatus>('IDLE')
  const [transcript, setTranscriptState] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  
  // Use refs to avoid stale closures in event listeners
  const statusRef = useRef<VoiceStatus>('IDLE')
  const transcriptRef = useRef('')
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  const setStatus = (s: VoiceStatus) => {
    statusRef.current = s
    setStatusState(s)
  }

  const setTranscript = (t: string) => {
    transcriptRef.current = t
    setTranscriptState(t)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-IN'

        recognition.onresult = (event: any) => {
          let currentTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript
          }
          setTranscript(currentTranscript)
        }

        recognition.onend = () => {
          if (statusRef.current === 'LISTENING') {
            handleVoiceSubmit()
          }
        }
        
        recognitionRef.current = recognition
      }
    }
    
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort()
      if (synthRef.current) synthRef.current.cancel()
    }
  }, []) // Empty dependency array! Initialize only once.

  useEffect(() => {
    if (isOpen) {
      startListening()
    } else {
      stopAll()
    }
  }, [isOpen])

  const stopAll = () => {
    if (recognitionRef.current) recognitionRef.current.abort()
    if (synthRef.current) synthRef.current.cancel()
    setStatus('IDLE')
  }

  const startListening = () => {
    stopAll()
    setTranscript('')
    setStatus('LISTENING')
    try {
      recognitionRef.current?.start()
    } catch (e) {
      console.error(e)
    }
  }

  const handleVoiceSubmit = async () => {
    const finalTranscript = transcriptRef.current
    if (!finalTranscript.trim()) {
      setStatus('IDLE')
      return
    }
    
    setStatus('THINKING')
    const userMsg = finalTranscript
    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    
    try {
      const isIncognito = localStorage.getItem('aagni_incognito') === 'true'
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          chatId: null,
          incognito: isIncognito,
        }),
      })

      if (!res.ok) throw new Error('API Error')
      const data = await res.json()
      
      setMessages([...newMessages, { role: 'assistant', content: data.content }])
      speakResponse(data.content)
    } catch (error) {
      console.error(error)
      setStatus('IDLE')
    }
  }

  const speakResponse = (text: string) => {
    setStatus('SPEAKING')
    if (synthRef.current) {
      synthRef.current.cancel()
      const cleanText = text.replace(/[#*`_~\[\]()>]/g, '').slice(0, 500) // basic clean
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.onend = () => {
        // Auto-restart listening after speaking
        setTimeout(() => {
          if (isOpen) startListening()
        }, 500)
      }
      synthRef.current.speak(utterance)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-[#050816]/90 backdrop-blur-2xl flex flex-col items-center justify-between py-12 px-6"
        >
          {/* Header Controls */}
          <div className="w-full max-w-4xl flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors border border-white/10">
                <Globe2 size={20} />
              </button>
              <span className="text-sm font-medium text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                Hindi / English
              </span>
            </div>
            <button 
              onClick={() => {
                stopAll()
                onClose()
              }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Orb */}
          <div className="flex-1 flex flex-col items-center justify-center w-full relative z-0">
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-aagni-saffron/10 to-aagni-softblue/10 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div
              animate={
                status === 'LISTENING' ? { scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }
                : status === 'THINKING' ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                : status === 'SPEAKING' ? { scale: [1.1, 1.2, 1.1], filter: ['brightness(1.2)', 'brightness(1.5)', 'brightness(1.2)'] }
                : {}
              }
              transition={{ duration: status === 'SPEAKING' ? 0.5 : 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[300px] h-[300px] flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full voice-orb-glow mix-blend-screen" />
              <AagniOrb size={250} />
            </motion.div>
            
            <div className="mt-16 text-center max-w-2xl px-4">
              <p className="text-aagni-saffron font-bold tracking-widest uppercase text-sm mb-2">
                {status}
              </p>
              <p className="text-2xl font-serif text-white/90 min-h-[4rem]">
                {transcript ? `"${transcript}"` : (status === 'SPEAKING' ? "Speaking response..." : "Listening...")}
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="w-full max-w-xl flex justify-center items-center gap-8 relative z-10">
            <button 
              onClick={startListening}
              className={`p-4 rounded-full transition-colors border ${
                status === 'LISTENING' ? 'bg-aagni-saffron/20 text-aagni-saffron border-aagni-saffron/30' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10'
              }`}
            >
              <Mic size={24} />
            </button>
            <button 
              onClick={() => {
                stopAll()
                onClose()
              }}
              className="p-6 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-full transition-all duration-300 border border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-105"
            >
              <PhoneOff size={32} />
            </button>
            <button className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors border border-white/10">
              <Settings2 size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
