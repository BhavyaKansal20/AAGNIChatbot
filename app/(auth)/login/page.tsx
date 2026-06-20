'use client'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { AagniOrb } from '@/components/effects/AagniOrb'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-aagni-darkbg relative overflow-hidden dark-premium font-serif text-white">
      
      {/* Massive Dark Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0A0D1C] to-[#050816] opacity-90" />
        
        {/* Animated Neon Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-aagni-saffron/20 rounded-full blur-[140px] mix-blend-screen animate-pulse-glow" 
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] mix-blend-screen animate-pulse-glow" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="dark-glass-panel border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-2xl text-center">
          {/* Logo block */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 20px rgba(255,122,26,0.3))', 'drop-shadow(0 0 35px rgba(255,122,26,0.5))', 'drop-shadow(0 0 20px rgba(255,122,26,0.3))'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6 relative w-24 h-24 rounded-full border border-white/20 bg-white/5 flex items-center justify-center p-2 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <AagniOrb size={80} />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-aagni-saffron via-orange-400 to-yellow-500 mb-2 drop-shadow-lg"
            >
              AAGNI AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-sm tracking-widest uppercase font-semibold"
            >
              Personal AI Hub
            </motion.p>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-medium text-white/90">Welcome Back</h2>
            <p className="text-sm text-white/60">Sign in to access your secure dashboard.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
            >
              <svg className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black hover:bg-gray-200 border border-transparent rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 10 0 0 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-8 text-xs text-white/40">
            <p>By continuing, you agree to AAGNI AI's terms of service.</p>
            <p className="mt-1">All connections are encrypted and private.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
