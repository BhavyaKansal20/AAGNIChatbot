'use client'
import { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { PoweringIndiaSection } from '@/components/landing/PoweringIndiaSection'
import { PreFooterCTA } from '@/components/landing/PreFooterCTA'

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  /* Enable scrolling on landing page */
  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => document.body.classList.remove('landing-page')
  }, [])

  return (
    <div className="min-h-screen font-serif relative z-10">
      <LandingNavbar />

      {/* ========== HERO — TRANSPARENT OVER GLOBAL BACKGROUND ========== */}
      <motion.section
        id="hero"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center pt-32 pb-20 flex flex-col items-center">
          
          {/* Decorative Indian ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            {/* Minimalist ornament based on Screenshot #1 */}
            <svg width="180" height="30" viewBox="0 0 180 30" fill="none" className="opacity-90">
              <path d="M75 15C60 5 45 15 30 15C45 15 60 25 75 15Z" fill="#FFFFFF" />
              <path d="M70 18C55 8 40 18 25 18C40 18 55 28 70 18Z" fill="#FFFFFF" fillOpacity="0.7"/>
              <circle cx="85" cy="15" r="5" fill="#FFFFFF" />
              <path d="M105 15C120 5 135 15 150 15C135 15 120 25 105 15Z" fill="#FFFFFF" />
              <path d="M110 18C125 8 140 18 155 18C140 18 125 28 110 18Z" fill="#FFFFFF" fillOpacity="0.7"/>
              <circle cx="95" cy="15" r="5" fill="#FFFFFF" />
              <line x1="50" y1="28" x2="130" y2="28" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
            </svg>
            
            <p className="mt-4 text-[#3C4A8A] text-sm tracking-wide font-sans font-medium">
              India's Sovereign AI Platform
            </p>
          </motion.div>

          {/* Main heading - Exact single line match */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[4rem] sm:text-[4.5rem] lg:text-[5.5rem] font-medium text-[#1A1F3B] leading-tight mb-6 font-serif whitespace-nowrap"
            style={{ letterSpacing: '-0.02em' }}
          >
            AI for all from India
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-[17px] sm:text-[19px] text-[#33374D] max-w-2xl mx-auto mb-12 font-sans leading-relaxed"
          >
            Built on sovereign compute. Powered by frontier-class models.<br />
            Delivering population-scale impact.
          </motion.p>
        </div>
      </motion.section>

      {/* ========== POWERING INDIA ========== */}
      <PoweringIndiaSection />

      {/* ========== PRE-FOOTER CTA ========== */}
      <PreFooterCTA />

      {/* ========== FOOTER ========== */}
      <LandingFooter />
    </div>
  )
}
