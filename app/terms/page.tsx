'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
  }),
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing, browsing, or using the Aagni AI platform and any associated services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms"). If you are using the Services on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation to these Terms.

If you do not agree with any part of these Terms, you must not access or use the Services. Your continued use of the Services following the posting of any changes to these Terms constitutes your acceptance of such changes.

These Terms constitute a legally binding agreement between you and Aagni AI Technologies Pvt. Ltd., a company incorporated under the laws of India with its registered office in Bengaluru, Karnataka.`,
  },
  {
    title: '2. Description of Service',
    content: `Aagni AI provides a suite of artificial intelligence products and services designed for India's diverse linguistic and cultural landscape:

• **Aagni Chat:** A multimodal conversational AI assistant supporting 10+ Indian languages with real-time text, voice, and image-based interactions.

• **Aagni Studio:** A comprehensive dashboard for managing AI workflows, fine-tuning models, monitoring usage analytics, and configuring API integrations.

• **Aagni API:** RESTful and gRPC APIs providing programmatic access to our AI capabilities, including text generation, translation, speech synthesis, speech recognition, and document processing.

• **Aagni Voice:** An advanced text-to-speech and speech-to-text service with support for natural-sounding voices in multiple Indian languages, dialects, and speaking styles.

• **Aagni Translate:** A neural machine translation service supporting translation between 22 scheduled Indian languages and 50+ global languages, with domain-specific terminology support.

We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice.`,
  },
  {
    title: '3. User Accounts',
    content: `To access certain features of the Services, you must create an Aagni AI account. When creating your account, you agree to:

• Provide accurate, current, and complete information during the registration process.

• Maintain and promptly update your account information to keep it accurate, current, and complete.

• Maintain the confidentiality of your account credentials, including your password and API keys.

• Accept responsibility for all activities that occur under your account, whether or not authorised by you.

• Immediately notify us at security@aagni.ai of any unauthorised use of your account or any other breach of security.

We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, outdated, or incomplete, or if we have reasonable grounds to suspect fraudulent, abusive, or illegal activity.`,
  },
  {
    title: '4. Acceptable Use Policy',
    content: `You agree to use the Services only for lawful purposes and in accordance with these Terms. You shall not use the Services to:

• Generate, distribute, or store content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable under Indian law.

• Impersonate any person or entity, or falsely claim an affiliation with any person or entity.

• Attempt to gain unauthorised access to any portion of the Services, other users' accounts, or any systems or networks connected to the Services.

• Use the Services to develop competing AI products or services, or to reverse-engineer, decompile, or disassemble our AI models, algorithms, or proprietary technology.

• Transmit any viruses, worms, trojans, or other malicious code through the Services.

• Use automated means (including bots, scrapers, or crawlers) to access or interact with the Services beyond the scope of authorised API usage.

• Generate content that promotes communal disharmony, religious hatred, or violates the Information Technology Act, 2000 and its amendments.

• Use the Services to create deepfakes, synthetic media designed to deceive, or content that violates election laws or integrity regulations.

Violation of this Acceptable Use Policy may result in immediate suspension or termination of your account and may be reported to the appropriate law enforcement authorities.`,
  },
  {
    title: '5. Intellectual Property',
    content: `**Our Intellectual Property:**
The Services, including all software, algorithms, AI models, user interfaces, designs, documentation, trademarks, logos, and content created by Aagni AI, are the exclusive property of Aagni AI Technologies Pvt. Ltd. and are protected by Indian and international intellectual property laws, including the Copyright Act, 1957, the Trade Marks Act, 1999, and the Patents Act, 1970.

**Your Content:**
You retain all rights to the content you input into the Services ("User Content"). By using the Services, you grant Aagni AI a limited, non-exclusive, royalty-free licence to process your User Content solely for the purpose of providing the Services to you.

**Generated Output:**
Content generated by our AI models in response to your inputs ("Generated Output") is provided to you for your use in accordance with these Terms and your subscription plan. You are responsible for reviewing and verifying Generated Output before use, as AI-generated content may contain inaccuracies.

**No Training on User Data:**
We do not use your User Content or Generated Output to train our AI models unless you explicitly opt in to our model improvement programme and provide affirmative consent.`,
  },
  {
    title: '6. API Usage & Rate Limits',
    content: `Access to the Aagni API is subject to the following terms:

• **Authentication:** All API requests must be authenticated using valid API keys issued through the Aagni Studio dashboard. API keys are confidential and must not be shared, published, or embedded in client-side code.

• **Rate Limits:** API usage is subject to rate limits based on your subscription tier:
  — Free Tier: 100 requests per minute, 1,000 requests per day
  — Pro Tier: 1,000 requests per minute, 50,000 requests per day

• **Fair Use:** We reserve the right to throttle or suspend API access if usage patterns indicate abuse, automated misuse, or activity that degrades service quality for other users.

• **SLA:** Pro tier subscribers are covered by our Service Level Agreement, which guarantees 99.9% API uptime, measured monthly, excluding scheduled maintenance windows.

• **Versioning:** We maintain backward compatibility for API versions for a minimum of 12 months after a new version is released. Deprecated API versions will be announced at least 6 months before end-of-life.

• **Billing:** API usage beyond your included quota is billed at the per-unit rates published on our pricing page. All charges are in Indian Rupees (INR) and are subject to applicable GST.`,
  },
  {
    title: '7. Payment & Billing',
    content: `If you subscribe to a paid tier of the Services:

• **Subscription Fees:** Fees are billed in advance on a monthly or annual basis, depending on your chosen billing cycle. All fees are quoted in Indian Rupees (INR) and are exclusive of applicable Goods and Services Tax (GST).

• **Payment Methods:** We accept payment via credit cards, debit cards, UPI, and net banking. All payments are processed through RBI-compliant payment gateways.

• **Auto-Renewal:** Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date through the Aagni Studio dashboard or by contacting billing@aagni.ai.

• **Refund Policy:** Annual subscription fees are refundable on a pro-rata basis within the first 30 days of the billing period. Monthly subscriptions are non-refundable.

• **Overages:** Usage exceeding your subscription quota will be charged at the applicable overage rates. You will receive automated notifications at 80% and 100% of your quota.

• **Invoice & Tax Compliance:** GST-compliant invoices are generated automatically and available in the Aagni Studio dashboard.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:

• Aagni AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, business opportunities, or goodwill, arising out of or in connection with your use of or inability to use the Services.

• Our total aggregate liability for any claims arising under these Terms shall not exceed the amount you paid to us for the Services during the twelve (12) months immediately preceding the event giving rise to the claim.

• We do not warrant that the Services will be uninterrupted, error-free, or free from harmful components. AI-generated outputs are provided "as is" and may contain inaccuracies, biases, or errors. You are solely responsible for evaluating the accuracy and suitability of any Generated Output.

• We shall not be liable for any damages arising from force majeure events, including but not limited to natural disasters, pandemics, government actions, or failures of third-party infrastructure providers.

These limitations apply regardless of the legal theory upon which a claim is based, whether in contract, tort (including negligence), strict liability, or otherwise, and even if Aagni AI has been advised of the possibility of such damages.`,
  },
  {
    title: '9. Indemnification',
    content: `You agree to indemnify, defend, and hold harmless Aagni AI Technologies Pvt. Ltd., its directors, officers, employees, agents, and affiliates from and against any and all claims, demands, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in connection with:

• Your use of the Services in violation of these Terms or any applicable law.

• User Content you submit, post, or transmit through the Services.

• Your violation of any third-party rights, including intellectual property rights, privacy rights, or contractual obligations.

• Any application, product, or service you build using the Aagni API that causes harm to third parties.

• Your negligence or wilful misconduct in connection with the Services.

This indemnification obligation will survive the termination of your account and these Terms.`,
  },
  {
    title: '10. Termination',
    content: `**By You:** You may terminate your account and stop using the Services at any time by submitting a deletion request through the Aagni Studio dashboard or by emailing support@aagni.ai. Upon termination, your access to the Services will cease, and we will delete your account data in accordance with our Privacy Policy.

**By Us:** We may suspend or terminate your access to the Services, in whole or in part, at any time and for any reason, including:

• Violation of these Terms or the Acceptable Use Policy.
• Non-payment of subscription fees beyond a 15-day grace period.
• Fraudulent, illegal, or abusive activity.
• Extended inactivity (accounts with no activity for 12 consecutive months).
• Cessation of the Services or any part thereof.

**Effect of Termination:** Upon termination, your right to use the Services ceases immediately. Sections relating to Intellectual Property, Limitation of Liability, Indemnification, Governing Law, and Dispute Resolution shall survive termination.

**Data Export:** You may request an export of your data in a machine-readable format within 30 days of termination. After this period, all data will be permanently deleted, subject to our legal retention obligations.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.

The courts located in Bengaluru, Karnataka, India shall have exclusive jurisdiction over any disputes arising out of or relating to these Terms or the Services.

For users accessing the Services from outside India, you agree that Indian law governs these Terms and that any dispute will be resolved in the courts of Bengaluru, Karnataka. You waive any objections to such jurisdiction on the grounds of venue or inconvenient forum.

Nothing in these Terms shall limit any rights that you may have under applicable consumer protection laws that cannot be waived by contract.`,
  },
  {
    title: '12. Dispute Resolution',
    content: `Before initiating any formal legal proceedings, you agree to first attempt to resolve any dispute or claim arising out of these Terms through the following process:

• **Step 1 — Informal Resolution:** Contact our legal team at legal@aagni.ai with a detailed description of your concern. We will endeavour to resolve the matter within 30 business days through good-faith negotiation.

• **Step 2 — Mediation:** If informal resolution is unsuccessful, either party may initiate mediation through a mutually agreed-upon mediator in Bengaluru, Karnataka. The costs of mediation shall be shared equally between the parties.

• **Step 3 — Arbitration:** If mediation fails to resolve the dispute within 60 days, the matter shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996, as amended. The arbitration shall be conducted by a sole arbitrator appointed by the Karnataka High Court, and the proceedings shall be held in Bengaluru, Karnataka, in the English language.

• **Class Action Waiver:** You agree to resolve disputes with us on an individual basis and waive any right to participate in class action lawsuits or class-wide arbitration, to the extent permitted by law.

This dispute resolution clause shall survive the termination of these Terms.`,
  },
  {
    title: '13. Changes to Terms',
    content: `We reserve the right to modify these Terms at any time. When we make material changes:

• We will provide at least 30 days' advance notice via email to the address associated with your account.

• We will display a prominent notice on our platform and within the Aagni Studio dashboard.

• We will update the "Effective Date" at the top of these Terms.

If you do not agree with the modified Terms, you must stop using the Services before the changes take effect and may request a pro-rata refund for any prepaid, unused subscription period.

Your continued use of the Services after the effective date of the modified Terms constitutes your acceptance of the changes.`,
  },
  {
    title: '14. Miscellaneous',
    content: `• **Entire Agreement:** These Terms, together with our Privacy Policy, constitute the entire agreement between you and Aagni AI regarding the Services and supersede all prior agreements and understandings.

• **Severability:** If any provision of these Terms is held to be unenforceable or invalid, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect.

• **Waiver:** Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.

• **Assignment:** You may not assign or transfer your rights under these Terms without our prior written consent. We may freely assign our rights and obligations under these Terms.

• **Force Majeure:** We shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including natural disasters, pandemics, acts of government, network failures, or other force majeure events.

• **Notices:** All legal notices to Aagni AI must be sent to legal@aagni.ai or by registered post to our registered office address.`,
  },
  {
    title: '15. Contact Us',
    content: `For any questions, concerns, or feedback regarding these Terms and Conditions, please contact us:

• **Email:** legal@aagni.ai
• **General Support:** support@aagni.ai
• **Registered Office:** Aagni AI Technologies Pvt. Ltd., Koramangala, Bengaluru, Karnataka 560095, India
• **Billing Enquiries:** billing@aagni.ai`,
  },
]

export default function TermsPage() {
  return (
    <>
      {/* Override body overflow for this page */}
      <style>{`body { overflow: auto !important; }`}</style>

      <div className="min-h-screen relative z-10" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        {/* ═══════════════ NAVBAR ═══════════════ */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 glass"
          style={{
            borderBottom: '1px solid rgba(255, 107, 0, 0.12)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image src="/logo.png" alt="Aagni AI" width={40} height={40} className="rounded-lg" />
              <span
                className="text-xl font-bold text-saffron-gradient"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Aagni AI
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Platform', 'Developers', 'Company'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{
                    color: '#8888a8',
                    fontFamily: "'Times New Roman', Times, serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF8C00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8888a8')}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm rounded-lg transition-all duration-200"
                style={{
                  color: '#c0c0d0',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  fontFamily: "'Times New Roman', Times, serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.6)'
                  e.currentTarget.style.color = '#FF8C00'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.25)'
                  e.currentTarget.style.color = '#c0c0d0'
                }}
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00, #FF8C00)',
                  color: '#0a0a12',
                  fontFamily: "'Times New Roman', Times, serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00, #D4A017)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 107, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B00, #FF8C00)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>

        {/* ═══════════════ MAIN CONTENT ═══════════════ */}
        <main className="pt-28 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-16 text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: 'rgba(26, 35, 126, 0.15)',
                  border: '1px solid rgba(40, 53, 147, 0.35)',
                  color: '#7986CB',
                  letterSpacing: '0.1em',
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                LEGAL
              </motion.div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-4 text-saffron-gradient"
                style={{ fontFamily: "'Times New Roman', Times, serif", lineHeight: 1.2 }}
              >
                Terms &amp; Conditions
              </h1>
              <p
                className="text-lg"
                style={{ color: '#8888a8', fontFamily: "'Times New Roman', Times, serif" }}
              >
                Effective date: June 19, 2026
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 mb-10"
            >
              <p
                className="text-base leading-relaxed"
                style={{ color: '#c0c0d0', fontFamily: "'Times New Roman', Times, serif", lineHeight: 1.8 }}
              >
                Welcome to Aagni AI. These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
                products, services, and applications (collectively, the &ldquo;Services&rdquo;) provided by Aagni AI Technologies
                Pvt. Ltd. (&ldquo;Aagni AI&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a company registered under the Companies Act, 2013, with
                its registered office in Bengaluru, Karnataka, India.
              </p>
              <p
                className="text-base leading-relaxed mt-4"
                style={{ color: '#c0c0d0', fontFamily: "'Times New Roman', Times, serif", lineHeight: 1.8 }}
              >
                Please read these Terms carefully before using our Services. By creating an account, accessing our API, or
                using any part of the platform, you agree to these Terms and our{' '}
                <Link href="/privacy" style={{ color: '#FF8C00', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>
                , which is incorporated herein by reference. These Terms apply to all visitors, users, and developers of the Services.
              </p>
            </motion.div>

            {/* Sections */}
            {sections.map((section, index) => (
              <motion.section
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeIn}
                className="mb-8"
              >
                <div
                  className="glass rounded-2xl p-8 transition-all duration-300"
                  style={{ cursor: 'default' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.3)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(30, 30, 48, 0.8)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <h2
                    className="text-xl font-bold mb-5"
                    style={{
                      color: '#FF8C00',
                      fontFamily: "'Times New Roman', Times, serif",
                    }}
                  >
                    {section.title}
                  </h2>
                  <div
                    className="text-base leading-relaxed whitespace-pre-line"
                    style={{
                      color: '#a8a8c0',
                      fontFamily: "'Times New Roman', Times, serif",
                      lineHeight: 1.85,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: section.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #e0e0f0;">$1</strong>')
                        .replace(/•/g, '<span style="color: #FF6B00;">•</span>')
                        .replace(/—/g, '<span style="color: #FF6B00;">—</span>'),
                    }}
                  />
                </div>
              </motion.section>
            ))}
          </div>
        </main>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer
          style={{
            background: 'linear-gradient(180deg, #090910 0%, #0d0d18 40%, rgba(26, 35, 126, 0.08) 100%)',
            borderTop: '1px solid rgba(255, 107, 0, 0.1)',
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
              {/* Brand Column */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/logo.png" alt="Aagni AI" width={32} height={32} className="rounded-lg" />
                  <span className="text-lg font-bold text-saffron-gradient">Aagni AI</span>
                </div>
                <p className="text-sm mb-4" style={{ color: '#6b6b88', lineHeight: 1.6 }}>
                  AI for India starts here.
                </p>
                <p className="text-xs" style={{ color: '#4a4a64' }}>
                  © 2026 Aagni AI Technologies Pvt. Ltd.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-sm font-bold mb-4" style={{ color: '#FF8C00' }}>Legal</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Privacy Policy', href: '/privacy' },
                    { label: 'Terms of Service', href: '/terms' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: '#6b6b88' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#c0c0d0')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6b88')}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials */}
              <div>
                <h4 className="text-sm font-bold mb-4" style={{ color: '#FF8C00' }}>Socials</h4>
                <ul className="space-y-2.5">
                  {['LinkedIn', 'X', 'YouTube', 'GitHub', 'Discord'].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm transition-colors duration-200"
                        style={{ color: '#6b6b88' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#c0c0d0')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6b88')}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{ borderTop: '1px solid rgba(255, 107, 0, 0.08)' }}
            >
              <p className="text-xs" style={{ color: '#4a4a64' }}>
                Built with ❤️ in India for the world.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-xs transition-colors duration-200"
                  style={{ color: '#4a4a64' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF8C00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4a4a64')}
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs transition-colors duration-200"
                  style={{ color: '#4a4a64' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF8C00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4a4a64')}
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
