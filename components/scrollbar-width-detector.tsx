"use client"

import { useEffect } from "react"

export function ScrollbarWidthDetector() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Определяем ширину скроллбара
    const detectScrollbarWidth = () => {
      // Создаем элемент с прокруткой
      const outer = document.createElement("div")
      outer.style.visibility = "hidden"
      outer.style.overflow = "scroll"
      document.body.appendChild(outer)

      // Создаем внутренний элемент
      const inner = document.createElement("div")
      outer.appendChild(inner)

      // Вычисляем ширину скроллбара
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

      // Удаляем временные элементы
      outer.parentNode?.removeChild(outer)

      // Устанавливаем CSS-переменную
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`)
    }

    // Вызываем функцию при загрузке и изменении размера окна
    detectScrollbarWidth()
    window.addEventListener("resize", detectScrollbarWidth)

    return () => {
      window.removeEventListener("resize", detectScrollbarWidth)
    }
  }, [])

  return null
}
