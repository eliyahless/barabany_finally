"use client"

import { useEffect } from "react"
<<<<<<< HEAD
import { useAnalytics } from "../../hooks/use-analytics"
=======
import { useAnalytics } from "@/hooks/use-analytics"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
import { usePathname, useSearchParams } from "next/navigation"

export function PageViewTracker() {
  const { trackEvent, isGAAvailable, isYMAvailable, isFBAvailable, isVKAvailable } = useAnalytics()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Проверяем, включена ли хотя бы одна система аналитики
    const isAnyAnalyticsAvailable = isGAAvailable() || isYMAvailable() || isFBAvailable() || isVKAvailable()

    // Если ни одна система не доступна, не отслеживаем просмотр страницы
    if (!isAnyAnalyticsAvailable) return

    // Отслеживаем просмотр страницы при монтировании компонента
    trackEvent("page_view", "page_view", {
      page_path: pathname,
      page_url: window.location.href,
      page_title: document.title,
      page_query: searchParams ? Object.fromEntries(searchParams.entries()) : {},
    })
  }, [pathname, searchParams, trackEvent, isGAAvailable, isYMAvailable, isFBAvailable, isVKAvailable])

  return null
}
