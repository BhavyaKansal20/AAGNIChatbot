'use client'

import { motion } from 'framer-motion'

export function TopAnnouncementBar() {
  return (
    <div className="relative z-[60] w-full bg-aagni-cream border-b border-black/5 flex justify-center items-center py-2 px-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-2 text-sm font-medium"
      >
        <span role="img" aria-label="India">🇮🇳</span>
        <span className="text-aagni-indigo">India's Local AI Assistant is Live</span>
        <span className="text-aagni-muted mx-2">|</span>
        <span className="text-aagni-saffron font-semibold">Supporting Hindi, Punjabi, English & 22+ Indian Languages</span>
      </motion.div>
    </div>
  )
}
