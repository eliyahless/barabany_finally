"use client"

import { useEffect } from "react"
<<<<<<< HEAD
import { saveUTMParams } from "../../utils/utm-utils"
=======
import { saveUTMParams } from "@/utils/utm-utils"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

export function UTMInitializer() {
  useEffect(() => {
    // Проверяем, включена ли хотя бы одна система аналитики
    const isAnyAnalyticsEnabled =
      process.env.NEXT_PUBLIC_YANDEX_METRIKA_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_GTM_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_FB_PIXEL_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_VK_PIXEL_ENABLED === "true"

    // Если ни одна система не включена, не выполняем инициализацию UTM
    if (!isAnyAnalyticsEnabled) return

    // Сохраняем UTM-метки при загрузке страницы
    saveUTMParams()

    // Также можно добавить обработчик для сохранения UTM-меток при изменении URL
    const handleRouteChange = () => {
      saveUTMParams()
    }

    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return null
}
