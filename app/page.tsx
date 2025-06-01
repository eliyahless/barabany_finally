import dynamic from "next/dynamic"
import Header from "../components/header"
import Hero from "../components/hero"
import FirstLesson from "../components/first-lesson"
import About from "../components/about"
import CitySelector from "../components/CitySelector"
import { getDefaultCity } from "../data/cities"
// import { PageViewTracker } from "../components/analytics/page-view-tracker" // временно отключено
// import { StructuredData } from "../components/seo/structured-data" // временно отключено
// import StickyCTAButton from "../components/sticky-cta-button" // временно отключено

const Benefits = dynamic(() => import("../components/benefits"), { ssr: true })
const Testimonials = dynamic(() => import("../components/testimonials"), { ssr: true })
const ContactCta = dynamic(() => import("../components/contact-cta"), { ssr: true })
const Footer = dynamic(() => import("../components/footer"), { ssr: true })
const BackgroundGradientAnimation = dynamic(
  () => import("../components/ui/background-gradient-animation"),
  { ssr: true },
)

export const generateMetadata = async () => {
  return {
    alternates: {
      canonical: "https://barabany-neshkola.ru",
      languages: {
        "ru-RU": "https://barabany-neshkola.ru",
      },
    },
  }
}

export default function HomePage() {
  const defaultCity = getDefaultCity()
  return (
    <BackgroundGradientAnimation containerClassName="min-h-screen">
      <Header />
      <div className="mt-3">
        <CitySelector />
      </div>
      <main className="min-h-screen smooth-scroll-container">
        <Hero city={defaultCity} />
        <FirstLesson />
        <About />
        <Benefits />
        <Testimonials />
        <ContactCta city={defaultCity} />
        <Footer />
      </main>
    </BackgroundGradientAnimation>
  )
}
