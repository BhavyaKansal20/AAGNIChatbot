'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function PreFooterCTA() {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-24 px-6 relative flex justify-center font-serif">
      <div 
        className="w-full rounded-[48px] p-2 bg-white/40 backdrop-blur-xl border border-white"
        style={{
          boxShadow: '0 80px 160px rgba(255,122,30,.12), 0 120px 220px rgba(62,102,255,.08), 0 160px 260px rgba(0,155,77,.05)'
        }}
      >
        <div className="w-full relative overflow-hidden rounded-[40px] flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-[#2B3245] via-[#354060] to-[#596A9A]">
          
          {/* Top dark fade */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1E2433] to-transparent opacity-80" />
          
          {/* Wireframe Globe / Net at the bottom */}
          <div className="absolute bottom-0 inset-x-0 h-[250px] overflow-hidden flex justify-center opacity-40 mix-blend-overlay">
            {/* Extremely simplified wireframe dome using SVG */}
            <svg width="800" height="400" viewBox="0 0 800 400" fill="none" className="absolute top-0">
              <path d="M400 0 C 600 0 800 100 800 400" stroke="white" strokeWidth="2" fill="none" />
              <path d="M400 0 C 200 0 0 100 0 400" stroke="white" strokeWidth="2" fill="none" />
              
              <path d="M400 50 C 550 50 700 150 700 400" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M400 50 C 250 50 100 150 100 400" stroke="white" strokeWidth="1.5" fill="none" />
              
              <path d="M400 100 C 500 100 600 200 600 400" stroke="white" strokeWidth="1" fill="none" />
              <path d="M400 100 C 300 100 200 200 200 400" stroke="white" strokeWidth="1" fill="none" />
              
              {/* Horizontal grid lines */}
              <path d="M0 200 Q 400 100 800 200" stroke="white" strokeWidth="1" fill="none" />
              <path d="M0 300 Q 400 200 800 300" stroke="white" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 mt-8">
            <h2 className="text-4xl md:text-[44px] font-medium text-white mb-12 leading-tight tracking-tight">
              Build the Future of India's AI<br />with Aagni
            </h2>

            {/* Glowing 8-point Star Icon */}
            <div className="mb-12 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-white/40 blur-xl rounded-full scale-150" />
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                <path d="M12 0L14 9L23 9L15.5 14L18 23L12 17.5L6 23L8.5 14L1 9L10 9L12 0Z" />
              </svg>
            </div>

            {/* Glassmorphism Sign Up Button */}
            <Link 
              href="/platform"
              className="relative overflow-hidden px-10 py-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:bg-white/30 transition-all duration-300 group"
            >
              <span className="relative z-10 text-[17px] font-bold text-white font-sans tracking-wide">
                Sign Up
              </span>
            </Link>
          </div>
          
          {/* Bottom Light Glow */}
          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-white/20 blur-[80px] pointer-events-none" />

        </div>
      </div>
    </section>
  )
}
