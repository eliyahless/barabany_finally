"use client"

import { useEffect } from "react"

export function FontLoadingObserver() {
  useEffect(() => {
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
    }, 3000) // 3 секунды максимум на загрузку шрифтов

    return () => clearTimeout(timeout)
  }, [])

  return null
}
