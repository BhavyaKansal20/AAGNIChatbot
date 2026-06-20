'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AuthModal } from './AuthModal'

const navLinks = [
  { label: 'Capabilities', href: '#features' },
  { label: 'Technology', href: '#technology' },
  { label: 'Privacy', href: '#privacy' },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full transition-all duration-500 pt-4">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            width: scrolled ? '60%' : '92%',
          }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
          className={`max-w-7xl rounded-full transition-all duration-500 dark-glass-panel border ${
            scrolled ? 'border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'border-transparent shadow-none'
          }`}
        >
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-[64px]">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-white/10 group-hover:border-white/30 transition-all">
                  <Image
                    src="/logo.png"
                    alt="AAGNI AI"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <AnimatePresence>
                  {!scrolled && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-xl font-bold tracking-tight text-white whitespace-nowrap overflow-hidden"
                    >
                      AAGNI <span className="text-transparent bg-clip-text bg-gradient-to-r from-aagni-saffron to-yellow-500">AI</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Desktop Nav Center */}
              <AnimatePresence>
                {!scrolled && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="hidden md:flex items-center gap-8 justify-center flex-1"
                  >
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-white/70 hover:text-white text-sm font-semibold tracking-wide transition-colors duration-300 relative group"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-aagni-saffron to-orange-400 group-hover:w-full transition-all duration-300" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop CTA Right */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setAuthOpen(true)}
                  className="px-6 py-2 rounded-full text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="px-6 py-2 rounded-full text-sm font-bold tracking-wide bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  Dashboard
                </button>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
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
            className="fixed inset-x-4 top-[100px] z-40 dark-glass-panel border border-white/10 rounded-3xl p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-white text-lg font-medium py-2 transition-colors border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-2">
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="px-6 py-3 rounded-full text-base font-semibold text-center w-full border border-white/20 text-white hover:bg-white/5"
                >
                  Log in
                </button>
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="px-6 py-3 rounded-full text-base font-semibold text-center w-full bg-white text-black hover:bg-gray-200"
                >
                  Access Dashboard
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
