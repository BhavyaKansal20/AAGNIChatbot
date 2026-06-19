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
      <motion.div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
        animate={
          isSpeaking
            ? { scale: [1, 1.08, 1] }
            : isActive
            ? { scale: [1, 1.04, 1] }
            : {}
        }
        transition={{ duration: isSpeaking ? 0.6 : 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FF8C00, #FF6B00 40%, #D4A017 70%, #8B0000 100%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.3) 0%, transparent 60%)',
          }}
        />
        <span
          className="relative z-10 text-white/90 font-bold select-none"
          style={{ fontSize: size * 0.38, lineHeight: 1 }}
        >
          ॐ
        </span>
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
          className="w-[3px] rounded-full"
          style={{
            background: 'linear-gradient(to top, #FF6B00, #D4A017)',
            height: '100%',
            transformOrigin: 'bottom',
          }}
          animate={
            isActive
              ? { scaleY: [0.2, h / 100, 0.2], opacity: [0.6, 1, 0.6] }
              : { scaleY: 0.15, opacity: 0.3 }
          }
          transition={{
            duration: isActive ? 0.4 + (i % 4) * 0.15 : 0.3,
            repeat: Infinity,
            delay: i * 0.06,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
