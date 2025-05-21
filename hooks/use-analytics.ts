"use client"

import { useCallback } from "react"

// Типы событий для аналитики
export type AnalyticsEventType =
  | "page_view"
  | "anchor_click"
  | "cta_click"
  | "form_submit"
  | "form_start"
  | "messenger_click"
  | "custom"

// Интерфейс для данных события
export interface AnalyticsEventData {
  event_category?: string
  event_label?: string
  event_value?: number
  [key: string]: any
}

export function useAnalytics() {
  // Проверка наличия систем аналитики
  const isGAAvailable = useCallback(() => {
    return typeof window !== "undefined" && "gtag" in window
  }, [])

  const isYMAvailable = useCallback(() => {
    return typeof window !== "undefined" && "ym" in window
  }, [])

  const isFBAvailable = useCallback(() => {
    return typeof window !== "undefined" && "fbq" in window
  }, [])

  const isVKAvailable = useCallback(() => {
    return typeof window !== "undefined" && "VK" in window && (window as any).VK.Retargeting
  }, [])

  // Отправка события в Google Analytics
  const sendGAEvent = useCallback(
    (eventType: AnalyticsEventType, eventData?: AnalyticsEventData) => {
      if (isGAAvailable()) {
        const gtag = (window as any).gtag
        gtag("event", eventType, eventData)
      }
    },
    [isGAAvailable],
  )

  // Отправка события в Яндекс.Метрику
  const sendYMEvent = useCallback(
    (eventName: string, eventData?: AnalyticsEventData) => {
      if (isYMAvailable()) {
        const ym = (window as any).ym
        const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
        if (ymId) {
          ym(ymId, "reachGoal", eventName, eventData)
        }
      }
    },
    [isYMAvailable],
  )

  // Отправка события в Facebook Pixel
  const sendFBEvent = useCallback(
    (eventName: string, eventData?: AnalyticsEventData) => {
      if (isFBAvailable()) {
        const fbq = (window as any).fbq
        fbq("track", eventName, eventData)
      }
    },
    [isFBAvailable],
  )

  // Отправка события в VK Pixel
  const sendVKEvent = useCallback(
    (eventName: string, eventData?: AnalyticsEventData) => {
      if (isVKAvailable()) {
        const VK = (window as any).VK
        VK.Retargeting.Event(eventName)
      }
    },
    [isVKAvailable],
  )

  // Универсальная функция для отправки события во все системы аналитики
  const trackEvent = useCallback(
    (eventType: AnalyticsEventType, eventName: string, eventData?: AnalyticsEventData) => {
      // Google Analytics
      if (isGAAvailable()) {
        sendGAEvent(eventType, {
          ...eventData,
          event_category: eventData?.event_category || eventName,
        })
      }

      // Яндекс.Метрика
      if (isYMAvailable()) {
        sendYMEvent(eventName, eventData)
      }

      // Facebook Pixel
      if (isFBAvailable()) {
        sendFBEvent(eventName, eventData)
      }

      // VK Pixel
      if (isVKAvailable()) {
        sendVKEvent(eventName, eventData)
      }

      // Вывод в консоль для отладки (только в development)
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Event: ${eventType} - ${eventName}`, eventData)
      }
    },
    [sendGAEvent, sendYMEvent, sendFBEvent, sendVKEvent, isGAAvailable, isYMAvailable, isFBAvailable, isVKAvailable],
  )

  return {
    trackEvent,
    sendGAEvent,
    sendYMEvent,
    sendFBEvent,
    sendVKEvent,
    isGAAvailable,
    isYMAvailable,
    isFBAvailable,
    isVKAvailable,
  }
}
