'use client'

interface IconProps {
  className?: string
  size?: number
}

export function OmSymbol({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <text x="50%" y="72%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontFamily="serif">
        ॐ
      </text>
    </svg>
  )
}

export function LotusIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 38 C24 38 12 30 12 20 C12 14 17 10 24 10 C31 10 36 14 36 20 C36 30 24 38 24 38Z" fill="currentColor" opacity="0.6"/>
      <path d="M24 38 C24 38 8 28 6 18 C5 12 10 8 16 10 C18 11 20 14 21 17" fill="currentColor" opacity="0.4"/>
      <path d="M24 38 C24 38 40 28 42 18 C43 12 38 8 32 10 C30 11 28 14 27 17" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="20" r="4" fill="currentColor" opacity="0.9"/>
    </svg>
  )
}

export function DiyaIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="24" cy="34" rx="14" ry="7" fill="currentColor" opacity="0.5"/>
      <path d="M10 34 Q12 24 24 22 Q36 24 38 34" fill="currentColor" opacity="0.6"/>
      <ellipse cx="24" cy="34" rx="14" ry="5" fill="currentColor" opacity="0.3"/>
      <path d="M24 22 L24 8" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      <path d="M20 8 Q24 2 28 8" fill="currentColor" opacity="0.9"/>
    </svg>
  )
}

export function ChakraIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 24 + 8 * Math.cos(angle)
        const y1 = 24 + 8 * Math.sin(angle)
        const x2 = 24 + 18 * Math.cos(angle)
        const y2 = 24 + 18 * Math.sin(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      })}
    </svg>
  )
}

export function IndianFlagIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 90 60" className={className}>
      <rect width="90" height="20" fill="#FF9933"/>
      <rect y="20" width="90" height="20" fill="white"/>
      <rect y="40" width="90" height="20" fill="#138808"/>
      <circle cx="45" cy="30" r="8" fill="none" stroke="#000080" strokeWidth="2"/>
      <circle cx="45" cy="30" r="2" fill="#000080"/>
    </svg>
  )
}
