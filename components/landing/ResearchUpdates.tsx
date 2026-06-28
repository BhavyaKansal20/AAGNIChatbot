'use client'
import { motion } from 'framer-motion'

const updates = [
  {
    tag: 'RESEARCH',
    title: 'Aagni AI Core Research',
    date: 'April 2, 2026',
    imageType: 'blue',
    imageText1: 'Indic AI',
    imageText2: 'Research',
  },
  {
    tag: 'MODELS',
    title: 'Powered by Sarvam 30B and 105B',
    date: 'March 6, 2026',
    imageType: 'green',
    imageText1: 'Sarvam',
    imageText2: '105B',
  },
  {
    tag: 'MULTIMODAL',
    title: 'Google Gemini for Image & Doc Analysis',
    date: 'February 20, 2026',
    imageType: 'orange',
    imageText1: 'Gemini',
    imageText2: 'Vision',
  },
]

export function ResearchUpdates() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-serif text-[#1A1F3B] tracking-tight">
          Research & Updates
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updates.map((update, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-white rounded-[32px] p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
          >
            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-widest text-[#4A4D5E] uppercase font-sans">
                {update.tag}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-[#1A1F3B] font-serif leading-snug mb-3">
              {update.title}
            </h3>
            
            <p className="text-sm text-[#4A4D5E] font-sans mb-6 flex-1">
              {update.date}
            </p>

            {/* Simulated Images from screenshot #3 */}
            <div className="w-full h-[220px] rounded-[24px] overflow-hidden relative flex items-center justify-center p-6">
              {update.imageType === 'blue' && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-orange-200">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     {/* decorative bracket shape */}
                     <div className="w-[80%] h-[120%] border-x-4 border-white/20 rounded-[100px] scale-y-110" />
                  </div>
                </div>
              )}
              {update.imageType === 'green' && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-green-600 to-emerald-900">
                   <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent scale-150 rounded-[100%]" />
                   </div>
                </div>
              )}
              {update.imageType === 'orange' && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                     <div className="w-[120%] h-[120%] border-[20px] border-white/10 rounded-full scale-110 flex items-center justify-center">
                        <div className="w-[80%] h-[80%] border-[20px] border-white/10 rounded-full" />
                     </div>
                  </div>
                </div>
              )}
              
              <div className="relative z-10 text-center">
                <span className="block text-2xl font-bold text-white font-sans leading-tight shadow-sm drop-shadow-md">
                  {update.imageText1}
                </span>
                <span className="block text-2xl font-bold text-white font-sans leading-tight shadow-sm drop-shadow-md">
                  {update.imageText2}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
