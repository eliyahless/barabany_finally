import { getCityBySlug, cities } from "../../data/cities"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Header from "../../components/header"
import CitySelector from "../../components/CitySelector"
import Hero from "../../components/hero"
import FirstLesson from "../../components/first-lesson"
import About from "../../components/about"
import Benefits from "../../components/benefits"
import Testimonials from "../../components/testimonials"
import ContactCta from "../../components/contact-cta"
import Footer from "../../components/footer"
import dynamic from "next/dynamic"

interface CityPageProps {
  params: {
    city: string
  }
}

const BackgroundGradientAnimation = dynamic(
  () => import("../../components/ui/background-gradient-animation"),
  { ssr: true }
)

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city)

  if (!city) {
    return {
      title: "Страница не найдена | Не Школа",
      description: "Запрашиваемая страница не найдена",
    }
  }

  return {
    title: `Барабаны для взрослых в ${city.name} | Не Школа`,
    description: `Никогда не поздно начать играть на барабанах в ${city.name}. Присоединяйтесь к нашим урокам для взрослых и откройте свой ритм. Запишитесь на бесплатное пробное занятие!`,
    alternates: {
      canonical: `https://barabany-neshkola.ru/${city.slug}`,
    },
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city)

  if (!city) {
    notFound()
  }

  return (
    <BackgroundGradientAnimation containerClassName="min-h-screen">
      <Header />
      <div className="mt-3">
        <CitySelector />
      </div>
      <main className="min-h-screen smooth-scroll-container">
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

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }))
} 