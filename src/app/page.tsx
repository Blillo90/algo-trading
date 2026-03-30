import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import CoursePreview from '@/components/landing/CoursePreview'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'

export default function HomePage() {
  return (
    <main className="bg-[#030810]">
      <Navbar />
      <Hero />
      <Benefits />
      <CoursePreview />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
