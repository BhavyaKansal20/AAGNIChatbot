'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { TopAnnouncementBar } from './TopAnnouncementBar'
import { AuthModal } from './AuthModal'

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Features', href: '#features' },
  { label: 'Developers', href: '#developer' },
  { label: 'About', href: '#footer' },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full transition-all duration-500">
        <TopAnnouncementBar />
        
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className={`w-[92%] max-w-7xl mt-4 rounded-full transition-all duration-500 glass-pill ${
            scrolled ? 'shadow-premium' : 'shadow-sm'
          }`}
        >
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-[64px]">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-aagni-saffron/20 group-hover:border-aagni-saffron transition-all">
                  <Image
                    src="/logo.png"
                    alt="AAGNI AI"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-aagni-indigo">
                  AAGNI <span className="text-gradient-saffron">AI</span>
                </span>
              </Link>

              {/* Desktop Nav Center */}
              <div className="hidden md:flex items-center gap-8 justify-center flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-aagni-indigo hover:text-aagni-saffron text-base font-medium tracking-wide transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-aagni-saffron to-aagni-orange group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>

              {/* Desktop CTA Right */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setAuthOpen(true)}
                  className="btn-secondary px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide"
                >
                  Log in
                </button>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide"
                >
                  Sign Up
                </button>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-aagni-indigo hover:text-aagni-saffron transition-colors"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-[140px] z-40 glass-card-light rounded-3xl p-6 md:hidden shadow-premium"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-aagni-indigo hover:text-aagni-saffron text-lg font-medium py-2 transition-colors border-b border-black/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-2">
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="btn-secondary px-6 py-3 rounded-full text-base font-semibold text-center w-full"
                >
                  Log in
                </button>
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="btn-primary px-6 py-3 rounded-full text-base font-semibold text-center w-full"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
