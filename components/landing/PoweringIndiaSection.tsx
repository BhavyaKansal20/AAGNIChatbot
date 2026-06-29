'use client'
import { motion } from 'framer-motion'

export function PoweringIndiaSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full font-sans">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-[34px] text-[#333] tracking-tight font-medium">
          Powering India's AI-first future
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[32px] p-4 pr-8 md:p-6 md:pr-12 border border-black/5 flex flex-col md:flex-row gap-12 lg:gap-20 items-center max-w-5xl mx-auto"
        style={{
          boxShadow: '0 80px 160px rgba(255,122,30,.12), 0 120px 220px rgba(62,102,255,.08), 0 160px 260px rgba(0,155,77,.05)'
        }}
      >
        {/* Left Side: Graphic */}
        <div className="w-full md:w-[45%] shrink-0">
          <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-gradient-to-b from-[#A4B5FF] to-[#879CFF]">
            
            {/* Geometric Lotus Icon */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-90">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Inner diamond */}
                <rect x="46" y="46" width="8" height="8" transform="rotate(45 50 50)" fill="currentColor" />
                {/* Petals */}
                <path d="M50 15C60 30 70 40 85 50C70 60 60 70 50 85C40 70 30 60 15 50C30 40 40 30 50 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M50 25C55 35 65 45 75 50C65 55 55 65 50 75C45 65 35 55 25 50C35 45 45 35 50 25Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="opacity-50"/>
                {/* Outer rounded petals */}
                <path d="M50 5C65 20 80 35 95 50C80 65 65 80 50 95C35 80 20 65 5 50C20 35 35 20 50 5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" className="opacity-30"/>
              </svg>
            </div>

            {/* Cloud/Dome vectors at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] flex items-end overflow-hidden">
              <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover object-bottom translate-y-1">
                {/* Back layer */}
                <path d="M-50 240V120C0 120 40 90 80 90C120 90 160 120 200 80C240 120 280 90 320 90C360 90 400 120 450 120V240H-50Z" fill="#91A7FF" fillOpacity="0.6"/>
                {/* Middle layer */}
                <path d="M-20 240V160C20 160 60 110 100 110C140 110 160 150 200 110C240 150 260 110 300 110C340 110 380 160 420 160V240H-20Z" fill="#7D96FF" fillOpacity="0.8"/>
                {/* Front layer (Main Dome) */}
                <path d="M0 240V200C30 200 60 150 110 150C160 150 170 190 200 140C230 190 240 150 290 150C340 150 370 200 400 200V240H0Z" fill="#6A85FF"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Features */}
        <div className="w-full md:w-[55%] flex flex-col gap-10 py-4">
          
          {/* Item 1 */}
          <div className="flex gap-5">
            <div className="shrink-0 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#paint0_linear)"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#86E3CE" />
                    <stop offset="1" stopColor="#5EAA97" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="text-[19px] font-semibold text-[#1F2937] mb-2 font-sans tracking-tight">Sovereign by design</h3>
              <p className="text-[15px] text-[#6B7280] font-sans leading-relaxed">
                Build, deploy, and run AI with full control, developed and operated entirely in India by AAGNI AI
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-5">
            <div className="shrink-0 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#paint0_linear)"/>
              </svg>
            </div>
            <div>
              <h3 className="text-[19px] font-semibold text-[#1F2937] mb-2 font-sans tracking-tight">State of the art models</h3>
              <p className="text-[15px] text-[#6B7280] font-sans leading-relaxed">
                Powered by Sarvam 30B, 105B and Google Gemini — industry-leading models built for India&apos;s languages, culture, and context
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-5">
            <div className="shrink-0 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#paint0_linear)"/>
              </svg>
            </div>
            <div>
              <h3 className="text-[19px] font-semibold text-[#1F2937] mb-2 font-sans tracking-tight">Human at the core</h3>
              <p className="text-[15px] text-[#6B7280] font-sans leading-relaxed">
                AAGNI AI engineers work alongside your teams to deliver production-ready AI agents and solutions
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
