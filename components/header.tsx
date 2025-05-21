"use client"
import { useEffect, useState, useRef } from "react"
import { VolumeButton } from "@/components/ui/volume-button"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useScrollToElement } from "@/hooks/use-scroll-to-element"
import { useAnalytics } from "@/hooks/use-analytics"
import { useBrowserDetect } from "@/hooks/use-browser-detect"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { scrollToElement } = useScrollToElement()
  const { trackEvent } = useAnalytics()
  const { isIOS } = useBrowserDetect()

  // Обработка изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
        document.body.style.overflow = ""
      }
    }

    // Инициализация
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Обработка прокрутки
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Блокировка прокрутки при открытом меню
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden"

      // Отслеживаем открытие меню
      trackEvent("cta_click", "open_mobile_menu", {
        event_category: "navigation",
        event_label: "mobile_menu",
      })
    } else {
      document.body.style.overflow = ""

      // Отслеживаем закрытие меню
      trackEvent("cta_click", "close_mobile_menu", {
        event_category: "navigation",
        event_label: "mobile_menu",
      })
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ""
  }

  const handleNavClick = (id: string) => {
    closeMobileMenu()
    scrollToElement(id)

    // Отслеживаем клик по якорной ссылке
    trackEvent("anchor_click", `anchor_${id}`, {
      event_category: "navigation",
      event_label: id,
    })
  }

  const handleCtaClick = () => {
    closeMobileMenu()
    scrollToElement("contact")

    // Отслеживаем клик по CTA кнопке
    trackEvent("cta_click", "header_cta", {
      event_category: "navigation",
      event_label: "contact",
      cta_text: "ЗАПИСАТЬСЯ НА УРОК",
    })
  }

  return (
    <header
      ref={headerRef}
      className={`w-full transition-all duration-300 py-2 sm:py-3 md:py-4 fixed top-0 left-0 right-0 z-50 safe-top ${
        isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      } ${isIOS ? "transform-gpu" : ""}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="relative h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-40 transition-all duration-300">
          <Image
            src="/logo.png"
            alt="Не Школа Барабанов"
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
          />
        </div>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
          <a
            href="#about"
            className="nav-link text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 font-bold min-touch-height flex items-center"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("about")
            }}
            data-event="anchor_click"
            data-event-category="navigation"
            data-event-label="about"
            data-track-anchor="about"
          >
            О школе
          </a>
          <a
            href="#first-lesson"
            className="nav-link text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 font-bold min-touch-height flex items-center"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("first-lesson")
            }}
            data-event="anchor_click"
            data-event-category="navigation"
            data-event-label="first-lesson"
            data-track-anchor="first-lesson"
          >
            Пробный урок
          </a>
          <a
            href="#testimonials"
            className="nav-link text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 font-bold min-touch-height flex items-center"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("testimonials")
            }}
            data-event="anchor_click"
            data-event-category="navigation"
            data-event-label="testimonials"
            data-track-anchor="testimonials"
          >
            Почему мы
          </a>

          {/* Кнопка переключения темы */}
          <ThemeToggle />
        </nav>

        {/* Кнопка записи (десктоп) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <VolumeButton
            variant="primary"
            size="lg"
            className="rounded-full px-4 lg:px-6 py-2 lg:py-3 button-text text-sm lg:text-base"
            onClick={handleCtaClick}
            data-event="cta_click"
            data-event-category="navigation"
            data-event-label="header_cta"
            data-track-cta="header_cta"
          >
            ЗАПИСАТЬСЯ НА УРОК
          </VolumeButton>
        </div>

        {/* Мобильные кнопки */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />

          {/* Кнопка бургер-меню (мобильная) */}
          <button
            className="text-gray-800 dark:text-white p-2 focus:outline-none touch-callout-none min-touch-height min-touch-width flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
            data-event="cta_click"
            data-event-category="navigation"
            data-event-label={isMobileMenuOpen ? "close_mobile_menu" : "open_mobile_menu"}
            data-track-cta={isMobileMenuOpen ? "close_mobile_menu" : "open_mobile_menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню - оптимизированная версия */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden animate-slide-down bg-white dark:bg-black"
          style={{
            maxHeight: `calc(100vh - ${headerRef.current?.offsetHeight || 60}px)`,
            overflowY: "auto",
          }}
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <a
                href="#about"
                className="nav-link text-gray-800 dark:text-white text-base py-3 hover:text-orange-500 dark:hover:text-orange-400 transition-colors active:text-orange-600 dark:active:text-orange-500 min-touch-height flex items-center"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("about")
                }}
                data-event="anchor_click"
                data-event-category="navigation"
                data-event-label="about_mobile"
                data-track-anchor="about_mobile"
              >
                О школе
              </a>
              <a
                href="#first-lesson"
                className="nav-link text-gray-800 dark:text-white text-base py-3 hover:text-orange-500 dark:hover:text-orange-400 transition-colors active:text-orange-600 dark:active:text-orange-500 min-touch-height flex items-center"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("first-lesson")
                }}
                data-event="anchor_click"
                data-event-category="navigation"
                data-event-label="first-lesson_mobile"
                data-track-anchor="first-lesson_mobile"
              >
                Пробный урок
              </a>
              <a
                href="#testimonials"
                className="nav-link text-gray-800 dark:text-white text-base py-3 hover:text-orange-500 dark:hover:text-orange-400 transition-colors active:text-orange-600 dark:active:text-orange-500 min-touch-height flex items-center"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("testimonials")
                }}
                data-event="anchor_click"
                data-event-category="navigation"
                data-event-label="testimonials_mobile"
                data-track-anchor="testimonials_mobile"
              >
                Почему мы
              </a>
              <div className="pt-3">
                <VolumeButton
                  variant="primary"
                  size="default"
                  className="rounded-full px-4 py-3 text-sm w-full"
                  onClick={handleCtaClick}
                  data-event="cta_click"
                  data-event-category="navigation"
                  data-event-label="mobile_cta"
                  data-track-cta="mobile_cta"
                >
                  ЗАПИСАТЬСЯ НА УРОК
                </VolumeButton>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
