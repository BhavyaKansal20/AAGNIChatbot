'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, ImagePlus, X, Loader2 } from 'lucide-react'
import { VoiceWaveform } from '@/components/effects/AagniOrb'
import { fileToBase64 } from '@/lib/utils'

interface ChatInputProps {
  onSend: (text: string, imageData?: string) => void
  isLoading: boolean
  disabled?: boolean
  onVoiceMode?: () => void
}

export function ChatInput({ onSend, isLoading, disabled, onVoiceMode }: ChatInputProps) {
  const [text, setText] = useState('')
  const [imageData, setImageData] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const handleSubmit = () => {
    if ((!text.trim() && !imageData) || isLoading || disabled) return
    onSend(text.trim(), imageData || undefined)
    setText('')
    setImageData(null)
    setImagePreview(null)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const b64 = await fileToBase64(file)
    setImageData(b64)
    setImagePreview(b64)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      audioChunksRef.current = []
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data)
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop())
        setIsTranscribing(true)
        try {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          const form = new FormData()
          form.append('file', blob, 'recording.webm')
          const res = await fetch('/api/stt', { method: 'POST', body: form })
          const data = await res.json()
          if (data.transcript) {
            setText((prev) => prev ? `${prev} ${data.transcript}` : data.transcript)
            textareaRef.current?.focus()
          }
        } catch (err) {
          console.error('STT error', err)
        } finally {
          setIsTranscribing(false)
        }
      }
      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
    } catch (err) {
      console.error('Mic error', err)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const toggleRecording = () => {
    if (isRecording) stopRecording()
    else startRecording()
  }

  const canSend = (text.trim().length > 0 || imageData !== null) && !isLoading && !disabled

  return (
    <div className="relative">
      {/* Image preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 flex items-start gap-2"
          >
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Selected"
                className="h-20 w-20 object-cover rounded-xl border border-aagni-border"
              />
              <button
                onClick={() => { setImageData(null); setImagePreview(null) }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/80 border border-aagni-border flex items-center justify-center text-white hover:bg-red-500 transition-colors"
              >
                <X size={10} />
              </button>
            </div>
            <span className="text-aagni-muted text-xs mt-1">
              Image will be analyzed by Gemini Vision
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice recording indicator */}
      <AnimatePresence>
        {(isRecording || isTranscribing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-xl shadow-sm rounded-xl border border-white"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {isRecording ? (
              <>
                <VoiceWaveform isActive />
                <span className="text-[#1A1F3B] text-sm">Recording… tap mic to stop</span>
              </>
            ) : (
              <>
                <Loader2 size={14} className="text-aagni-saffron animate-spin" />
                <span className="text-[#1A1F3B]/70 text-sm font-medium">Transcribing your voice…</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input box */}
      <div className="liquid-glass rounded-[24px] focus-within:shadow-lg transition-all overflow-hidden relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aagni anything… (Shift+Enter for new line)"
          disabled={isLoading || disabled || isRecording}
          rows={1}
          className="w-full bg-transparent px-5 pt-5 pb-3 text-sm text-[#1A1F3B] font-medium placeholder:text-[#1A1F3B]/40 resize-none outline-none leading-relaxed"
          style={{ minHeight: 56, maxHeight: 180 }}
        />

        {/* Actions row */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            {/* Image upload */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isRecording}
              className="p-2 rounded-xl text-[#1A1F3B]/50 hover:text-aagni-saffron hover:bg-white transition-colors disabled:opacity-40"
              title="Attach image"
            >
              <ImagePlus size={18} />
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* Full Screen Voice Mode button */}
            {onVoiceMode && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onVoiceMode}
                disabled={isLoading || isRecording || isTranscribing}
                className="p-2 rounded-xl text-[#1A1F3B]/50 hover:text-aagni-saffron hover:bg-white transition-colors disabled:opacity-40"
                title="Open Voice Mode"
              >
                <div className="relative">
                  <Mic size={18} />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-aagni-saffron rounded-full border border-white" />
                </div>
              </motion.button>
            )}

            {/* In-line Mic button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              disabled={isLoading || isTranscribing}
              className={`p-2 rounded-xl transition-colors disabled:opacity-40 ${
                isRecording
                  ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                  : 'text-[#1A1F3B]/50 hover:text-[#1A1F3B] hover:bg-white'
              }`}
              title={isRecording ? 'Stop recording' : 'Record voice note'}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} className="opacity-50" />}
            </motion.button>
          </div>

          {/* Send button */}
          <motion.button
            whileHover={canSend ? { scale: 1.05 } : {}}
            whileTap={canSend ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={!canSend}
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
              canSend
                ? 'bg-gradient-to-br from-aagni-saffron to-aagni-orange text-white shadow-[0_4px_15px_rgba(255,122,26,0.3)] hover:shadow-[0_6px_20px_rgba(255,122,26,0.4)]'
                : 'bg-white/50 text-[#1A1F3B]/30 border border-white cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </motion.button>
        </div>
      </div>

      <p className="text-center text-[#1A1F3B]/50 font-medium text-xs mt-3">
        Aagni can make mistakes. Verify important information.
      </p>
    </div>
  )
}
