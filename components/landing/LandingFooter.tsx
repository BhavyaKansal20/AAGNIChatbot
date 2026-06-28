'use client'
import Link from 'next/link'

export function LandingFooter() {
  return (
    <footer className="relative w-full h-[150px] flex flex-col justify-center overflow-hidden border-t border-black/5 mt-auto">
      {/* Background Gradient (Pale Blue with soft orange bottom glow - exactly like Image 1) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none bg-white">
        {/* Soft blue top/base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E3EBFF] to-white opacity-80" />
        
        {/* Soft orange glow at the bottom center */}
        <div 
          className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[150%]"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,170,100,0.5) 0%, rgba(255,200,150,0.2) 40%, transparent 100%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 flex flex-row items-center justify-between">
        
        {/* Left side: Copyright (Matching Image 1) */}
        <div className="flex items-center">
          <p className="text-[13px] font-sans text-[#5C5F6E] font-medium tracking-wide">
            © 2026 Aagni AI (Axonwise Private Limited). All rights reserved.
          </p>
        </div>

        {/* Right side: Nav links instead of Address (per user request) */}
        <div className="flex items-center gap-8 font-serif text-[13px] font-bold tracking-wider text-[#1A1F3B]">
          <Link href="/platform" className="hover:text-[#FF7A1A] transition-colors">PLATFORM</Link>
          <Link href="/developers" className="hover:text-[#FF7A1A] transition-colors">DEVELOPERS</Link>
          <Link href="/docs" className="hover:text-[#FF7A1A] transition-colors">RESOURCES</Link>
          <Link href="/company" className="hover:text-[#FF7A1A] transition-colors">ABOUT</Link>
        </div>
      </div>
    </footer>
  )
}
