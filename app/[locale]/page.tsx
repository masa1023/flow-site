import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ExpertiseSection } from '@/components/sections/expertise-section'
import { TeamSection } from '@/components/sections/team-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ExpertiseSection />
      <TeamSection />
      <ContactSection />
    </>
  )
}
