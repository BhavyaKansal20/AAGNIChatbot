/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        aagni: {
          bg:       '#090910',
          surface:  '#0f0f1a',
          panel:    '#13131f',
          border:   '#1e1e30',
          saffron:  '#FF6B00',
          gold:     '#D4A017',
          ember:    '#FF3D00',
          glow:     '#FF8C00',
          green:    '#00C896',
          blue:     '#4A90E2',
          muted:    '#4a4a6a',
          text:     '#e8e8f0',
          subtext:  '#8888a8',
        },
      },
      backgroundImage: {
        'saffron-glow': 'radial-gradient(ellipse at center, rgba(255,107,0,0.15) 0%, transparent 70%)',
        'gold-glow':    'radial-gradient(ellipse at center, rgba(212,160,23,0.12) 0%, transparent 70%)',
        'ember-glow':   'radial-gradient(ellipse at top, rgba(255,61,0,0.08) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':     'spin 8s linear infinite',
        'glow-pulse':    'glowPulse 2s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'wave':          'wave 1.5s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'saffron':     '0 0 20px rgba(255,107,0,0.4)',
        'saffron-lg':  '0 0 40px rgba(255,107,0,0.3), 0 0 80px rgba(255,107,0,0.1)',
        'gold':        '0 0 20px rgba(212,160,23,0.4)',
        'glass':       '0 8px 32px rgba(0,0,0,0.4)',
        'inner-glow':  'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
