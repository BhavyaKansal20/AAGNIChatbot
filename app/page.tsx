'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { InteractiveDashboard } from '@/components/landing/InteractiveDashboard'
import { DeveloperSection } from '@/components/landing/DeveloperSection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-aagni-cream text-aagni-indigo font-serif relative overflow-hidden">
      <LandingNavbar />

      {/* Hero Section */}
      <main className="relative pt-[120px] pb-24 md:pt-[160px] md:pb-32 px-6 lg:px-8 min-h-[90vh] flex flex-col items-center justify-center text-center">
        {/* Massive Blurred Background Glow */}
        <div className="absolute inset-0 bg-hero-glow -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-aagni-saffron/20 to-aagni-softblue/30 blur-[120px] rounded-full mix-blend-multiply -z-10 animate-pulse-glow" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-[1000px] mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-aagni-indigo/10 shadow-sm mb-8 backdrop-blur-md">
            <span role="img" aria-label="India flag">🇮🇳</span>
            <span className="text-sm font-semibold tracking-wide text-aagni-indigo">Made in India. Made for India.</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-[88px] font-bold leading-[1.1] mb-8 text-aagni-indigo tracking-tight drop-shadow-sm">
            AI for <span className="text-gradient-saffron">Every Indian</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-medium text-aagni-indigo/70 mb-12 max-w-2xl leading-relaxed">
            Speak naturally. Think locally. Build globally.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/login"
              className="btn-primary px-8 py-4 rounded-full text-lg font-semibold w-full sm:w-auto"
            >
              Try AAGNI AI
            </Link>
            <Link
              href="#"
              className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Interactive Capabilities Section */}
      <section id="platform" className="relative z-10 bg-white/40 border-y border-aagni-indigo/5 py-12">
        <InteractiveDashboard />
      </section>

      {/* Developer Section */}
      <section id="developer" className="relative z-10 bg-aagni-cream py-12">
        <DeveloperSection />
      </section>

      {/* Footer Reveal (contains CTA) */}
      <LandingFooter />
    </div>
  )
}
