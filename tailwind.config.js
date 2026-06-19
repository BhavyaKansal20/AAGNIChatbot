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
          /* Light Theme (Landing) */
          cream:    '#F8F8FA',
          indigo:   '#23294D',
          saffron:  '#FF7A1A',
          peach:    '#FFD6B2',
          iceblue:  '#E7ECFF',
          softblue: '#AEBFFF',
          orange:   '#FF8A1C',
          
          /* Dark Premium Theme (Chat) */
          darkbg:   '#050816',
          panel:    '#0A0D1C',
          border:   'rgba(255,255,255,0.08)',
          text:     '#E2E8F0',
          muted:    '#94A3B8',
        },
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse at center, rgba(255,122,26,0.15) 0%, rgba(35,41,77,0.1) 50%, transparent 80%)',
        'auth-gradient': 'linear-gradient(135deg, rgba(255,122,26,0.1) 0%, rgba(35,41,77,0.2) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.2)' },
        }
      },
      boxShadow: {
        'premium': '0 20px 40px -10px rgba(35, 41, 77, 0.1)',
        'premium-hover': '0 30px 60px -15px rgba(35, 41, 77, 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
