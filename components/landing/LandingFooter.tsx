'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function LandingFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // The CTA section stays pinned while the footer reveals
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 0])
  const footerY = useTransform(scrollYProgress, [0, 1], [100, 0])
  const footerOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full h-[1200px] md:h-[1000px]">
      {/* 
        This acts as a spacer and holds the sticky content. 
        We use sticky positioning to keep the CTA on top while the footer scrolls up from beneath.
      */}
      <div className="sticky top-auto bottom-0 w-full h-[1200px] md:h-[1000px] overflow-hidden">
        
        {/* === REVEAL FOOTER (Background Layer) === */}
        <motion.footer 
          style={{ y: footerY, opacity: footerOpacity }}
          className="absolute bottom-0 left-0 w-full pt-48 pb-12 px-6 lg:px-12 bg-gradient-to-b from-[#E8EEFF] via-[#F7F8FC] to-[#FFCF9A] z-0"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo.png" alt="AAGNI AI" width={40} height={40} className="rounded-xl shadow-sm" />
                <span className="text-xl font-bold font-serif text-aagni-indigo">AAGNI <span className="text-gradient-saffron">AI</span></span>
              </div>
              <p className="text-sm font-medium text-aagni-indigo/80 mb-6">Building sovereign AI infrastructure for India's next billion users.</p>
              <div className="flex flex-col gap-2 text-xs font-semibold text-aagni-saffron uppercase tracking-wider">
                <span className="flex items-center gap-2"><span role="img">🇮🇳</span> Made in India</span>
                <span className="flex items-center gap-2"><span role="img">🌐</span> Multilingual AI</span>
                <span className="flex items-center gap-2"><span role="img">🔒</span> Privacy First</span>
              </div>
            </div>

            {/* Products Column */}
            <div>
              <h4 className="font-bold text-aagni-indigo mb-6 tracking-wide">Products</h4>
              <ul className="space-y-4 text-sm font-medium text-aagni-indigo/60">
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">AAGNI Chat</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">AAGNI Voice</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">AAGNI Listen</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">AAGNI Vision</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">AAGNI Docs</li>
              </ul>
            </div>

            {/* Developers Column */}
            <div>
              <h4 className="font-bold text-aagni-indigo mb-6 tracking-wide">Developers</h4>
              <ul className="space-y-4 text-sm font-medium text-aagni-indigo/60">
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">API Reference</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Status</li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold text-aagni-indigo mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-aagni-indigo/60">
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">About</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Research</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-bold text-aagni-indigo mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-aagni-indigo/60">
                <li><Link href="/privacy" className="hover:text-aagni-saffron transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-aagni-saffron transition-colors">Terms of Service</Link></li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Security</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Trust Center</li>
                <li className="hover:text-aagni-saffron cursor-pointer transition-colors">Cookies</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-aagni-indigo/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-medium text-aagni-indigo/60">
              By continuing you agree to our <Link href="/terms" className="underline hover:text-aagni-saffron">Terms</Link> and <Link href="/privacy" className="underline hover:text-aagni-saffron">Privacy Policy</Link>.
            </p>
            <div className="flex gap-6 text-sm font-bold text-aagni-indigo/60">
              <a href="#" className="hover:text-aagni-saffron transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-aagni-saffron transition-colors">YouTube</a>
              <a href="#" className="hover:text-aagni-saffron transition-colors">GitHub</a>
            </div>
          </div>
        </motion.footer>

        {/* === MASSIVE CTA SECTION (Foreground Layer) === */}
        <motion.div 
          style={{ y: ctaY }}
          className="absolute top-10 left-0 right-0 z-10 flex justify-center w-full px-4 md:px-0"
        >
          <div className="w-full max-w-[1400px] h-[600px] md:h-[500px] rounded-[48px] overflow-hidden relative shadow-premium glass-pill border border-white/40">
            {/* Background Map / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#23294D] via-[#AEBFFF] to-[#FF8A1C]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            
            {/* Glowing Effects */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
              <div className="w-[800px] h-[800px] bg-aagni-saffron rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center text-white">
              <h2 className="text-4xl md:text-6xl lg:text-[72px] font-bold font-serif mb-6 drop-shadow-lg">
                Ready to Build with AAGNI?
              </h2>
              <p className="text-lg md:text-xl font-medium text-white/90 max-w-3xl mb-12 drop-shadow-md">
                India's Local AI Platform for Chat, Voice, Agents, Vision and Multimodal Intelligence.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-[#23294D] to-[#161a33] text-white rounded-full font-semibold text-lg hover:shadow-[0_10px_30px_rgba(255,122,26,0.4)] hover:-translate-y-1 transition-all duration-300">
                  Start Building
                </Link>
                <Link href="#" className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                  Documentation
                </Link>
                <Link href="#" className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white hover:text-aagni-indigo transition-all duration-300">
                  Contact Sales
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/20 pt-8">
                <div>
                  <p className="text-3xl font-bold font-serif">15+</p>
                  <p className="text-sm font-medium text-white/70">Languages</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-serif">12+</p>
                  <p className="text-sm font-medium text-white/70">Models</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-serif">2M+</p>
                  <p className="text-sm font-medium text-white/70">API Requests</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-serif">&lt;100ms</p>
                  <p className="text-sm font-medium text-white/70">Latency</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
