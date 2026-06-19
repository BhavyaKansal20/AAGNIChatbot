'use client'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { AagniOrb } from '@/components/effects/AagniOrb'
import { OmSymbol } from '@/components/ui/IndianIcons'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-aagni-bg relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-saffron-glow opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-orange-900/20 to-transparent rounded-full blur-3xl" />
      
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo block */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            animate={{ filter: ['drop-shadow(0 0 20px rgba(255,107,0,0.6))', 'drop-shadow(0 0 35px rgba(255,140,0,0.8))', 'drop-shadow(0 0 20px rgba(255,107,0,0.6))'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mb-5"
          >
            <AagniOrb size={80} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-2"
          >
            <OmSymbol className="w-6 h-6 text-aagni-gold opacity-70" />
            <h1 className="text-4xl font-bold tracking-tight text-saffron-gradient">
              Aagni AI
            </h1>
            <OmSymbol className="w-6 h-6 text-aagni-gold opacity-70" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-aagni-subtext text-center text-sm tracking-widest uppercase"
          >
            India's Intelligent Assistant
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-strong rounded-2xl p-8 border-saffron-glow"
        >
          <h2 className="text-xl text-aagni-text text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-aagni-subtext text-center text-sm mb-8">
            Sign in to continue your conversation with Aagni
          </p>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(255,107,0,0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-white/5 border border-white/10 hover:border-aagni-saffron/40 text-aagni-text transition-all duration-300"
            >
              <GoogleIcon />
              <span className="font-medium">Continue with Google</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(255,107,0,0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-white/5 border border-white/10 hover:border-aagni-saffron/40 text-aagni-text transition-all duration-300"
            >
              <GitHubIcon />
              <span className="font-medium">Continue with GitHub</span>
            </motion.button>
          </div>

          <p className="text-aagni-subtext text-center text-xs mt-6 leading-relaxed">
            By continuing, you agree to Aagni AI's terms of service.
            <br />Your chats are encrypted and private.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-aagni-muted text-xs mt-8"
        >
          Powered by Sarvam AI · Built in India 🇮🇳
        </motion.p>
      </motion.div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
