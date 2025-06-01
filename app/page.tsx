<<<<<<< HEAD
import dynamic from "next/dynamic"
import Header from "../components/header"
import Hero from "../components/hero"
import FirstLesson from "../components/first-lesson"
import About from "../components/about"
import { PageViewTracker } from "../components/analytics/page-view-tracker"
import { StructuredData } from "../components/seo/structured-data"
import StickyCTAButton from "../components/sticky-cta-button"

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
=======
import dynamic from 'next/dynamic'
import Header from "@/components/header"
import Hero from "@/components/hero"
import { PageViewTracker } from "@/components/analytics/page-view-tracker"
import { StructuredData } from "@/components/seo/structured-data"
import BackgroundGradientAnimation from "@/components/ui/background-gradient-animation"

// Ленивая загрузка компонентов, которые не видны сразу
const FirstLesson = dynamic(() => import("@/components/first-lesson"), {
  loading: () => <div className="h-96 flex items-center justify-center">Загрузка...</div>
})
const About = dynamic(() => import("@/components/about"))
const Benefits = dynamic(() => import("@/components/benefits"))
const Testimonials = dynamic(() => import("@/components/testimonials"))
const ContactCta = dynamic(() => import("@/components/contact-cta"))
const Footer = dynamic(() => import("@/components/footer"))
const StickyCTAButton = dynamic(() => import("@/components/sticky-cta-button"))

export const generateMetadata = async () => {
  return {
    title: "Школа барабанов в Нешкола - Обучение игре на барабанах",
    description: "Профессиональное обучение игре на барабанах в Нешкола. Индивидуальные и групповые занятия, опытные преподаватели, современное оборудование.",
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
    alternates: {
      canonical: "https://barabany-neshkola.ru",
      languages: {
        "ru-RU": "https://barabany-neshkola.ru",
      },
    },
<<<<<<< HEAD
=======
    openGraph: {
      title: "Школа барабанов в Нешкола - Обучение игре на барабанах",
      description: "Профессиональное обучение игре на барабанах в Нешкола. Индивидуальные и групповые занятия, опытные преподаватели, современное оборудование.",
      url: "https://barabany-neshkola.ru",
      siteName: "Школа барабанов в Нешкола",
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Школа барабанов в Нешкола - Обучение игре на барабанах",
      description: "Профессиональное обучение игре на барабанах в Нешкола. Индивидуальные и групповые занятия, опытные преподаватели, современное оборудование.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
  }
}

export default function Home() {
  return (
    <BackgroundGradientAnimation containerClassName="min-h-screen">
<<<<<<< HEAD
=======
      {/* Структурированные данные для SEO */}
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
      <StructuredData />

      <Header />
      <main className="min-h-screen smooth-scroll-container">
<<<<<<< HEAD
=======
        {/* Компонент для отслеживания просмотра страницы */}
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
        <PageViewTracker />

        <Hero />
        <FirstLesson />
        <About />
        <Benefits />
        <Testimonials />
        <ContactCta />
        <Footer />

<<<<<<< HEAD
=======
        {/* Добавляем липкую кнопку CTA */}
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
        <StickyCTAButton targetId="contact" />
      </main>
    </BackgroundGradientAnimation>
  )
}
