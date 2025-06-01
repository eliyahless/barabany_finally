"use client"

import { useEffect } from "react"
import { useBrowserDetect } from "../hooks/use-browser-detect"

export function BrowserFixes() {
  const { isIOS, isSafari } = useBrowserDetect()

  useEffect(() => {
    if (typeof window === "undefined") return

    // Исправление для iOS Safari - проблемы с 100vh
    const fixIOSHeight = () => {
      if (isIOS) {
        // Устанавливаем CSS-переменную с реальной высотой окна
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      }
    }

    // Исправление для iOS Safari - проблемы с фиксированными элементами
    const fixIOSFixed = () => {
      if (isIOS) {
        const fixedElements = document.querySelectorAll<HTMLElement>(".fixed, [style*='position: fixed']")
        fixedElements.forEach((el) => {
          el.style.transform = "translateZ(0)"
        })
      }
    }

    // Исправление для iOS Safari - проблемы с фокусом на инпутах
    const fixIOSInputFocus = () => {
      if (isIOS) {
        const inputs = document.querySelectorAll<HTMLElement>("input, textarea, select")

        inputs.forEach((input) => {
          input.addEventListener("focus", () => {
            // Добавляем небольшую задержку для iOS
            setTimeout(() => {
              // Прокручиваем к элементу с учетом фиксированного хедера
              const headerHeight = document.querySelector("header")?.offsetHeight || 0
              const rect = input.getBoundingClientRect()
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop
              const targetY = rect.top + scrollTop - headerHeight - 20

              window.scrollTo({
                top: targetY,
                behavior: "smooth",
              })
            }, 300)
          })
        })
      }
    }

    // Исправление для всех браузеров - проблемы с прыжками при изменении высоты страницы
    const fixScrollbarJump = () => {
      // Добавляем класс для предотвращения прыжков при появлении/исчезновении скроллбара
      const hasScrollbar = window.innerWidth > document.documentElement.clientWidth
      if (hasScrollbar) {
        document.body.classList.add("has-scrollbar")
      } else {
        document.body.classList.remove("has-scrollbar")
      }
    }

    // Применяем все исправления
    fixIOSHeight()
    fixIOSFixed()
    fixIOSInputFocus()
    fixScrollbarJump()

    // Добавляем обработчики событий
    window.addEventListener("resize", fixIOSHeight)
    window.addEventListener("orientationchange", fixIOSHeight)
    window.addEventListener("resize", fixScrollbarJump)

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("resize", fixIOSHeight)
      window.removeEventListener("orientationchange", fixIOSHeight)
      window.removeEventListener("resize", fixScrollbarJump)
    }
  }, [isIOS, isSafari])

  return null
}
