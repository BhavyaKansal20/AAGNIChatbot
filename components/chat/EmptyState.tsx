'use client'
import { motion } from 'framer-motion'
import { AagniOrb } from '@/components/effects/AagniOrb'
import { Search, Code2, Image as ImageIcon, Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  { text: 'Help me plan a trip to Kerala', icon: Search, gradient: 'from-[#FF7A1A]/20 to-[#FF7A1A]/5' },
  { text: 'Explain Quantum Mechanics', icon: Sparkles, gradient: 'from-[#3E66FF]/20 to-[#3E66FF]/5' },
  { text: 'Write a Python script for data scraping', icon: Code2, gradient: 'from-[#009B4D]/20 to-[#009B4D]/5' },
  { text: 'Generate an image of a futuristic city', icon: ImageIcon, gradient: 'from-purple-500/20 to-purple-500/5' },
]

interface EmptyStateProps {
  userName?: string | null
  onSuggestion: (text: string) => void
}

export function EmptyState({ userName, onSuggestion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 md:px-6 py-8 md:py-12 relative w-full overflow-y-auto no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto p-6 md:p-10 rounded-[32px] md:rounded-[48px] liquid-glass relative overflow-hidden flex flex-col items-center border border-white shadow-[0_20px_50px_rgba(26,31,59,0.05)]"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF7A1A] via-white to-[#009B4D]" />
        
        {/* Orb */}
        <motion.div
          animate={{ filter: ['drop-shadow(0 0 20px rgba(255,122,26,0.2))', 'drop-shadow(0 0 40px rgba(62,102,255,0.2))', 'drop-shadow(0 0 20px rgba(0,155,77,0.2))'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex justify-center mb-6 md:mb-10 bg-white/50 p-3 rounded-full border border-white shadow-sm"
        >
          <AagniOrb size={90} />
        </motion.div>

        {/* Greeting */}
        <div className="text-center mb-8 md:mb-12 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold text-[#1A1F3B] mb-4 tracking-tight leading-tight"
          >
            Namaste, {userName ? userName.split(' ')[0] : 'Bharat'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#1A1F3B]/60 text-base md:text-lg font-medium max-w-lg mx-auto"
          >
            India's most intelligent AI is ready. How can I assist you today?
          </motion.p>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              onClick={() => onSuggestion(s.text)}
              className="group flex flex-col text-left gap-3 p-5 rounded-3xl bg-white/40 hover:bg-white/70 border border-white/60 transition-all shadow-[inset_0_2px_10px_rgba(255,255,255,1),_0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center border border-white`}>
                <s.icon size={20} className="text-[#1A1F3B]/70 group-hover:text-[#1A1F3B] transition-colors" />
              </div>
              <span className="text-[#1A1F3B]/80 font-medium text-sm md:text-base leading-snug group-hover:text-[#1A1F3B] transition-colors">
                {s.text}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
