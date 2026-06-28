'use client'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="flex-1 h-full w-full p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aagni-saffron/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="dark-glass-panel border border-black/10 rounded-[32px] p-12 max-w-2xl w-full text-center relative z-10 shadow-premium"
      >
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-aagni-saffron/10 border border-aagni-saffron/20 text-aagni-saffron tracking-wider uppercase">
          Workspace
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white font-serif tracking-tight">
          Files & Storage
        </h1>
        <p className="text-aagni-muted text-lg font-serif">
          Manage your datasets, documents, and workspace files securely.
        </p>
      </motion.div>
    </div>
  )
}
