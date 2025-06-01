import Header from "@/components/header"
import Hero from "@/components/hero"
import FirstLesson from "@/components/first-lesson"
import About from "@/components/about"
import Benefits from "@/components/benefits"
import Testimonials from "@/components/testimonials"
import ContactCta from "@/components/contact-cta"
import Footer from "@/components/footer"
import CitySelector from "@/components/city-selector"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import type { City } from "@/data/cities"

interface PageTemplateProps {
  city: City
}

export default function PageTemplate({ city }: PageTemplateProps) {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(0, 0, 0)"
      gradientBackgroundEnd="rgb(10, 10, 18)"
      firstColor="255, 85, 0"
      secondColor="255, 119, 51"
      thirdColor="255, 153, 102"
      fourthColor="255, 187, 153"
      fifthColor="255, 221, 204"
      pointerColor="255, 85, 0"
      blendingValue="soft-light"
      containerClassName="min-h-screen"
    >
      <Header />
      <CitySelector />
      <main className="min-h-screen">
        <Hero city={city} />
        <FirstLesson />
        <About />
        <Benefits />
        <Testimonials />
        <ContactCta city={city} />
        <Footer />
      </main>
    </BackgroundGradientAnimation>
  )
} 