'use client'
import { motion } from 'framer-motion'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingFooter } from '@/components/landing/LandingFooter'
import {
  Globe, Mic, FileText, Brain, Shield,
  MessageSquare, Code2, ArrowRight,
  Languages, Eye
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Languages,
    title: 'Multilingual Intelligence',
    desc: 'Fluent in 22+ Indian languages. Understands context, dialects, and cultural nuances across Bharat.',
  },
  {
    icon: Mic,
    title: 'Voice-First AI',
    desc: 'State-of-the-art speech recognition and synthesis — natural conversations in any Indian language.',
  },
  {
    icon: FileText,
    title: 'Document Understanding',
    desc: 'Digitise, extract, and comprehend documents — from Aadhaar to legal contracts — with precision.',
  },
  {
    icon: Brain,
    title: 'Frontier-Class Models',
    desc: 'Powered by cutting-edge foundation models trained on sovereign Indian compute infrastructure.',
  },
  {
    icon: Shield,
    title: 'Sovereign Security',
    desc: 'End-to-end encryption with data processed on sovereign Indian servers. Your data stays in India.',
  },
  {
    icon: Eye,
    title: 'Multimodal Reasoning',
    desc: 'Understands images, documents, audio, and text together — true multimodal intelligence for India.',
  },
]

const platformItems = [
  {
    icon: MessageSquare,
    title: 'Aagni Chat',
    desc: 'Premium conversational AI assistant with deep Indian language understanding and cultural context.',
    tag: 'Consumer',
  },
  {
    icon: Code2,
    title: 'Aagni API',
    desc: 'Production-ready APIs for speech, text, translation, and document intelligence. Scale to millions.',
    tag: 'Developer',
  },
  {
    icon: Globe,
    title: 'Aagni Platform',
    desc: 'Full-stack AI platform for education, healthcare, and governance — built for India at scale.',
    tag: 'Platform',
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: 'easeOut' },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function PlatformPage() {
  return (
    <div className="min-h-screen relative z-10">
      <LandingNavbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A1F3B] mb-6">
            The AAGNI Platform
          </motion.h1>
          <motion.p variants={fadeInUp} custom={2} className="text-[#4A4D5E] text-lg max-w-2xl mx-auto">
            One Platform, Infinite Possibilities. Whether you&apos;re a developer, researcher, or creator — AAGNI AI has the right solution for you.
          </motion.p>
        </motion.div>

        {/* Platform Offerings */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid lg:grid-cols-3 gap-6 mb-24"
        >
          {platformItems.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              custom={i}
              className="bg-white rounded-2xl p-8 flex flex-col shadow-sm border border-black/5 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <item.icon size={24} className="text-[#FF7A1A]" />
                </div>
                <span className="text-[10px] text-[#FF7A1A] bg-[#FF7A1A]/10 px-3 py-1 rounded-full tracking-widest uppercase font-medium">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1F3B] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#4A4D5E] leading-relaxed flex-1">
                {item.desc}
              </p>
              <div className="mt-6 pt-5 border-t border-black/5">
                <Link
                  href="/login"
                  className="text-[#FF7A1A] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                >
                  Get started <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F3B] mb-4 font-serif">
            Built for India&apos;s Scale
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="text-[#4A4D5E] max-w-xl mx-auto text-lg">
            From voice interfaces in Tamil to document processing in Hindi — Aagni AI understands India.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeInUp}
              custom={i}
              className="bg-white rounded-2xl p-7 shadow-sm border border-black/5 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                <f.icon size={24} className="text-[#FF7A1A]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1F3B] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-[#4A4D5E] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LandingFooter />
    </div>
  )
}
