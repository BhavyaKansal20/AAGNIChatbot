'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Mic,
  Eye,
  FileText,
  Code2,
  Terminal,
  Zap,
} from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const gettingStartedSteps = [
  {
    num: '01',
    title: 'Sign In',
    desc: 'Log in using Google or GitHub to access the AAGNI AI dashboard.',
  },
  {
    num: '02',
    title: 'Explore Capabilities',
    desc: 'Use the Chat, Voice, Document, and Vision modules directly from the dashboard.',
  },
  {
    num: '03',
    title: 'Open Source',
    desc: 'Clone the repository and run it locally. AAGNI is fully open source.',
  },
];

const apis = [
  {
    icon: MessageSquare,
    title: 'Chat Assistant',
    desc: 'Conversational AI with streaming, contextual memory, and multilingual support.',
    color: 'text-[#FF7A1A]',
    bg: 'bg-[#FF7A1A]/10',
  },
  {
    icon: Mic,
    title: 'Voice Interface',
    desc: 'Real-time speech-to-text and text-to-speech for seamless voice conversations.',
    color: 'text-[#FF7A1A]',
    bg: 'bg-[#FF7A1A]/10',
  },
  {
    icon: Eye,
    title: 'Vision AI',
    desc: 'Image understanding, optical character recognition (OCR), and visual analysis.',
    color: 'text-[#FF7A1A]',
    bg: 'bg-[#FF7A1A]/10',
  },
  {
    icon: FileText,
    title: 'Document AI',
    desc: 'Extract, summarise, and query PDFs, spreadsheets, and scanned documents.',
    color: 'text-[#FF7A1A]',
    bg: 'bg-[#FF7A1A]/10',
  },
];

export default function DocsPage() {
  useEffect(() => {
    document.body.style.backgroundColor = '#FBF8F3';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen font-serif relative z-10">
      <LandingNavbar />

      {/* Hero Header */}
      <div className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F3B] tracking-tight mb-6"
        >
          Documentation & Resources
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg md:text-xl text-[#4A4D5E] font-sans max-w-2xl mx-auto"
        >
          Everything you need to know about using India's open-source AI platform.
        </motion.p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        {/* Quick Start Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 mb-32"
        >
          {gettingStartedSteps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              custom={i}
              className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm"
            >
              <span className="text-[#FF7A1A] text-xl font-bold font-sans mb-4 block">
                {step.num}
              </span>
              <h3 className="text-2xl font-bold text-[#1A1F3B] mb-3">{step.title}</h3>
              <p className="text-[#4A4D5E] font-sans text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Capabilities */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="mb-32"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1F3B] tracking-tight mb-4">
              Platform Capabilities
            </h2>
            <p className="text-[#4A4D5E] font-sans max-w-2xl mx-auto">
              Explore the core modules of the AAGNI AI dashboard.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {apis.map((api, i) => (
              <motion.div
                key={api.title}
                variants={fadeUp}
                custom={i}
                className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow group flex items-start gap-6"
              >
                <div className={`w-14 h-14 rounded-2xl ${api.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <api.icon className={`w-7 h-7 ${api.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1F3B] mb-2">{api.title}</h3>
                  <p className="text-[#4A4D5E] font-sans text-sm leading-relaxed mb-4">
                    {api.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <LandingFooter />
    </div>
  );
}
