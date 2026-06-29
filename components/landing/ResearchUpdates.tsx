'use client'
import { motion } from 'framer-motion'

const updates = [
  {
    title: 'Indic ASR Evaluation',
    gradient: 'from-[#1e3a8a] via-[#3b52b5] to-[#6366f1]',
    type: 'blue',
  },
  {
    title: 'Sovereign Models',
    gradient: 'from-[#3d5a1e] via-[#5a7a2e] to-[#8aa542]',
    type: 'green',
  },
  {
    title: 'Indus',
    gradient: 'from-[#c2410c] via-[#ea580c] to-[#f59e0b]',
    type: 'orange',
  },
]

export function ResearchUpdates() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-serif text-[#1A1F3B] tracking-tight">
          Research &amp; Updates
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {updates.map((update, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`rounded-[24px] overflow-hidden h-[200px] relative cursor-pointer group bg-gradient-to-br ${update.gradient}`}
          >
            {/* Organic SVG decorative shapes */}
            {update.type === 'blue' && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Large bracket / wave shape left */}
                <path d="M60 -20C60 40 30 60 30 100C30 140 60 160 60 220" stroke="rgba(255,255,255,0.12)" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M80 -10C80 50 50 70 50 100C50 130 80 150 80 210" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Large bracket / wave shape right */}
                <path d="M340 -20C340 40 370 60 370 100C370 140 340 160 340 220" stroke="rgba(255,255,255,0.12)" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M320 -10C320 50 350 70 350 100C350 130 320 150 320 210" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Central subtle wave */}
                <path d="M120 180C160 120 240 80 280 20" stroke="rgba(255,255,255,0.06)" strokeWidth="40" strokeLinecap="round" fill="none" />
              </svg>
            )}

            {update.type === 'green' && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Radial organic blobs */}
                <circle cx="200" cy="100" r="120" fill="rgba(255,255,255,0.06)" />
                <circle cx="200" cy="100" r="80" fill="rgba(255,255,255,0.06)" />
                <circle cx="200" cy="100" r="45" fill="rgba(255,255,255,0.05)" />
                {/* Off-center blob */}
                <ellipse cx="320" cy="160" rx="100" ry="80" fill="rgba(255,255,255,0.04)" />
                <ellipse cx="80" cy="40" rx="90" ry="70" fill="rgba(255,255,255,0.04)" />
              </svg>
            )}

            {update.type === 'orange' && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric cloud / petal shapes */}
                <circle cx="200" cy="100" r="140" stroke="rgba(255,255,255,0.08)" strokeWidth="14" fill="none" />
                <circle cx="200" cy="100" r="100" stroke="rgba(255,255,255,0.10)" strokeWidth="12" fill="none" />
                <circle cx="200" cy="100" r="60" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
                <circle cx="200" cy="100" r="28" stroke="rgba(255,255,255,0.14)" strokeWidth="8" fill="none" />
                {/* Petal accent arcs */}
                <path d="M200 -10C260 40 280 80 280 100C280 120 260 160 200 210" stroke="rgba(255,255,255,0.06)" strokeWidth="20" fill="none" />
                <path d="M200 -10C140 40 120 80 120 100C120 120 140 160 200 210" stroke="rgba(255,255,255,0.06)" strokeWidth="20" fill="none" />
              </svg>
            )}

            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-overlay" />

            {/* Centered white text */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="text-2xl font-bold text-white drop-shadow-md text-center px-4">
                {update.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
