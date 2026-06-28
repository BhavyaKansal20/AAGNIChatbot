'use client'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { DeveloperSection } from '@/components/landing/DeveloperSection'

export default function DevelopersPage() {
  return (
    <div className="min-h-screen relative z-10">
      <LandingNavbar />
      <div className="pt-24 pb-12">
        <DeveloperSection />
      </div>
      <LandingFooter />
    </div>
  )
}
