'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { BrainCircuit, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
  const { scrollY } = useScroll()
  
  // Parallax effect for background orbs
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <div className="min-h-screen dark-premium bg-aagni-darkbg text-aagni-text font-serif relative overflow-hidden selection:bg-aagni-saffron/30 selection:text-white">
      <LandingNavbar />

      {/* Massive Dark Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep liquid glass blur overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0A0D1C] to-[#050816] opacity-90" />
        
        {/* Animated Neon Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-aagni-saffron/20 rounded-full blur-[140px] mix-blend-screen animate-pulse-glow" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px] mix-blend-screen animate-pulse-glow" 
        />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <main className="relative pt-[160px] pb-32 px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1100px] mx-auto flex flex-col items-center z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full dark-glass-panel border border-white/10 shadow-[0_0_20px_rgba(255,122,26,0.1)] mb-10 hover:shadow-[0_0_30px_rgba(255,122,26,0.2)] transition-shadow">
            <span role="img" aria-label="India flag">🇮🇳</span>
            <span className="text-sm font-medium tracking-widest text-white/90 uppercase">Made in India. Made for India.</span>
          </div>

          {/* Headline with Neon & Glass effect */}
          <h1 className="text-6xl md:text-[96px] lg:text-[110px] font-bold leading-[1.05] mb-8 text-white tracking-tight drop-shadow-2xl">
            Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-aagni-saffron via-orange-400 to-yellow-500 drop-shadow-[0_0_40px_rgba(255,122,26,0.4)]">AI Hub</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-medium text-white/60 mb-14 max-w-3xl leading-relaxed">
            A secure, full-stack intelligence platform built exclusively for personal use. 
            Experience unparalleled speed and localized understanding in a state-of-the-art dark premium workspace.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link
              href="/login"
              className="group relative px-10 py-5 w-full sm:w-auto overflow-hidden rounded-full font-bold text-lg bg-white text-[#050816] transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-gray-100 to-white group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10">Access Dashboard</span>
            </Link>
            
            <Link
              href="https://github.com/BhavyaKansal20/AAGNIChatbot"
              target="_blank"
              className="px-10 py-5 w-full sm:w-auto rounded-full font-semibold text-lg text-white glass-pill hover:bg-white/10 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              View on GitHub
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights (Claymorphism/Glassmorphism Mix) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-32 z-10"
        >
          <div className="p-8 rounded-[32px] dark-glass-panel border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-blue-400">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Private</h3>
            <p className="text-white/50 font-medium">Built as a secure, personal project. No corporate tracking or data sharing.</p>
          </div>

          <div className="p-8 rounded-[32px] dark-glass-panel border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-aagni-saffron/10 rounded-full blur-3xl group-hover:bg-aagni-saffron/20 transition-colors" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-aagni-saffron">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multimodal AI</h3>
            <p className="text-white/50 font-medium">Text, Vision, and Agents integrated into a single, cohesive operating system.</p>
          </div>

          <div className="p-8 rounded-[32px] dark-glass-panel border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-purple-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Liquid UI Design</h3>
            <p className="text-white/50 font-medium">Crafted with liquid glassmorphism, clay highlights, and fluid animations.</p>
          </div>
        </motion.div>
      </main>
      
      {/* Footer removed to keep it a pure full-screen dark landing experience */}
    </div>
  )
}
