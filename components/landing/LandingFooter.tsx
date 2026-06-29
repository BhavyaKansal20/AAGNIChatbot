'use client'

import Link from 'next/link'

export function LandingFooter() {
  return (
    <footer
      className="w-full py-8 px-6 md:px-12"
      style={{
        background:
          'linear-gradient(180deg, #E8EEFF 0%, #F5F0EB 60%, #F8EDE3 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-bold tracking-tight text-[#1A1F3B] font-serif">
            AAGNI <span className="text-[#FF7A1A]">AI</span>
          </span>
          <span className="font-sans text-[13px] text-[#5C5F6E]">
            © 2026 MultiModex AI · AAGNI AI · All rights reserved.
          </span>
        </div>

        {/* Right: Legal Links */}
        <div className="flex items-center gap-6 font-sans text-[13px] text-[#5C5F6E]">
          <Link href="/terms" className="hover:text-[#1A1F3B] transition-colors">
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy" className="hover:text-[#1A1F3B] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
