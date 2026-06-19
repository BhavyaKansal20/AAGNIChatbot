'use client'
import { motion } from 'framer-motion'
import { AagniOrb } from '@/components/effects/AagniOrb'
import { OmSymbol, LotusIcon, DiyaIcon, ChakraIcon } from '@/components/ui/IndianIcons'

const SUGGESTIONS = [
  { text: 'Explain the philosophy of the Bhagavad Gita', icon: '📿' },
  { text: 'Write a Python script to scrape news headlines', icon: '🐍' },
  { text: 'मुझे AI और Machine Learning के बारे में बताओ', icon: '🤖' },
  { text: 'Design a business plan for an Indian startup', icon: '🚀' },
  { text: 'Explain ISRO\'s Chandrayaan-3 mission success', icon: '🌙' },
  { text: 'Write a poem about the Ganges river at dawn', icon: '🌅' },
]

interface EmptyStateProps {
  userName?: string | null
  onSuggestion: (text: string) => void
}

export function EmptyState({ userName, onSuggestion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 text-aagni-saffron/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <ChakraIcon size={200} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/4 text-aagni-gold/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <ChakraIcon size={150} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 relative z-10 max-w-2xl w-full"
      >
        {/* Orb */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AagniOrb size={72} />
        </motion.div>

        {/* Greeting */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-1"
          >
            <OmSymbol className="w-5 h-5 text-aagni-gold/60" />
            <h1 className="text-3xl font-bold text-saffron-gradient">
              {userName ? `Namaste, ${userName.split(' ')[0]}` : 'Namaste'}
            </h1>
            <OmSymbol className="w-5 h-5 text-aagni-gold/60" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-aagni-subtext text-base"
          >
            How can Aagni assist you today?
          </motion.p>
        </div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {[
            { icon: '💬', label: 'Hindi & English' },
            { icon: '👁️', label: 'Vision AI' },
            { icon: '🎙️', label: 'Voice Mode' },
            { icon: '💻', label: 'Code Canvas' },
          ].map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-aagni-subtext border border-aagni-border bg-white/2"
            >
              <span>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* Suggestion cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-2"
        >
          {SUGGESTIONS.map((suggestion, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              whileHover={{
                scale: 1.02,
                borderColor: 'rgba(255,107,0,0.4)',
                backgroundColor: 'rgba(255,107,0,0.05)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestion(suggestion.text)}
              className="flex items-start gap-3 text-left px-4 py-3 rounded-xl glass border border-aagni-border text-aagni-subtext hover:text-aagni-text transition-all text-sm"
            >
              <span className="text-base flex-shrink-0 mt-0.5">{suggestion.icon}</span>
              <span className="leading-relaxed">{suggestion.text}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Lotus decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-3 text-aagni-muted/40 mt-2"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-aagni-border" />
          <LotusIcon size={16} />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-aagni-border" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-aagni-muted/50 text-xs text-center"
        >
          Powered by Sarvam AI · Made with pride in India 🇮🇳
        </motion.p>
      </motion.div>
    </div>
  )
}
