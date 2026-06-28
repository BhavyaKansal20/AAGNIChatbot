'use client'
import { motion } from 'framer-motion'

interface AagniOrbProps {
  size?: number
  isActive?: boolean
  isSpeaking?: boolean
}

export function AagniOrb({ size = 60, isActive = false, isSpeaking = false }: AagniOrbProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {(isActive || isSpeaking) && (
        <>
          <motion.div
            className="absolute rounded-full border border-orange-500/20"
            style={{ width: size * 1.8, height: size * 1.8 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full border border-yellow-600/20"
            style={{ width: size * 1.5, height: size * 1.5 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
        </>
      )}
      
      {/* Outer subtle glow instead of heavy orange circle */}
      <div 
        className="absolute rounded-full bg-aagni-saffron/20 blur-xl animate-pulse-glow pointer-events-none"
        style={{ width: size * 1.2, height: size * 1.2 }}
      />
      
      <motion.div
        className="relative rounded-full flex items-center justify-center dark-glass-panel border-2 border-black/10 bg-black/5 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        style={{ width: size, height: size }}
        animate={
          isSpeaking
            ? { scale: [1, 1.08, 1], boxShadow: ['0 0 20px rgba(255,255,255,0.1)', '0 0 40px rgba(255,122,26,0.3)', '0 0 20px rgba(255,255,255,0.1)'] }
            : isActive
            ? { scale: [1, 1.04, 1] }
            : {}
        }
        transition={{ duration: isSpeaking ? 0.6 : 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/logo.png"
          alt="AAGNI"
          className="relative z-10 w-[70%] h-[70%] object-contain drop-shadow-md"
        />
      </motion.div>
    </div>
  )
}

export function VoiceWaveform({ isActive }: { isActive: boolean }) {
  const heights = [60, 40, 80, 50, 90, 45, 75, 55, 85, 40, 65, 50]
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 40 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-aagni-saffron"
          animate={
            isActive
              ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }
              : { height: '10%' }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
