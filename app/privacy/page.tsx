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
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, use our services, or communicate with us. This includes:

• **Personal Information:** Name, email address, phone number, organisation name, and billing details when you register for an Aagni AI account or subscribe to our services.

• **Usage Data:** Information about how you interact with our platform, including API call logs, query history, model preferences, session duration, feature usage patterns, and interaction timestamps.

• **Device & Technical Data:** IP address, browser type and version, operating system, device identifiers, screen resolution, referring URLs, and general geographic location derived from your IP address.

• **Content Data:** Text inputs, voice recordings (when using Aagni Voice), documents uploaded for processing (when using Document AI), and translation requests submitted through our platform.

• **Communication Data:** Records of your correspondence with our support team, feedback submissions, and participation in surveys or beta programmes.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect for the following purposes:

• **Service Delivery:** To provide, maintain, and improve the Aagni AI platform, including Aagni Chat, Aagni Studio, Aagni API, Aagni Voice, and Aagni Translate services.

• **Personalisation:** To customise your experience, recommend relevant features, and adapt our AI models to better serve your use case and linguistic preferences.

• **Analytics & Improvement:** To analyse usage trends, monitor platform performance, diagnose technical issues, and develop new features that align with user needs across India's diverse linguistic landscape.

• **Security & Fraud Prevention:** To detect, investigate, and prevent fraudulent transactions, abuse, and other harmful activities that may compromise the integrity of our platform.

• **Communication:** To send you service-related notices, updates about policy changes, security alerts, and, with your consent, promotional materials about new features and offerings.

• **Legal Compliance:** To comply with applicable laws, regulations, and legal processes under Indian jurisdiction, including the Digital Personal Data Protection Act, 2023 (DPDPA).

• **Research & Development:** To conduct research aimed at advancing natural language processing for Indian languages, improving multilingual AI capabilities, and contributing to responsible AI development.`,
  },
  {
    title: '3. Data Storage & Security',
    content: `Aagni AI takes the security of your data seriously. We implement industry-standard technical and organisational measures to protect your information:

• **Encryption:** All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. API keys and sensitive credentials are stored using hardware security modules (HSMs).

• **Infrastructure:** Our primary data centres are located in India (Mumbai and Hyderabad regions) to ensure data sovereignty and compliance with Indian data localisation requirements. We utilise SOC 2 Type II certified cloud infrastructure.

• **Access Controls:** We enforce strict role-based access controls (RBAC), multi-factor authentication for internal systems, and maintain detailed audit logs of all data access events.

• **Security Audits:** We conduct regular penetration testing, vulnerability assessments, and third-party security audits. Our security practices are reviewed quarterly by an independent cybersecurity firm.

• **Incident Response:** We maintain a comprehensive incident response plan and will notify affected users within 72 hours of discovering any data breach, in accordance with DPDPA requirements.`,
  },
  {
    title: '4. Cookies & Tracking',
    content: `We use cookies and similar tracking technologies to enhance your experience on our platform:

• **Essential Cookies:** Required for the basic functionality of our platform, including authentication, session management, and security features. These cannot be disabled.

• **Analytics Cookies:** Help us understand how users interact with our platform, which features are most popular, and where users encounter difficulties. We use privacy-respecting analytics that do not track users across websites.

• **Preference Cookies:** Store your language preferences, theme settings, API configuration defaults, and other customisation choices to provide a consistent experience.

• **Performance Cookies:** Monitor platform performance, load times, and error rates to help us optimise our infrastructure and deliver faster response times.

You can manage your cookie preferences through your browser settings or via the cookie consent banner displayed on your first visit. Note that disabling essential cookies may impair platform functionality.`,
  },
  {
    title: '5. Third-Party Services',
    content: `We may share your information with trusted third-party service providers who assist us in operating our platform:

• **Cloud Infrastructure Providers:** For hosting, computing, and storage services within Indian data centres.

• **Payment Processors:** For processing subscription payments and billing. We use RBI-compliant payment gateways and never store complete payment card details on our servers.

• **Analytics Providers:** For aggregated, anonymised usage analytics to improve our platform. We ensure our analytics partners comply with Indian data protection standards.

• **Communication Services:** For sending transactional emails, SMS notifications, and in-app messages.

• **AI Model Providers:** Certain advanced features may utilise upstream AI model APIs. All data sent to such providers is subject to strict data processing agreements and is not used for training third-party models.

We require all third-party service providers to maintain appropriate security measures and to process personal data only in accordance with our instructions and this Privacy Policy.`,
  },
  {
    title: '6. Your Rights',
    content: `Under the Digital Personal Data Protection Act, 2023 and other applicable regulations, you have the following rights regarding your personal data:

• **Right to Access:** You may request a copy of the personal data we hold about you, including the purposes for which it is being processed.

• **Right to Correction:** You may request correction of inaccurate or incomplete personal data. You can update most of your account information directly through the Aagni Studio dashboard.

• **Right to Erasure:** You may request deletion of your personal data, subject to our legal obligations to retain certain information for compliance, audit, or legitimate business purposes.

• **Right to Data Portability:** You may request your data in a structured, commonly used, and machine-readable format (JSON or CSV).

• **Right to Withdraw Consent:** Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.

• **Right to Grievance Redressal:** You have the right to register a complaint with our Data Protection Officer or with the Data Protection Board of India.

To exercise any of these rights, please contact our Data Protection Officer at dpo@aagni.ai or through the privacy settings in your Aagni AI account.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal data only for as long as necessary to fulfil the purposes outlined in this Privacy Policy:

• **Account Data:** Retained for the duration of your active account and for 90 days following account deletion to facilitate recovery requests.

• **Usage & Analytics Data:** Retained in identifiable form for up to 24 months, after which it is anonymised and aggregated for long-term trend analysis.

• **API Logs:** Request and response logs are retained for 30 days for debugging and support purposes, unless a longer retention period is required by your enterprise agreement.

• **Content Data:** Text inputs, voice recordings, and documents are processed in real time and are not stored beyond the duration of the processing session unless you explicitly opt into conversation history features.

• **Billing & Transaction Records:** Retained for 8 years in compliance with Indian tax and financial regulations.

• **Communication Records:** Support tickets and correspondence are retained for 3 years from the date of resolution.

You may request early deletion of your data at any time, subject to our legal and regulatory obligations.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `Aagni AI services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children.

If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately at privacy@aagni.ai. Upon verification, we will take prompt steps to delete such information from our systems.

In cases where our platform is used in educational settings (such as Aagni for Education programmes), data collection and processing is conducted under the supervision of the educational institution, which acts as the data fiduciary and obtains verifiable parental consent as required under the DPDPA.`,
  },
  {
    title: '9. International Data Transfers',
    content: `Aagni AI is headquartered in India, and our primary data processing operations are conducted within Indian territory. In limited circumstances, your data may be transferred to servers located outside India for the purpose of providing certain platform features or ensuring service redundancy.

Any such transfers are conducted in compliance with the cross-border data transfer provisions of the DPDPA and are subject to appropriate safeguards, including standard contractual clauses, adequacy assessments, and data processing agreements that ensure an equivalent level of data protection.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or regulatory guidance. When we make material changes:

• We will notify you via email to the address associated with your account at least 30 days before the changes take effect.

• We will display a prominent notice on our platform and within the Aagni Studio dashboard.

• We will update the "Last Updated" date at the top of this policy.

Your continued use of our services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this policy periodically.`,
  },
  {
    title: '11. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

• **Email:** privacy@aagni.ai
• **Data Protection Officer:** dpo@aagni.ai
• **Registered Office:** Aagni AI Technologies Pvt. Ltd., Koramangala, Bengaluru, Karnataka 560095, India
• **Grievance Officer:** grievance@aagni.ai (responses within 48 hours)

For urgent data protection concerns, you may also reach our 24/7 security team at security@aagni.ai.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Override body overflow for this page */}
      <style>{`body { overflow: auto !important; }`}</style>

      <div className="min-h-screen" style={{ background: '#090910', fontFamily: "'Times New Roman', Times, serif" }}>
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
                  background: 'rgba(255, 107, 0, 0.1)',
                  border: '1px solid rgba(255, 107, 0, 0.25)',
                  color: '#FF8C00',
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
                Privacy Policy
              </h1>
              <p
                className="text-lg"
                style={{ color: '#8888a8', fontFamily: "'Times New Roman', Times, serif" }}
              >
                Last updated: June 19, 2026
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
                At Aagni AI Technologies Pvt. Ltd. (&ldquo;Aagni AI&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;),
                we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy
                Policy explains how we collect, use, store, and protect information when you use our artificial intelligence
                platform and related services, including Aagni Chat, Aagni Studio, Aagni API, Aagni Voice, and Aagni
                Translate (collectively, the &ldquo;Services&rdquo;).
              </p>
              <p
                className="text-base leading-relaxed mt-4"
                style={{ color: '#c0c0d0', fontFamily: "'Times New Roman', Times, serif", lineHeight: 1.8 }}
              >
                This policy applies to all users of our Services, including individual users, developers, and enterprise
                clients. By accessing or using our Services, you acknowledge that you have read and understood this Privacy
                Policy. We comply with the Digital Personal Data Protection Act, 2023 (DPDPA) and all applicable Indian
                data protection regulations.
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
                        .replace(/•/g, '<span style="color: #FF6B00;">•</span>'),
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

              {/* Products */}
              <div>
                <h4 className="text-sm font-bold mb-4" style={{ color: '#FF8C00' }}>Products</h4>
                <ul className="space-y-2.5">
                  {['Aagni Chat', 'Aagni Studio', 'Aagni API', 'Aagni Voice', 'Aagni Translate'].map((item) => (
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

              {/* APIs */}
              <div>
                <h4 className="text-sm font-bold mb-4" style={{ color: '#FF8C00' }}>APIs</h4>
                <ul className="space-y-2.5">
                  {['Text to Speech', 'Speech to Text', 'Translation', 'Document AI', 'Language Detection'].map(
                    (item) => (
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
                    )
                  )}
                </ul>
              </div>

              {/* Developers */}
              <div>
                <h4 className="text-sm font-bold mb-4" style={{ color: '#FF8C00' }}>Developers</h4>
                <ul className="space-y-2.5">
                  {['Documentation', 'API Pricing', 'Integrations', 'SDKs'].map((item) => (
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

              {/* Company */}
              <div>
                <h4 className="text-sm font-bold mb-4" style={{ color: '#FF8C00' }}>Company</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'About Us', href: '#' },
                    { label: 'Careers', href: '#' },
                    { label: 'Contact Us', href: '#' },
                    { label: 'Blog', href: '#' },
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
