'use client'
import Image from 'next/image'
import Link from 'next/link'

const footerSections = [
  {
    title: 'Products',
    links: [
      { label: 'Aagni Chat', href: '#' },
      { label: 'Aagni Studio', href: '#' },
      { label: 'Aagni API', href: '#' },
      { label: 'Aagni Voice', href: '#' },
      { label: 'Aagni Translate', href: '#' },
      { label: 'Aagni Edge', href: '#' },
    ],
  },
  {
    title: 'APIs',
    links: [
      { label: 'Text to Speech', href: '#' },
      { label: 'Speech to Text', href: '#' },
      { label: 'Translation', href: '#' },
      { label: 'Document AI', href: '#' },
      { label: 'Language Detection', href: '#' },
      { label: 'Models', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'SDKs', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Trust Center', href: '#' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'X', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer id="footer" className="footer-gradient border-t border-aagni-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-aagni-saffron/20">
                <Image
                  src="/logo.png"
                  alt="Aagni AI"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-aagni-text tracking-tight">
                Aagni AI
              </span>
            </div>
            <p className="text-aagni-muted text-sm mb-6 leading-relaxed max-w-[200px]">
              AI for India starts here.
              <br />
              Built with sovereign compute.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-3 mb-4">
              <div className="glass-landing rounded-lg px-2.5 py-1.5 text-center">
                <p className="text-[9px] text-aagni-muted leading-tight tracking-wider uppercase">ISO</p>
                <p className="text-[10px] text-aagni-subtext font-bold">27001</p>
              </div>
              <div className="glass-landing rounded-lg px-2.5 py-1.5 text-center">
                <p className="text-[9px] text-aagni-muted leading-tight tracking-wider uppercase">SOC 2</p>
                <p className="text-[10px] text-aagni-subtext font-bold">Type 1</p>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-aagni-text text-xs font-bold tracking-wider uppercase mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-aagni-muted hover:text-aagni-text text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-aagni-muted text-xs">
            © {new Date().getFullYear()} Aagni AI Private Limited. All rights reserved.
          </p>
          <p className="text-aagni-muted text-xs text-center md:text-right">
            Built in India 🇮🇳 · Powered by Sovereign Compute
          </p>
        </div>
      </div>
    </footer>
  )
}
