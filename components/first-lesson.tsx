"use client"

import { useState, useRef, useEffect } from "react"
import { Play } from "lucide-react"
<<<<<<< HEAD
import ImageWithFallback from "./ui/image-with-fallback"
import { useScrollToElement } from "../hooks/use-scroll-to-element"
import { useAnalytics } from "../hooks/use-analytics"
import ContactForm from "./contact-form" // Импортируем компонент формы
=======
import ImageWithFallback from "@/components/ui/image-with-fallback"
import { useScrollToElement } from "@/hooks/use-scroll-to-element"
import { useAnalytics } from "@/hooks/use-analytics"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

export default function FirstLesson() {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoId = "oaUsDCVVmeo"
  const { scrollToElement } = useScrollToElement()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const playVideo = () => {
    setVideoPlaying(true)

    // Отслеживаем воспроизведение видео
    trackEvent("cta_click", "play_video", {
      event_category: "video",
      event_label: videoId,
      video_title: "Первый урок в Не Школе Барабанов",
    })
  }

  const handleCtaClick = () => {
    scrollToElement("contact")

    // Отслеживаем клик по CTA кнопке в секции FirstLesson
    trackEvent("cta_click", "first_lesson_cta", {
      event_category: "cta",
      event_label: "first_lesson",
      cta_text: "Записаться на бесплатный урок",
    })
  }

  return (
    <section ref={sectionRef} id="first-lesson" className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-gray-800 dark:text-white tracking-tight leading-none transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Первый урок — это всегда
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              {" "}
              особенный опыт
            </span>
          </h2>

          {/* Изменяем расположение - сначала текст, потом видео с центрированием */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Текстовый контент */}
            <div className="md:w-1/2 space-y-4 sm:space-y-6 md:space-y-8 order-2 md:order-1">
              <div
                className={`transition-all duration-700 delay-300 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/90 font-light leading-relaxed tracking-tight max-w-xl">
                  На первом уроке ты сыграешь на акустической барабанной установке под руководством настоящего
                  профессионала.
                </p>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/90 font-light leading-relaxed tracking-tight max-w-xl mt-3 sm:mt-4 md:mt-6">
                  Освоишь первые ритмы и брейки, найдёшь новых друзей по интересам. Мы не тратим время на лишние
                  разговоры — сразу играем.
                </p>
              </div>
<<<<<<< HEAD

              <div
                className={`pt-2 sm:pt-3 md:pt-4 transition-all duration-700 delay-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Добавляем форму в секцию FirstLesson */}
                <ContactForm formId="first-lesson-form" source="Секция первого урока" alternativeMessage={true} />
              </div>
=======
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
            </div>

            {/* Видео с YouTube - центрированное */}
            <div
              className={`w-full md:w-3/5 order-1 md:order-2 transition-all duration-700 delay-200 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-gray-200 dark:bg-zinc-900 shadow-2xl">
                {!videoPlaying ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={playVideo}
                    aria-label="Воспроизвести видео"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        playVideo()
                      }
                    }}
                    data-event="cta_click"
                    data-event-category="video"
                    data-event-label="play_video"
                    data-track-cta="play_video"
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110 border border-white/20">
                        <Play size={isMobile ? 20 : 32} className="text-white ml-1 md:ml-0" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                        fallbackSrc={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Превью видео первого урока"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                      />
                    </div>
                  </div>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title="Первый урок в Не Школе Барабанов"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
