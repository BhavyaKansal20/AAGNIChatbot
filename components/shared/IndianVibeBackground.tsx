'use client'

export function IndianVibeBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#FAFBFF]">
      
      {/* 1. Orange Glow (Top) */}
      <div 
        className="absolute"
        style={{
          top: '-520px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2400px',
          height: '1100px',
          background: '#FF7A1A',
          borderRadius: '50%',
          filter: 'blur(180px)',
          opacity: 0.95,
        }}
      />
      
      {/* 2. Ashoka Blue Atmosphere (Middle) */}
      <div 
        className="absolute"
        style={{
          top: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2100px',
          height: '1200px',
          background: '#3E66FF',
          borderRadius: '50%',
          filter: 'blur(230px)',
          opacity: 0.60,
        }}
      />

      {/* 3. White Fog (Lower Middle) */}
      <div 
        className="absolute"
        style={{
          bottom: '-380px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2100px',
          height: '900px',
          background: '#FFFFFF',
          borderRadius: '50%',
          filter: 'blur(170px)',
          opacity: 0.85,
        }}
      />

      {/* 4. Very Soft Indian Green (Bottom) */}
      <div 
        className="absolute"
        style={{
          bottom: '-420px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1800px',
          height: '800px',
          background: '#009B4D',
          borderRadius: '50%',
          filter: 'blur(220px)',
          opacity: 0.18,
        }}
      />

      {/* 5. Noise Texture (Top-most layer in background) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/noise.png")',
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  )
}
