'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AuthModal } from './AuthModal'

const navLinks = [
  { label: 'PLATFORM', href: '/platform' },
  { label: 'DEVELOPERS', href: '/developers' },
  { label: 'RESOURCES', href: '/docs' },
  { label: 'ABOUT', href: '/company' },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Add shadow when scrolled
      setScrolled(currentScrollY > 50)
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="pointer-events-auto max-w-7xl w-[92%] transition-all duration-500"
          style={{
            background: 'rgba(255,255,255,.48)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(255,255,255,.45)',
            boxShadow: '0 12px 45px rgba(0,0,0,.06), inset 0 1px 1px rgba(255,255,255,.85)',
            borderRadius: '999px',
          }}
        >
          <div className="px-5 lg:px-8">
            <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[60px]' : 'h-[72px]'}`}>
              {/* Logo — Left */}
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <span className="text-4xl font-bold tracking-tight text-[#1A1F3B] font-serif flex items-center">
                  Aagni <span className="text-[#FF7A1A] ml-1.5 font-serif">AI</span>
                </span>
              </Link>

              {/* Desktop Nav — Center */}
              <div className="hidden md:flex items-center gap-10 justify-center flex-1">
                {navLinks.map((link) => {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-aagni-indigo/80 hover:text-aagni-indigo text-[13px] font-bold tracking-wide transition-colors duration-300 font-serif"
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              {/* Desktop CTA — Right */}
              <div className="hidden md:flex items-center gap-4 shrink-0">
                <button
                  onClick={() => setAuthOpen(true)}
                  className="bg-aagni-indigo text-white rounded-full px-6 py-2.5 text-[14px] font-medium tracking-wide hover:bg-aagni-indigo/90 transition-colors duration-200"
                >
                  Log in
                </button>
                <a
                  href="mailto:kansalbhavya27@gmail.com"
                  className="bg-white border border-aagni-indigo/10 shadow-sm text-aagni-indigo rounded-full px-6 py-2.5 text-[14px] font-medium tracking-wide hover:shadow transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-aagni-indigo/70 hover:text-aagni-indigo transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu — Slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[100px] z-40 bg-aagni-cream border border-aagni-indigo/10 rounded-3xl p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-aagni-indigo/80 hover:text-aagni-indigo text-sm font-bold tracking-wide py-3 transition-colors border-b border-aagni-indigo/5 last:border-b-0"
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="flex flex-col gap-3 pt-4 mt-2">
                <button
                  onClick={() => {
                    setAuthOpen(true)
                    setMobileOpen(false)
                  }}
                  className="bg-aagni-indigo text-white rounded-full px-6 py-3 text-sm font-medium tracking-wide text-center w-full hover:bg-aagni-indigo/90 transition-colors"
                >
                  Log in
                </button>
                <a
                  href="mailto:kansalbhavya27@gmail.com"
                  onClick={() => setMobileOpen(false)}
                  className="bg-white border border-aagni-indigo/10 text-aagni-indigo rounded-full px-6 py-3 text-sm font-medium tracking-wide text-center w-full shadow-sm hover:shadow transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
