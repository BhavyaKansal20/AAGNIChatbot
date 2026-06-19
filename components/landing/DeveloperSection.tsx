'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function DeveloperSection() {
  return (
    <div id="developer" className="w-full max-w-[1200px] mx-auto py-24 px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-aagni-indigo font-serif mb-4">
          Built by Engineers, For Builders
        </h2>
        <p className="text-lg text-aagni-indigo/60 font-medium max-w-2xl mx-auto">
          Meet the engineer behind AAGNI AI's architecture, multimodal systems, and AI infrastructure.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Main Profile Card */}
        <div className="developer-glow rounded-[40px] bg-gradient-to-br from-aagni-saffron/10 to-aagni-indigo/10 p-8 md:p-12 relative overflow-hidden border border-white/40 shadow-premium">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl -z-10" />
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
            {/* Image */}
            <div className="shrink-0 relative">
              <div className="w-[280px] h-[280px] rounded-full overflow-hidden border-4 border-white shadow-[0_20px_40px_rgba(35,41,77,0.15)] relative">
                <Image src="/myimage.png" alt="Bhavya Kansal" fill className="object-cover" />
              </div>
              <div className="absolute bottom-6 right-6 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm" />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-aagni-indigo mb-2">Bhavya Kansal</h3>
              <p className="text-aagni-saffron font-semibold mb-6 tracking-wide text-sm uppercase">
                AI/ML Engineer · Full-Stack Developer · Multimodal AI Researcher
              </p>
              <p className="text-aagni-indigo/80 text-lg leading-relaxed mb-8">
                Focused on building scalable AI systems, multilingual language models, computer vision solutions, and production-ready AI infrastructure for Indian users.
              </p>

              {/* Quote */}
              <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm mb-8 relative">
                <div className="absolute -top-4 -left-2 text-4xl text-aagni-saffron/40 font-serif font-black">"</div>
                <p className="text-aagni-indigo font-medium italic relative z-10">
                  The next generation of AI won't be defined by bigger models alone. It will be shaped by systems that understand language, culture, context, and the people they serve.
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['AI Engineering', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Generative AI', 'LLMs', 'NLP', 'Full-Stack Development', 'Cloud Systems', 'API Architecture'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/50 border border-aagni-indigo/5 text-aagni-indigo text-sm font-medium rounded-full hover:bg-white/80 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Collaboration & Contacts) */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 border border-white/40 shadow-premium flex-1">
            <h4 className="text-xl font-bold font-serif text-aagni-indigo mb-2">Collaboration & Research</h4>
            <p className="text-aagni-indigo/60 text-sm mb-6">Open to impactful AI projects, research initiatives, and technical collaborations.</p>
            <ul className="space-y-3 mb-8">
              {['AI Research', 'Open Source Collaboration', 'Startup Partnerships', 'Industry Projects', 'Academic Research', 'AI Infrastructure Development'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-aagni-indigo/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-aagni-saffron" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-aagni-indigo text-white rounded-[32px] p-8 shadow-premium relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
            <h4 className="text-xl font-bold font-serif mb-6 relative z-10">Reach Out</h4>
            <div className="space-y-4 relative z-10">
              <a href="mailto:kansalbhavya27@gmail.com" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors group">
                <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
                <span className="text-sm font-medium">kansalbhavya27@gmail.com</span>
              </a>
              <a href="mailto:multimodexai@gmail.com" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors group">
                <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
                <span className="text-sm font-medium">multimodexai@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
