'use client'

export function IndianVibeBackground() {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{
        backgroundColor: '#FAFBFF',
        backgroundImage: `
          radial-gradient(ellipse 140% 70% at 50% -5%, rgba(255,122,26,0.95) 0%, rgba(255,147,73,0.7) 32%, transparent 72%),
          radial-gradient(ellipse 140% 90% at 50% 52%, rgba(62,102,255,0.6) 0%, rgba(130,165,255,0.3) 35%, transparent 78%),
          radial-gradient(ellipse 120% 70% at 50% 118%, rgba(0,155,77,0.2) 0%, transparent 70%),
          radial-gradient(ellipse 100% 100% at 50% 80%, rgba(255,255,255,0.85) 0%, transparent 80%)
        `,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    />
  )
}
