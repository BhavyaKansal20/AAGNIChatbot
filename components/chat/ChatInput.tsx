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
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
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
            className="mb-3 flex items-center gap-3 px-4 py-2 glass-strong rounded-xl border border-aagni-saffron/30"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {isRecording ? (
              <>
                <VoiceWaveform isActive />
                <span className="text-aagni-text text-sm">Recording… tap mic to stop</span>
              </>
            ) : (
              <>
                <Loader2 size={14} className="text-aagni-saffron animate-spin" />
                <span className="text-aagni-subtext text-sm">Transcribing your voice…</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input box */}
      <div className="glass-strong rounded-2xl border border-aagni-border focus-within:border-aagni-saffron/40 transition-colors overflow-hidden">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aagni anything… (Shift+Enter for new line)"
          disabled={isLoading || disabled || isRecording}
          rows={1}
          className="w-full bg-transparent px-4 pt-4 pb-2 text-sm text-aagni-text placeholder:text-aagni-muted resize-none outline-none leading-relaxed"
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
              className="p-2 rounded-xl text-aagni-muted hover:text-aagni-saffron hover:bg-aagni-saffron/5 transition-colors disabled:opacity-40"
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

            {/* Mic button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              disabled={isLoading || isTranscribing}
              className={`p-2 rounded-xl transition-colors disabled:opacity-40 ${
                isRecording
                  ? 'text-red-400 bg-red-400/10 hover:bg-red-400/15'
                  : 'text-aagni-muted hover:text-aagni-saffron hover:bg-aagni-saffron/5'
              }`}
              title={isRecording ? 'Stop recording' : 'Record voice'}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
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
                ? 'bg-gradient-to-br from-aagni-saffron to-aagni-ember text-white shadow-saffron'
                : 'bg-aagni-border text-aagni-muted cursor-not-allowed'
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

      <p className="text-center text-aagni-muted text-xs mt-2">
        Aagni can make mistakes. Verify important information.
      </p>
    </div>
  )
}
