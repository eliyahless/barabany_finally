"use client"

import { useEffect, useState } from "react"
import ImageWithFallback from "./ui/image-with-fallback"
import AnimateOnScroll from "./animate-on-scroll"
import { VolumeButton } from "./ui/volume-button"

export default function Testimonials() {
  const [columns, setColumns] = useState(2)

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(2)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)

    return () => {
      window.removeEventListener("resize", updateColumns)
    }
  }, [])

  const benefits = [
    {
      title: "Играют все",
      subtitle: "Бухгалтеры, предприниматели, студенты. Каждый находит свой ритм.",
    },
    { title: "Опыт не нужен", subtitle: "Музыка доступна каждому — просто приходи. Остальному научим." },
    { title: "Гибкий график.", subtitle: "Занимайся тогда, когда удобно тебе." },
    {
      title: "Выступления на сцене",
      subtitle: "Играем на настоящих концертах с живой аудиторией.",
    },
    {
      title: "Дружеская атмосфера",
      subtitle: "Учиться легко, когда рядом единомышленники.",
    },
    {
      title: "Преподаватели, которые играют.",
      subtitle: "На сцене, в студии, на репетициях. И на уроках.",
    },
  ]

  return (
    <section id="testimonials" className="container mx-auto px-4 py-12 md:py-16 -mt-4 sm:-mt-6 md:-mt-8">
      <AnimateOnScroll animation="fade-up" threshold={0.05} rootMargin="-50px 0px">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-16 text-gray-800 dark:text-white tracking-tight leading-none transition-all duration-700">
          Почему ученики
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
            {" "}
            выбирают нашу школу?
          </span>
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Левая колонка */}
        <AnimateOnScroll animation="fade-up" threshold={0.05} rootMargin="-50px 0px">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden flex flex-col">
            {/* Фоновое изображение */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full">
              <ImageWithFallback
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF6342.jpg-12WChmM8uyomeg4vbEr7YeMgP83nkk.jpeg"
                alt="Барабанщик в красных перчатках"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
              />
              {/* Темный оверлей для лучшей читаемости текста */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
            </div>

            {/* Кнопка CTA под изображением */}
            <div className="mt-4 px-4 pb-4">
              <VolumeButton
                variant="primary"
                size="lg"
                belowImage={true}
                className="w-full rounded-full py-3 text-base md:text-lg md:w-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                ЗАПИСАТЬСЯ НА БЕСПЛАТНЫЙ УРОК
              </VolumeButton>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Правая колонка - сетка карточек */}
        <div className={`grid grid-cols-1 ${columns > 1 ? "sm:grid-cols-2" : ""} gap-3 sm:gap-4`}>
          {benefits.map((benefit, index) => (
            <AnimateOnScroll key={index} animation="fade-up" delay={index * 50} threshold={0.05} rootMargin="-50px 0px">
              <div className="volume-card p-4 sm:p-5 md:p-6 h-full flex flex-col items-center justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 text-center mb-3 md:mb-4">
                  {benefit.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-white text-center leading-relaxed">
                  {benefit.subtitle}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
