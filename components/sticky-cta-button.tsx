"use client"

import { useState, useEffect, useRef } from "react"
<<<<<<< HEAD
import { useScrollToElement } from "../hooks/use-scroll-to-element"
import { useAnalytics } from "../hooks/use-analytics"
import { Flame } from "lucide-react"
import { cn } from "../utils/cn"
=======
import { useScrollToElement } from "@/hooks/use-scroll-to-element"
import { useAnalytics } from "@/hooks/use-analytics"
import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

interface StickyCTAButtonProps {
  targetId?: string
  className?: string
}

export default function StickyCTAButton({ targetId = "contact", className }: StickyCTAButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { scrollToElement } = useScrollToElement()
  const { trackEvent } = useAnalytics()

  // Проверяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Инициализация
    checkMobile()

    // Обновление при изменении размера окна
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Отслеживаем скролл для показа/скрытия кнопки
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      // Показываем кнопку после скролла на 300px
      if (window.scrollY > 300 && !isFormVisible && !isFormSubmitted) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile, isFormVisible, isFormSubmitted])

  // Отслеживаем видимость форм
  useEffect(() => {
    if (!isMobile) return

    // Находим все формы на странице
    const forms = document.querySelectorAll('form, [id="contact"]')

    const observer = new IntersectionObserver(
      (entries) => {
        // Если хотя бы одна форма видима, скрываем кнопку
        const isAnyFormVisible = entries.some((entry) => entry.isIntersecting)
        setIsFormVisible(isAnyFormVisible)
      },
      { threshold: 0.3 }, // Форма считается видимой, когда видно 30% её площади
    )

    forms.forEach((form) => observer.observe(form))

    return () => {
      forms.forEach((form) => observer.unobserve(form))
    }
  }, [isMobile])

  // Отслеживаем отправку форм
  useEffect(() => {
    if (!isMobile) return

    const handleFormSubmit = () => {
      setIsFormSubmitted(true)

      // Сбрасываем состояние через 5 секунд (после закрытия попапа успешной отправки)
      setTimeout(() => {
        setIsFormSubmitted(false)
      }, 5000)
    }

    // Слушаем событие отправки формы (будет генерироваться в компоненте формы)
    window.addEventListener("formSubmitted", handleFormSubmit)
    return () => window.removeEventListener("formSubmitted", handleFormSubmit)
  }, [isMobile])

  // Обработчик клика по кнопке
  const handleClick = () => {
    scrollToElement(targetId)

    // Отслеживаем клик по кнопке
    trackEvent("cta_click", "sticky_cta_button", {
      event_category: "cta",
      event_label: "sticky_button",
      cta_text: "Записаться на урок",
    })
  }

  // Если не мобильное устройство или кнопка не должна быть видна, не рендерим её
  if (!isMobile || !isVisible) return null

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        // Базовые стили
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-40",
        "bg-orange-500 text-white font-bold py-3 px-6 rounded-full",
        "shadow-lg transform transition-all duration-300",
        "flex items-center justify-center gap-2",
        "animate-slide-up",
        // Ховер и активные состояния
        "hover:bg-orange-600 active:bg-orange-700 active:scale-95",
        // Безопасная зона для iOS
        "safe-bottom",
        className,
      )}
      aria-label="Записаться на урок"
      data-event="cta_click"
      data-event-category="cta"
      data-event-label="sticky_button"
      data-track-cta="sticky_cta_button"
    >
      <Flame className="w-5 h-5" />
      <span>Записаться на урок</span>
    </button>
  )
}
