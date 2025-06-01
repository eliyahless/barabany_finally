"use client"

import Image from "next/image"
import AnimateOnScroll from "./animate-on-scroll"
import { VolumeButton } from "./ui/volume-button"
import { useEffect, useState } from "react"
import { scrollToIdWithOffset } from "./utils/scroll"

export default function Hero() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

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

  return (
    <section className="relative w-full pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className={`transition-opacity duration-300 ${fontsLoaded ? "opacity-100" : "opacity-95"}`}>
            <AnimateOnScroll animation="fade-up">
              <h1 className="font-basis text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-orange-500 dark:text-orange-500 relative z-20 uppercase tracking-tight leading-[1.1] md:leading-tight text-shadow">
                Школа
                <br />
                барабанов для
                <br />
                взрослых в<br />
                <span className="text-gray-800 dark:text-white">Москве</span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-white mb-6 md:mb-8 max-w-md font-light leading-relaxed">
                Сыграйте любимую песню на барабанах уже на первом уроке!
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="relative inline-block w-full sm:w-auto">
                <VolumeButton
                  variant="primary"
                  size="default"
                  className="rounded-full px-6 py-3 md:px-8 md:py-4 button-text text-base md:text-lg w-full sm:w-auto"
                  withBorder={true}
                  onClick={() => scrollToIdWithOffset("contact")}
                >
                  ЗАПИСАТЬСЯ НА БЕСПЛАТНЫЙ УРОК
                </VolumeButton>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll animation="fade-in" delay={300}>
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mt-6 md:mt-0 hero-image-placeholder">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF7745.jpg-HlzPqdA0i4bSpHh982QJihgyB6mNd7.jpeg"
                alt="Девушка играет на барабанах"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
