"use client"

import { useEffect } from "react"

// Массив шрифтов для предзагрузки
const FONTS_TO_PRELOAD = [
  { href: "/fonts/BasisGrotesquePro-Regular.woff2", type: "font/woff2" },
  { href: "/fonts/AvantGardeCTT.woff2", type: "font/woff2" },
]

export function FontOptimization() {
  useEffect(() => {
    // Предзагрузка критических шрифтов
    if (typeof window !== "undefined") {
      // Создаем ссылки для предзагрузки шрифтов
      FONTS_TO_PRELOAD.forEach((font) => {
        if (!font.href) return // Пропускаем, если href пустой

        const link = document.createElement("link")
        link.rel = "preload"
        link.href = font.href
        link.as = "font"
        link.type = font.type
        link.crossOrigin = "anonymous"
        document.head.appendChild(link)
      })

      // Добавляем класс для индикации загрузки шрифтов
      document.documentElement.classList.add("fonts-loading")

      // Проверяем поддержку Font Loading API
      if ("fonts" in document) {
        Promise.all([document.fonts.load("1em BasisGrotesquePro-Regular"), document.fonts.load("1em AvantGardeCTT")])
          .then(() => {
            // Шрифты загружены, удаляем класс загрузки
            document.documentElement.classList.remove("fonts-loading")
            document.documentElement.classList.add("fonts-loaded")
          })
          .catch(() => {
            // В случае ошибки также удаляем класс загрузки
            document.documentElement.classList.remove("fonts-loading")
          })
      } else {
        // Если Font Loading API не поддерживается, просто удаляем класс загрузки
        // и полагаемся на стандартное поведение браузера
        document.documentElement.classList.remove("fonts-loading")
      }

      // Устанавливаем таймаут для случаев, когда шрифты не загружаются
      const timeout = setTimeout(() => {
        if (document.documentElement.classList.contains("fonts-loading")) {
          document.documentElement.classList.remove("fonts-loading")
        }
      }, 2000) // 2 секунды максимум на загрузку шрифтов

      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <style jsx global>{`
      /* Оптимизация шрифтов */
      @font-face {
        font-family: 'BasisGrotesquePro-Regular';
        src: local('BasisGrotesquePro-Regular'),
             url('/fonts/BasisGrotesquePro-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      @font-face {
        font-family: 'AvantGardeCTT';
        src: local('AvantGardeCTT'),
             url('/fonts/AvantGardeCTT.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* Предотвращение FOUT (Flash of Unstyled Text) */
      html.fonts-loading * {
        /* Используем системные шрифты до загрузки пользовательских */
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
      }
      
      /* Плавное появление текста после загрузки шрифтов */
      html.fonts-loaded * {
        transition: opacity 0.1s ease;
      }
    `}</style>
  )
}
