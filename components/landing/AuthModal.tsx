'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [videoFinished, setVideoFinished] = useState(false)

  // Reset video state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setVideoFinished(false), 300)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
          />

          {!videoFinished ? (
            /* Video Intro overlay */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[101] bg-black pointer-events-auto flex items-center justify-center"
            >
              <video 
                src="/video.mov" 
                autoPlay 
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setVideoFinished(true)}
              />
              <button 
                onClick={() => setVideoFinished(true)}
                className="absolute top-6 right-6 text-white/50 hover:text-white px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-sm transition-colors"
              >
                Skip Intro
              </button>
            </motion.div>
          ) : (
            /* Main Auth Modal matching Screenshot #2 */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative w-full max-w-[440px] bg-white rounded-3xl overflow-hidden shadow-2xl z-[102] mx-4 border border-black/5"
            >
              {/* Blurred Colorful Banner (Screenshot 2 style) */}
              <div className="h-[140px] w-full relative overflow-hidden flex items-center justify-center bg-black">
                {/* Simulated Colorful blurred background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-pink-600 to-indigo-800 opacity-80" />
                <div className="absolute top-0 -left-1/4 w-full h-full bg-yellow-400 mix-blend-screen blur-3xl opacity-50" />
                <div className="absolute bottom-0 -right-1/4 w-full h-full bg-blue-500 mix-blend-screen blur-3xl opacity-50" />
                
                {/* Logo Text */}
                <span className="relative z-10 text-[32px] font-bold tracking-tight text-white font-serif flex items-center">
                  Aagni <span className="ml-1.5 font-serif">AI</span>
                </span>
              </div>

              {/* Modal Content */}
              <div className="p-8 pb-10 flex flex-col items-center">
                <h2 className="text-[28px] text-[#1A1F3B] font-serif mb-8 text-center">
                  Sign in to continue
                </h2>

                <div className="space-y-4 mb-10 w-full max-w-[280px]">
                  <div className="flex items-center gap-3 text-[#1A1F3B]">
                    <Check size={20} className="text-green-600 shrink-0" />
                    <span className="text-base font-serif">India's own AI</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#1A1F3B]">
                    <Check size={20} className="text-green-600 shrink-0" />
                    <span className="text-base font-serif">Powered by Indian LLMs</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#1A1F3B]">
                    <Check size={20} className="text-green-600 shrink-0" />
                    <span className="text-base font-serif">Free and open source</span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button
                    onClick={() => signIn('google', { callbackUrl: '/chat' })}
                    className="w-full h-[52px] bg-[#1A1F3B] hover:bg-black text-white rounded-full transition-colors flex items-center justify-center gap-3 font-medium text-base font-serif"
                  >
                    <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                  
                  <button
                    onClick={() => signIn('github', { callbackUrl: '/chat' })}
                    className="w-full h-[52px] bg-white border border-black/10 hover:bg-gray-50 text-[#1A1F3B] rounded-full transition-colors flex items-center justify-center gap-3 font-medium text-base font-serif"
                  >
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                  </button>
                </div>

                <button className="mt-8 text-[#4A4D5E] hover:text-[#1A1F3B] text-sm font-serif transition-colors">
                  Use email or other options
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
