'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, PhoneOff, Settings2, Globe2 } from 'lucide-react'
import { AagniOrb } from '@/components/effects/AagniOrb'

export function VoiceModeOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Orb */}
          <div className="flex-1 flex flex-col items-center justify-center w-full relative z-0">
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-aagni-saffron/10 to-aagni-softblue/10 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[300px] h-[300px] flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full voice-orb-glow mix-blend-screen" />
              <AagniOrb size={250} />
            </motion.div>
            
            <div className="mt-16 text-center">
              <p className="text-aagni-saffron font-bold tracking-widest uppercase text-sm mb-2">Listening...</p>
              <p className="text-2xl font-serif text-white/90">"Kaise ho aap?"</p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="w-full max-w-xl flex justify-center items-center gap-8 relative z-10">
            <button className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors border border-white/10">
              <Mic size={24} />
            </button>
            <button 
              onClick={onClose}
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
