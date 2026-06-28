'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Code2, Volume2 } from 'lucide-react'
import { AagniOrb } from '@/components/effects/AagniOrb'
import type { Components } from 'react-markdown'

interface Message {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: string
  imageUrl?: string | null
}

interface MessageBubbleProps {
  message: Message
  userImage?: string | null
  userName?: string | null
  onOpenCanvas?: (code: string, lang: string) => void
  onSpeak?: (text: string) => void
  isSpeaking?: boolean
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded text-[#1A1F3B]/50 hover:text-aagni-saffron transition-colors"
      title="Copy code"
    >
      {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
    </button>
  )
}

export function MessageBubble({
  message,
  userImage,
  userName,
  onOpenCanvas,
  onSpeak,
  isSpeaking,
}: MessageBubbleProps) {
  const isUser = message.role === 'user'

  const markdownComponents: Components = {
    code({ node, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      const lang = match ? match[1] : ''
      const codeStr = String(children).replace(/\n$/, '')
      const isBlock = !props.inline && (match || codeStr.includes('\n'))

      if (isBlock) {
        return (
          <div className="my-3 rounded-xl overflow-hidden border border-aagni-border">
            {/* Code block header */}
            <div className="flex items-center justify-between px-4 py-2 bg-aagni-panel border-b border-aagni-border">
              <span className="text-aagni-muted text-xs uppercase tracking-wider font-mono">
                {lang || 'code'}
              </span>
              <div className="flex items-center gap-1">
                {onOpenCanvas && (
                  <button
                    onClick={() => onOpenCanvas(codeStr, lang)}
                    className="p-1.5 rounded text-aagni-muted hover:text-aagni-saffron transition-colors"
                    title="Open in Canvas"
                  >
                    <Code2 size={13} />
                  </button>
                )}
                <CopyButton text={codeStr} />
              </div>
            </div>
            <SyntaxHighlighter
              language={lang || 'text'}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '14px 16px',
                background: '#0a0a14',
                fontSize: '13px',
                lineHeight: '1.6',
                fontFamily: '"Courier New", Courier, monospace',
              }}
            >
              {codeStr}
            </SyntaxHighlighter>
          </div>
        )
      }

      return (
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono text-orange-400 bg-orange-950/30 border border-orange-900/30"
          {...props}
        >
          {children}
        </code>
      )
    },
    pre({ children }: any) {
      return <>{children}</>
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          userImage ? (
            <Image
              src={userImage}
              alt={userName || 'You'}
              width={32}
              height={32}
              className="rounded-full ring-1 ring-aagni-saffron/20"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-aagni-saffron/20 flex items-center justify-center text-aagni-saffron text-sm font-bold">
              {userName?.[0] || 'Y'}
            </div>
          )
        ) : (
          <AagniOrb size={40} isSpeaking={isSpeaking} />
        )}
      </div>

      {/* Message content */}
      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="text-[#1A1F3B]/60 font-bold text-[10px] uppercase tracking-wider px-1 mb-0.5">
          {isUser ? (userName || 'You') : 'Aagni'}
        </span>

        {/* Image preview */}
        {message.imageUrl && (
          <div className="mb-2 rounded-xl overflow-hidden border border-aagni-border max-w-xs">
            <img src={message.imageUrl} alt="Uploaded" className="w-full object-cover max-h-64" />
          </div>
        )}

        {/* Text bubble */}
        {message.content && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? 'bg-gradient-to-br from-aagni-saffron to-aagni-orange border border-aagni-saffron/20 text-white shadow-[0_4px_15px_rgba(255,122,26,0.2)] rounded-tr-sm'
                : 'bg-white/80 backdrop-blur-xl border border-white text-[#1A1F3B] shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-tl-sm prose-aagni'
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        )}

        {/* Actions for messages */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1 px-1">
          {isUser ? (
            <button className="p-1.5 rounded-lg text-[#1A1F3B]/50 hover:text-[#1A1F3B] hover:bg-black/5 transition-colors" title="Edit Prompt">
              <Code2 size={13} />
            </button>
          ) : (
            <>
              {onSpeak && message.content && (
                <button
                  onClick={() => onSpeak(message.content)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSpeaking
                      ? 'text-aagni-saffron bg-aagni-saffron/10'
                      : 'text-[#1A1F3B]/50 hover:text-[#1A1F3B] hover:bg-black/5'
                  }`}
                  title="Listen"
                >
                  <Volume2 size={13} />
                </button>
              )}
              <CopyButton text={message.content} />
              <button className="p-1.5 rounded-lg text-[#1A1F3B]/50 hover:text-[#1A1F3B] hover:bg-black/5 transition-colors" title="Regenerate">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button className="p-1.5 rounded-lg text-[#1A1F3B]/50 hover:text-[#1A1F3B] hover:bg-black/5 transition-colors" title="Share">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
              <div className="w-[1px] h-3 bg-black/5 mx-1" />
              <button className="p-1.5 rounded-lg text-[#1A1F3B]/50 hover:text-green-500 hover:bg-black/5 transition-colors" title="Like">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              </button>
              <button className="p-1.5 rounded-lg text-[#1A1F3B]/50 hover:text-red-500 hover:bg-black/5 transition-colors" title="Dislike">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 items-start"
    >
      <AagniOrb size={32} isActive />
      <div className="bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white rounded-2xl rounded-tl-sm px-4 py-3 mt-1">
        <div className="flex items-center gap-1.5 h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-aagni-saffron"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
