import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { SelectedWorkSection } from '@/components/sections/selected-work-section'
import { FounderSection } from '@/components/sections/founder-section'
import { ExpertiseSection } from '@/components/sections/expertise-section'
import { ProductsSection } from '@/components/sections/products-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SelectedWorkSection />
      <FounderSection />
      <ExpertiseSection />
      <ProductsSection />
      <ContactSection />
    </>
  )
}
