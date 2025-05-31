"use client"
import { useEffect, useState, useRef } from "react"
import { VolumeButton } from "./ui/volume-button"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { scrollToIdWithOffset } from "./utils/scroll"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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
    } else {
      document.body.style.overflow = ""
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ""
  }

  const handleNavClick = (id: string) => {
    closeMobileMenu()
    scrollToIdWithOffset(id)
  }

  return (
    <header
      ref={headerRef}
      className={`w-full transition-all duration-300 py-2 sm:py-3 md:py-4 fixed top-0 left-0 right-0 z-50 safe-top ${
        isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="relative h-8 sm:h-10 md:h-16 w-32 sm:w-36 md:w-56 transition-all duration-300">
          <Image
            src="/logo.png"
            alt="Не Школа Барабанов"
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 224px"
          />
        </div>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
          <a
            href="#first-lesson"
            className="nav-link text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 font-bold"
            onClick={(e) => {
              e.preventDefault()
              scrollToIdWithOffset("first-lesson")
            }}
          >
            Пробный урок
          </a>
          <a
            href="#about"
            className="nav-link text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 font-bold"
            onClick={(e) => {
              e.preventDefault()
              scrollToIdWithOffset("about")
            }}
          >
            О школе
          </a>
          <a
            href="#testimonials"
            className="nav-link text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 font-bold"
            onClick={(e) => {
              e.preventDefault()
              scrollToIdWithOffset("testimonials")
            }}
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
            onClick={() => scrollToIdWithOffset("contact")}
          >
            ЗАПИСАТЬСЯ НА УРОК
          </VolumeButton>
        </div>

        {/* Мобильные кнопки */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />

          {/* Кнопка бургер-меню (мобильная) */}
          <button
            className="text-gray-800 dark:text-white p-1.5 focus:outline-none touch-callout-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
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
                href="#first-lesson"
                className="nav-link text-gray-800 dark:text-white text-base py-2 hover:text-orange-500 dark:hover:text-orange-400 transition-colors active:text-orange-600 dark:active:text-orange-500"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("first-lesson")
                }}
              >
                Пробный урок
              </a>
              <a
                href="#about"
                className="nav-link text-gray-800 dark:text-white text-base py-2 hover:text-orange-500 dark:hover:text-orange-400 transition-colors active:text-orange-600 dark:active:text-orange-500"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("about")
                }}
              >
                О школе
              </a>
              <a
                href="#testimonials"
                className="nav-link text-gray-800 dark:text-white text-base py-2 hover:text-orange-500 dark:hover:text-orange-400 transition-colors active:text-orange-600 dark:active:text-orange-500"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick("testimonials")
                }}
              >
                Почему мы
              </a>
              <div className="pt-3">
                <VolumeButton
                  variant="primary"
                  size="default"
                  className="rounded-full px-4 py-2 text-sm w-full"
                  onClick={() => {
                    closeMobileMenu()
                    scrollToIdWithOffset("contact")
                  }}
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
