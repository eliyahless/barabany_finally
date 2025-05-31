"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AnimateOnScroll from "./animate-on-scroll"
import ImageWithFallback from "@/components/ui/image-with-fallback"
import { Plus } from "lucide-react"

export default function ContactCta() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  const [isMobile, setIsMobile] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    alert("Спасибо за интерес! Мы свяжемся с вами в ближайшее время для планирования бесплатного пробного урока.")
  }

  return (
    <section id="contact" className="container mx-auto px-4 py-12 md:py-16 lg:py-24 safe-bottom">
      <AnimateOnScroll animation="fade-up" threshold={0.05} rootMargin="-50px 0px">
        <div className="bg-white dark:bg-zinc-900 border-2 border-orange-500 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Левая колонка - контент и форма */}
            <div className="p-4 sm:p-5 md:p-8 lg:p-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white tracking-tight leading-tight">
                Запишитесь на урок в{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  не школу
                </span>
              </h2>

              <div className="flex items-center mb-6 md:mb-8 text-gray-700 dark:text-white">
                <Plus className="text-orange-500 mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="text-sm md:text-base lg:text-lg">Первый урок бесплатно для всех новых учеников</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Например, Кирилл"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+7"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white"
                      inputMode="tel"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 md:py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center touch-callout-none"
                >
                  <span>Записаться на бесплатный урок</span>
                  <span className="ml-2">→</span>
                </button>

                <div className="flex items-center mt-4">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-2 border-orange-500 rounded-lg mr-3 text-gray-800 dark:text-white font-bold text-sm md:text-base">
                    5
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    Свободных мест на ближайшее занятие!
                  </p>
                </div>
              </form>
            </div>

            {/* Правая колонка - изображение */}
            <div className="relative bg-gray-100 dark:bg-black h-[200px] sm:h-[250px] md:h-full">
              <ImageWithFallback
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF7745.jpg-HlzPqdA0i4bSpHh982QJihgyB6mNd7.jpeg"
                alt="Барабанная установка"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
