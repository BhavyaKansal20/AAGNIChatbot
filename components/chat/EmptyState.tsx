'use client'
import { motion } from 'framer-motion'
import { AagniOrb } from '@/components/effects/AagniOrb'
import { Search, Code2, Image as ImageIcon, PenTool } from 'lucide-react'

const SUGGESTIONS = [
  { text: 'Research the latest advancements in Quantum Computing', icon: Search, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { text: 'Write a Python script to scrape news headlines', icon: Code2, color: 'text-green-400', bg: 'bg-green-400/10' },
  { text: 'Analyze this image and extract the text', icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { text: 'Draft a professional email to my team', icon: PenTool, color: 'text-aagni-saffron', bg: 'bg-aagni-saffron/10' },
]

interface EmptyStateProps {
  userName?: string | null
  onSuggestion: (text: string) => void
}

export function EmptyState({ userName, onSuggestion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aagni-saffron/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 relative z-10 max-w-2xl w-full"
      >
        {/* Orb */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute inset-0 bg-aagni-saffron/20 blur-2xl rounded-full" />
          <AagniOrb size={80} />
        </motion.div>

        {/* Greeting */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white font-serif mb-3 tracking-wide"
          >
            What can I help you build today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg font-medium"
          >
            Chat, Research, Create, Analyze, and Automate.
          </motion.p>
        </div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4"
        >
          {SUGGESTIONS.map((sug, i) => {
            const Icon = sug.icon
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSuggestion(sug.text)}
                className="flex items-start gap-4 p-4 rounded-2xl dark-glass-panel border border-white/5 hover:bg-white/10 transition-colors text-left group"
              >
                <div className={`p-2 rounded-xl shrink-0 ${sug.bg} ${sug.color}`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-relaxed mt-1">
                  {sug.text}
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
