"use client"
import AnimateOnScroll from "./animate-on-scroll"
<<<<<<< HEAD
import { VolumeButton } from "./ui/volume-button"
import { useEffect, useState } from "react"
import { useScrollToElement } from "../hooks/use-scroll-to-element"
import OptimizedImage from "./ui/optimized-image"
import { useAnalytics } from "../hooks/use-analytics"
import ContactForm from "./contact-form" // Импортируем компонент формы
=======
import { VolumeButton } from "@/components/ui/volume-button"
import { useEffect, useState } from "react"
import { useScrollToElement } from "@/hooks/use-scroll-to-element"
import OptimizedImage from "@/components/ui/optimized-image"
import { useAnalytics } from "@/hooks/use-analytics"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

export default function Hero() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const { scrollToElement } = useScrollToElement()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Проверяем, загружены ли шрифты
    if (document.documentElement.classList.contains("fonts-loaded")) {
      setFontsLoaded(true)
    } else {
      // Если нет, добавляем слушатель для отслеживания загрузки
      const checkFontsLoaded = () => {
        if (document.documentElement.classList.contains("fonts-loaded")) {
          setFontsLoaded(true)
        }
      }

      // Проверяем каждые 100ms
      const interval = setInterval(checkFontsLoaded, 100)

      // Устанавливаем таймаут для случая, если шрифты не загрузятся
      const timeout = setTimeout(() => {
        setFontsLoaded(true)
        clearInterval(interval)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [])

  const handleCtaClick = () => {
    scrollToElement("contact")

    // Отслеживаем клик по CTA кнопке в Hero секции
    trackEvent("cta_click", "hero_cta", {
      event_category: "cta",
      event_label: "hero",
      cta_text: "ЗАПИСАТЬСЯ НА БЕСПЛАТНЫЙ УРОК",
    })
  }

  return (
    <section className="relative w-full pt-20 md:pt-24" aria-label="Главный баннер">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className={`transition-opacity duration-300 ${fontsLoaded ? "opacity-100" : "opacity-95"}`}>
            <AnimateOnScroll animation="fade-up">
              <h1 className="font-basis text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-orange-500 dark:text-orange-500 relative z-20 uppercase tracking-tight leading-[1.1] md:leading-tight text-shadow">
                Школа
                <br />
                барабанов для
                <br />
                взрослых в<br />
                <span className="text-gray-800 dark:text-white">Москве</span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 dark:text-white mb-4 sm:mb-6 md:mb-8 max-w-md font-light leading-relaxed">
                Сыграйте любимую песню на барабанах уже на первом уроке!
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="relative inline-block w-full sm:w-auto">
                <VolumeButton
                  variant="primary"
                  size="default"
                  className="rounded-full px-4 sm:px-6 py-3 md:px-8 md:py-4 button-text text-sm md:text-base w-full sm:w-auto"
                  withBorder={true}
                  onClick={handleCtaClick}
                  data-event="cta_click"
                  data-event-category="cta"
                  data-event-label="hero"
                  data-track-cta="hero_cta"
                  aria-label="Записаться на бесплатный урок"
                >
                  ЗАПИСАТЬСЯ НА БЕСПЛАТНЫЙ УРОК
                </VolumeButton>
              </div>
            </AnimateOnScroll>
<<<<<<< HEAD

            {/* Добавляем форму в Hero секцию */}
            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-8 md:mt-12">
                <ContactForm formId="hero-form" source="Hero секция" className="max-w-sm" />
              </div>
            </AnimateOnScroll>
=======
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
          </div>

          <AnimateOnScroll animation="fade-in" delay={300}>
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] rounded-2xl overflow-hidden mt-4 sm:mt-6 md:mt-0 hero-image-placeholder">
              <OptimizedImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF7745.jpg-HlzPqdA0i4bSpHh982QJihgyB6mNd7.jpeg"
                alt="Девушка играет на барабанах в Не Школе Барабанов"
                fill
                className="object-cover"
                priority={true} // Устанавливаем priority для LCP
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhMUFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmzV3YWEtzfNdXDiG2gjLyOx0AA865aTVg+QMvNlE5xCCVbuYDe5J3OfX1pQCj//Z"
                caption="Обучение игре на барабанах для взрослых в Москве"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
