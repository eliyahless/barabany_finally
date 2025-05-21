import dynamic from "next/dynamic"
import Header from "@/components/header"
import Hero from "@/components/hero"
import FirstLesson from "@/components/first-lesson"
import About from "@/components/about"
import { PageViewTracker } from "@/components/analytics/page-view-tracker"
import { StructuredData } from "@/components/seo/structured-data"
import StickyCTAButton from "@/components/sticky-cta-button"

const Benefits = dynamic(() => import("@/components/benefits"), { ssr: true })
const Testimonials = dynamic(() => import("@/components/testimonials"), { ssr: true })
const ContactCta = dynamic(() => import("@/components/contact-cta"), { ssr: true })
const Footer = dynamic(() => import("@/components/footer"), { ssr: true })
const BackgroundGradientAnimation = dynamic(
  () => import("@/components/ui/background-gradient-animation").then((mod) => mod.BackgroundGradientAnimation),
  { ssr: true },
)

export const generateMetadata = async () => {
  return {
    alternates: {
      canonical: "https://neshkola.ru",
      languages: {
        "ru-RU": "https://neshkola.ru",
      },
    },
  }
}

export default function Home() {
  return (
    <BackgroundGradientAnimation containerClassName="min-h-screen">
      {/* Структурированные данные для SEO */}
      <StructuredData />

      <Header />
      <main className="min-h-screen smooth-scroll-container">
        {/* Компонент для отслеживания просмотра страницы */}
        <PageViewTracker />

        <Hero />
        <FirstLesson />
        <About />
        <Benefits />
        <Testimonials />
        <ContactCta />
        <Footer />

        {/* Добавляем липкую кнопку CTA */}
        <StickyCTAButton targetId="contact" />
      </main>
    </BackgroundGradientAnimation>
  )
}
