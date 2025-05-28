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
    alternates: {
      canonical: "https://barabany-neshkola.ru",
      languages: {
        "ru-RU": "https://barabany-neshkola.ru",
      },
    },
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
