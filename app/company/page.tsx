'use client'
import { motion } from 'framer-motion'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { ResearchUpdates } from '@/components/landing/ResearchUpdates'

export default function CompanyPage() {
  return (
    <div className="min-h-screen font-serif relative z-10">
      <LandingNavbar />
      <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A1F3B] mb-8 tracking-tight"
        >
          About AAGNI AI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#4A4D5E] font-sans leading-relaxed mb-8"
        >
          AAGNI AI is an open-source conversational AI platform powered by Indian LLMs. 
          Our mission is to bring advanced, multilingual, and culturally aware AI capabilities to India&apos;s next billion users.
        </motion.p>
      </div>

      <ResearchUpdates />

      <div className="pb-32" />
      <LandingFooter />
    </div>
  )
}
