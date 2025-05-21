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

  // Функция для скролла к элементу с учетом высоты хедера
  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}) => {
      const { offset = 16, behavior = "smooth" } = options
      const element = document.getElementById(elementId)

      if (element) {
        // Получаем текущую высоту хедера
        const currentHeaderHeight = document.querySelector("header")?.offsetHeight || headerHeight

        // Устанавливаем scroll-margin-top для элемента
        element.style.scrollMarginTop = `${currentHeaderHeight + offset}px`

        // Скроллим к элементу
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - currentHeaderHeight - offset,
          behavior,
        })

        // Устанавливаем фокус на элемент для доступности
        element.setAttribute("tabindex", "-1")
        element.focus({ preventScroll: true })

        // Возвращаем tabindex в исходное состояние
        setTimeout(() => {
          element.removeAttribute("tabindex")
        }, 1000)
      }
    },
    [headerHeight],
  )

  return { scrollToElement, headerHeight }
}
