import { prisma } from '@/lib/prisma'
import Hero from '@/components/landing/Hero'
import WhyChooseUs from '@/components/landing/WhyChooseUs'
import ServicesSection from '@/components/landing/ServicesSection'
import PricingSection from '@/components/landing/PricingSection'
import PriceEstimator from '@/components/landing/PriceEstimator'
import CFSaleSection from '@/components/landing/CFSaleSection'
import SystemsSection from '@/components/landing/SystemsSection'
import AboutSection from '@/components/landing/AboutSection'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default async function Home() {
  const systems = await prisma.system.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Hero — headline + price + LINE CTA */}
      <Hero />
      {/* 2. Value props — why no-knowledge users can start */}
      <WhyChooseUs />
      {/* 3. Services — what's included */}
      <ServicesSection />
      {/* 4. Pricing — 4 tiers, Business highlighted */}
      <PricingSection />
      {/* 5. Price estimator — interactive calculator */}
      <PriceEstimator />
      {/* 6. CF-Sale product */}
      <CFSaleSection />
      {/* 7. Portfolio / showcase from DB */}
      <SystemsSection systems={systems} />
      {/* 8. Trust — stats, experience */}
      <AboutSection />
      {/* 9. Final CTA */}
      <CTASection />
      <Footer />
    </div>
  )
}
