"use client"

import { useCallback, useEffect, useState } from "react"

interface ScrollOptions {
  offset?: number
  behavior?: ScrollBehavior
}

export function useScrollToElement() {
  const [headerHeight, setHeaderHeight] = useState(0)

  // Определяем высоту хедера при монтировании и при изменении размера окна
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    // Инициализация
    updateHeaderHeight()

    // Обновление при изменении размера окна
    window.addEventListener("resize", updateHeaderHeight)
    return () => window.removeEventListener("resize", updateHeaderHeight)
  }, [])

  const waitForImages = (container: HTMLElement): Promise<void> => {
    const images = Array.from(container.querySelectorAll('img')) as HTMLImageElement[]
    const unloaded = images.filter(img => !img.complete)
    if (unloaded.length === 0) return Promise.resolve()
    return Promise.all(unloaded.map(img => new Promise(res => img.onload = img.onerror = () => res(undefined)))) as Promise<void>
  }

  // Функция для скролла к элементу с учетом высоты хедера
  const scrollToElement = useCallback(
    async (elementId: string, options: ScrollOptions = {}) => {
      const { offset = 16, behavior = "smooth" } = options
      const element = document.getElementById(elementId)
      if (!element) return

      // Ждём загрузки всех изображений в секции
      await waitForImages(element)

      // Получаем текущую высоту хедера
      const currentHeaderHeight = document.querySelector("header")?.offsetHeight || headerHeight
      const prevScrollMarginTop = element.style.scrollMarginTop
      element.style.scrollMarginTop = `${currentHeaderHeight + offset}px`

      let attempts = 0
      const maxAttempts = 3
      const scrollAndCheck = () => {
        element.scrollIntoView({ behavior, block: "start" })
        // Проверяем, действительно ли элемент в нужном месте
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const expectedTop = currentHeaderHeight + offset
          if (Math.abs(rect.top - expectedTop) > 5 && attempts < maxAttempts) {
            attempts++
            scrollAndCheck()
          } else {
            // Устанавливаем фокус на элемент для доступности
            element.setAttribute("tabindex", "-1")
            element.focus({ preventScroll: true })
            setTimeout(() => {
              element.style.scrollMarginTop = prevScrollMarginTop
              element.removeAttribute("tabindex")
            }, 500)
          }
        })
      }
      // Даем время DOM устаканиться
      setTimeout(scrollAndCheck, 150)
    },
    [headerHeight],
  )

  return { scrollToElement, headerHeight }
}
