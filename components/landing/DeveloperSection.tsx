'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function DeveloperSection() {
  return (
    <div id="developer" className="w-full max-w-6xl mx-auto py-32 px-6 relative font-serif">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-[40px] overflow-hidden p-8 md:p-14 lg:p-20 border border-white/60 bg-white/40 backdrop-blur-2xl"
        style={{
          boxShadow: '0 80px 160px rgba(255,122,30,.12), 0 120px 220px rgba(62,102,255,.08), 0 160px 260px rgba(0,155,77,.05)'
        }}
      >
        {/* Background Gradients (Tri-color blend & glowing effect) */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          {/* Top Saffron Glow */}
          <div 
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%]"
            style={{
              background: 'radial-gradient(ellipse at top left, rgba(255,153,51,0.2) 0%, rgba(255,153,51,0.05) 50%, transparent 100%)',
              filter: 'blur(100px)'
            }}
          />
          {/* Bottom Green Glow */}
          <div 
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%]"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(19,136,8,0.15) 0%, rgba(19,136,8,0.05) 50%, transparent 100%)',
              filter: 'blur(100px)'
            }}
          />
          {/* Center Blue Glow (Chakra representation) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,128,0.05) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20 items-center md:items-start">
          
          {/* Left: Circular Image with Neon Tri-Color Ring */}
          <div className="shrink-0 relative">
            <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full p-2 relative shadow-2xl">
              {/* Neon Glowing Ring (Saffron -> White -> Green) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] opacity-80 blur-[8px] animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808]" />
              
              <div className="w-full h-full rounded-full overflow-hidden bg-white relative z-10 border-4 border-white/80">
                <Image 
                  src="/image.png" 
                  alt="Bhavya Kansal" 
                  fill 
                  className="object-cover" 
                  priority 
                  quality={100}
                />
              </div>
            </div>
            {/* Indian Flag Status Dot */}
            <div className="absolute bottom-[40px] right-[40px] w-8 h-8 rounded-full border-4 border-white shadow-xl z-20 flex flex-col overflow-hidden bg-white">
               <div className="w-full h-1/3 bg-[#FF9933]" />
               <div className="w-full h-1/3 bg-white flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-[#000080] rounded-full" />
               </div>
               <div className="w-full h-1/3 bg-[#138808]" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col justify-center h-full">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF9933]/10 via-white to-[#138808]/10 border border-black/5 mb-6 text-sm font-bold tracking-widest text-[#1A1F3B] shadow-sm max-w-max">
              PROUDLY INDIAN
            </div>

            <h3 className="text-4xl md:text-6xl font-bold text-[#1A1F3B] mb-3 tracking-tight">
              Bhavya Kansal
            </h3>
            <p className="text-[#FF7A1A] text-xl font-medium tracking-wide mb-8">
              Founder & Developer · Aagni AI
            </p>

            <p className="text-[#4A4D5E] text-[18px] font-sans leading-relaxed mb-10 max-w-3xl">
              Building India's next-generation AI infrastructure from the ground up — from fine-tuning multilingual models to architecting production-grade APIs that serve millions. Passionate about making AI accessible to every Indian in their own language.
            </p>

            {/* Quote Box (Light Theme) */}
            <div className="bg-white/60 border border-black/5 rounded-3xl p-8 mb-12 relative overflow-hidden backdrop-blur-md max-w-4xl shadow-sm">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF9933] via-transparent to-[#138808] opacity-50" />
              <p className="text-[#1A1F3B] text-xl italic leading-relaxed relative z-10">
                "The future of AI isn't built in silos — it's forged at the intersection of sovereign compute, cultural intelligence, and relentless engineering. India doesn't just consume AI; India builds it."
              </p>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-4 mt-auto mb-10">
              {['Full-Stack AI', 'Systems Architecture', 'NLP Research', 'Cloud Infrastructure'].map(tag => (
                <span 
                  key={tag} 
                  className="px-6 py-3 bg-white border border-black/10 shadow-sm rounded-full text-[#4A4D5E] text-sm font-sans font-bold hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 border-t border-black/10 pt-8 w-full font-sans">
              <a href="https://bhavyakansal.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#4A4D5E] hover:text-[#FF7A1A] transition-colors text-[15px] font-semibold">
                <span className="text-xl">🌐</span> Portfolio
              </a>
              <a href="https://github.com/BhavyaKansal20" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#4A4D5E] hover:text-black transition-colors text-[15px] font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/bhavyakansal20" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#4A4D5E] hover:text-[#0A66C2] transition-colors text-[15px] font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
              <a href="mailto:kansalbhavya27@gmail.com" className="flex items-center gap-2 text-[#4A4D5E] hover:text-red-500 transition-colors text-[15px] font-semibold">
                <span className="text-xl">📧</span> kansalbhavya27@gmail.com
              </a>
              <a href="mailto:kansalbhavya20@icloud.com" className="flex items-center gap-2 text-[#4A4D5E] hover:text-blue-500 transition-colors text-[15px] font-semibold">
                <span className="text-xl">📧</span> kansalbhavya20@icloud.com
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}
