import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import PainPoints from '@/components/landing/PainPoints'
import Benefits from '@/components/landing/Benefits'
import CoursePreview from '@/components/landing/CoursePreview'
import HowItWorks from '@/components/landing/HowItWorks'
import LeadMagnet from '@/components/landing/LeadMagnet'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import Disclaimer from '@/components/landing/Disclaimer'

export default function HomePage() {
  return (
    <main className="bg-scene">
      <Navbar />
      <Hero />
      <PainPoints />
      <Benefits />
      <CoursePreview />
      <HowItWorks />
      <LeadMagnet />
      <Testimonials />
      <FAQ />
      <Disclaimer />
      <Footer />
    </main>
  )
}
