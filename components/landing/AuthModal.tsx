'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex w-full max-w-[960px] overflow-hidden rounded-[36px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(35,41,77,0.15)]"
            >
              {/* Left Column - Form */}
              <div className="w-full lg:w-[480px] p-8 md:p-12 relative flex flex-col">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-aagni-indigo/60 hover:text-aagni-indigo"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aagni-indigo/5 border border-aagni-indigo/10 mb-6">
                    <span role="img" aria-label="India text-sm">🇮🇳</span>
                    <span className="text-xs font-semibold text-aagni-indigo">India's Local AI Assistant</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-aagni-indigo mb-3 font-serif tracking-tight">
                    {isLogin ? 'Welcome back' : 'Start Your AAGNI Journey'}
                  </h2>
                  <p className="text-aagni-indigo/70 text-sm md:text-base">
                    Chat, Speak, Listen, and Build with India's next-generation AI platform.
                  </p>
                </div>

                {/* Extra Premium Touches */}
                <div className="flex gap-4 mb-8 text-xs font-medium text-aagni-indigo/60">
                  <span className="flex items-center gap-1.5"><span role="img">🌍</span> Hindi, Punjabi & 20+ more</span>
                  <span className="flex items-center gap-1.5 text-aagni-saffron">⚡ &lt;100ms response</span>
                </div>

                <div className="space-y-3 mb-6">
                  {/* Google OAuth Button */}
                  <button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="w-full h-14 bg-white hover:bg-gray-50 text-aagni-indigo rounded-[18px] border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-300 flex items-center justify-center gap-3 font-medium text-[15px]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  {/* GitHub OAuth Button */}
                  <button
                    onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                    className="w-full h-14 bg-aagni-indigo hover:bg-[#1a1f3a] text-white rounded-[18px] shadow-sm hover:shadow-[0_8px_20px_rgba(35,41,77,0.2)] hover:-translate-y-[1px] transition-all duration-300 flex items-center justify-center gap-3 font-medium text-[15px]"
                  >
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] bg-black/5 flex-1" />
                  <span className="text-xs font-semibold text-aagni-indigo/40 tracking-wider">OR</span>
                  <div className="h-[1px] bg-black/5 flex-1" />
                </div>

                {/* Email Auth Form */}
                <form className="space-y-4 flex-1">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full h-12 bg-white/50 border border-black/10 rounded-xl px-4 text-aagni-indigo placeholder:text-aagni-indigo/40 focus:outline-none focus:ring-2 focus:ring-aagni-saffron/20 focus:border-aagni-saffron/40 transition-all"
                    />
                  </div>
                  {!isLogin && (
                    <div>
                      <input
                        type="password"
                        placeholder="Create password"
                        className="w-full h-12 bg-white/50 border border-black/10 rounded-xl px-4 text-aagni-indigo placeholder:text-aagni-indigo/40 focus:outline-none focus:ring-2 focus:ring-aagni-saffron/20 focus:border-aagni-saffron/40 transition-all"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-full h-12 mt-2 bg-gradient-to-r from-[#23294D] to-[#3a447a] hover:from-[#1a1f3a] hover:to-[#2d3563] text-white rounded-xl shadow-[0_4px_14px_rgba(35,41,77,0.2)] hover:shadow-[0_6px_20px_rgba(35,41,77,0.3)] hover:-translate-y-[1px] transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-aagni-indigo/60">
                    {isLogin ? "New to AAGNI? " : "Already have an account? "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-aagni-saffron font-semibold hover:text-aagni-orange transition-colors"
                    >
                      {isLogin ? "Create Account" : "Sign In"}
                    </button>
                  </p>
                </div>
              </div>

              {/* Right Column - Illustration (Desktop Only) */}
              <div className="hidden lg:flex w-[480px] bg-gradient-to-br from-aagni-saffron to-aagni-indigo relative overflow-hidden items-center justify-center p-12">
                {/* Background glow and particles */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Glowing India Map Abstraction */}
                <div className="relative w-full aspect-square flex items-center justify-center z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  />
                  <div className="relative text-center">
                    <span className="text-8xl block mb-6 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">🇮🇳</span>
                    <h3 className="text-white text-2xl font-bold font-serif mb-2 drop-shadow-md">AI for Every Indian</h3>
                    <p className="text-white/80 text-sm font-medium">Building sovereign AI infrastructure for India's next billion users.</p>
                  </div>
                  
                  {/* Floating AI Nodes */}
                  <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                  <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-10 w-4 h-4 bg-[#FFD6B2] rounded-full shadow-[0_0_20px_rgba(255,214,178,0.8)]" />
                  <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
