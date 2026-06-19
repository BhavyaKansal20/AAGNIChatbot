'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Features', href: '#features' },
  { label: 'Developer', href: '#developer' },
  { label: 'Company', href: '#footer' },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-navbar shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-aagni-saffron/20 group-hover:ring-aagni-saffron/50 transition-all">
                <Image
                  src="/logo.png"
                  alt="Aagni AI"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-aagni-text">
                Aagni <span className="text-saffron-gradient">AI</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-aagni-subtext hover:text-aagni-text text-sm tracking-wide transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-aagni-saffron group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="btn-outline-saffron px-5 py-2 rounded-full text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="btn-saffron px-5 py-2 rounded-full text-sm font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-aagni-subtext hover:text-aagni-text transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 glass-navbar border-b border-aagni-border p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-aagni-subtext hover:text-aagni-text text-base py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-4 border-t border-aagni-border">
                <Link
                  href="/login"
                  className="btn-outline-saffron px-5 py-2.5 rounded-full text-sm font-medium flex-1 text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="btn-saffron px-5 py-2.5 rounded-full text-sm font-medium flex-1 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
