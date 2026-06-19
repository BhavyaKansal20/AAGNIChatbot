'use client'
import { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Globe, Mic, FileText, Brain, Shield, Zap,
  MessageSquare, Code2, Building2, ArrowRight,
  Sparkles, Languages, Eye, Lock
} from 'lucide-react'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingFooter } from '@/components/landing/LandingFooter'

/* ---- Animation variants ---- */
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

/* ---- Data ---- */
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
    title: 'Enterprise Security',
    desc: 'SOC 2 compliant, end-to-end encryption. Your data stays in India, processed on sovereign servers.',
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
    icon: Building2,
    title: 'Aagni Enterprise',
    desc: 'Custom AI deployments for government, healthcare, finance, and education — built for India at scale.',
    tag: 'Enterprise',
  },
]

const stats = [
  { value: '22+', label: 'Indian Languages' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<100ms', label: 'API Latency' },
  { value: '10M+', label: 'API Calls/Day' },
]

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  /* Enable scrolling on landing page */
  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => document.body.classList.remove('landing-page')
  }, [])

  return (
    <div className="min-h-screen bg-aagni-bg">
      <LandingNavbar />

      {/* ========== HERO ========== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-indian-hero"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-aagni-saffron/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aagni-gold/5 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-landing rounded-full px-5 py-2 mb-8"
          >
            <Sparkles size={14} className="text-aagni-saffron" />
            <span className="text-xs text-aagni-subtext tracking-widest uppercase">
              India&apos;s Sovereign AI Platform
            </span>
            <Sparkles size={14} className="text-aagni-gold" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-aagni-text leading-[1.05] mb-6"
          >
            AI for all
            <br />
            <span className="text-saffron-gradient">from India</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-lg sm:text-xl text-aagni-subtext max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Built on sovereign compute. Powered by frontier-class models.
            <br className="hidden sm:block" />
            Delivering population-scale impact across Bharat.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/login"
              className="btn-saffron px-8 py-3.5 rounded-full text-base font-medium flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#platform"
              className="btn-outline-saffron px-8 py-3.5 rounded-full text-base font-medium"
            >
              Explore Platform
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-20 glass-landing rounded-2xl px-8 py-6 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-saffron-gradient">
                    {stat.value}
                  </p>
                  <p className="text-xs text-aagni-muted mt-1 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border border-aagni-muted/40 flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-aagni-saffron/60" />
          </div>
        </motion.div>
      </motion.section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="relative py-24 lg:py-32 bg-indian-gradient-soft">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-aagni-saffron text-sm tracking-widest uppercase mb-3"
            >
              Capabilities
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aagni-text mb-4"
            >
              Built for <span className="text-saffron-gradient">India&apos;s</span> Scale
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-aagni-subtext max-w-xl mx-auto"
            >
              From voice interfaces in Tamil to document processing in Hindi — 
              Aagni AI understands India.
            </motion.p>
          </motion.div>

          {/* Feature grid */}
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
                className="glass-landing glass-landing-hover rounded-2xl p-7 transition-all duration-500 group cursor-default"
              >
                <div className="icon-circle mb-5 group-hover:scale-110 transition-transform duration-500">
                  <f.icon size={24} className="text-aagni-saffron" />
                </div>
                <h3 className="text-lg font-bold text-aagni-text mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-aagni-subtext leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ========== PLATFORM ========== */}
      <section id="platform" className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-aagni-saffron text-sm tracking-widest uppercase mb-3"
            >
              Platform
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aagni-text mb-4"
            >
              One Platform, <span className="text-saffron-gradient">Infinite</span> Possibilities
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-aagni-subtext max-w-xl mx-auto"
            >
              Whether you&apos;re a developer, enterprise, or end user — Aagni AI has the right solution for you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-6"
          >
            {platformItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={i}
                className="glass-landing glass-landing-hover rounded-2xl p-8 flex flex-col transition-all duration-500 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="icon-circle group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={24} className="text-aagni-saffron" />
                  </div>
                  <span className="text-[10px] text-aagni-saffron bg-aagni-saffron/10 px-3 py-1 rounded-full tracking-widest uppercase font-medium">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-aagni-text mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-aagni-subtext leading-relaxed flex-1">
                  {item.desc}
                </p>
                <div className="mt-6 pt-5 border-t border-aagni-border">
                  <Link
                    href="/login"
                    className="text-aagni-saffron text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                  >
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ========== DEVELOPER SECTION ========== */}
      <section id="developer" className="relative py-24 lg:py-32 bg-indian-gradient-soft">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-aagni-saffron text-sm tracking-widest uppercase mb-3"
            >
              The Builder
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold text-aagni-text"
            >
              Meet the <span className="text-saffron-gradient">Developer</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-landing rounded-3xl p-8 sm:p-12 developer-glow"
          >
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-aagni-saffron/40 ring-offset-4 ring-offset-aagni-bg">
                  <Image
                    src="/myimage.png"
                    alt="Bhavya Kansal"
                    width={176}
                    height={176}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                {/* Active dot */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-aagni-green rounded-full border-[3px] border-aagni-bg" />
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-aagni-text mb-1">
                  Bhavya Kansal
                </h3>
                <p className="text-aagni-saffron text-sm font-medium tracking-wide mb-4">
                  Founder & Developer · Aagni AI
                </p>
                <p className="text-aagni-subtext text-sm leading-relaxed mb-6 max-w-lg">
                  Building India&apos;s next-generation AI infrastructure from the ground up —
                  from fine-tuning multilingual models to architecting production-grade APIs
                  that serve millions. Passionate about making AI accessible to every Indian
                  in their own language.
                </p>

                {/* Tech thought */}
                <div className="glass-landing rounded-xl px-6 py-4 border-l-2 border-aagni-saffron">
                  <p className="text-aagni-text text-sm italic leading-relaxed">
                    &ldquo;The future of AI isn&apos;t built in silos — it&apos;s forged at the intersection
                    of sovereign compute, cultural intelligence, and relentless engineering.
                    India doesn&apos;t just consume AI; India builds it.&rdquo;
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5 justify-center sm:justify-start">
                  {['Full-Stack AI', 'Systems Architecture', 'NLP Research', 'Cloud Infrastructure'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-aagni-muted bg-white/5 border border-aagni-border px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-aagni-saffron/8 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aagni-text mb-5">
              Ready to build with
              <br />
              <span className="text-saffron-gradient">Aagni AI</span>?
            </h2>
            <p className="text-aagni-subtext text-lg mb-10 max-w-xl mx-auto">
              Join thousands of developers and enterprises using India&apos;s
              most advanced AI platform. Start building today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="btn-saffron px-10 py-4 rounded-full text-base font-medium flex items-center gap-2 group"
              >
                Start Building — Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#"
                className="btn-outline-saffron px-10 py-4 rounded-full text-base font-medium"
              >
                Talk to Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <LandingFooter />
    </div>
  )
}
