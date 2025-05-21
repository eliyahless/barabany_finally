import type { AnalyticsConfig } from "@/components/analytics/analytics-head"

// Конфигурация аналитики
export const analyticsConfig: AnalyticsConfig = {
  yandexMetrika: {
    enabled: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ENABLED === "true",
    id: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "",
  },
  googleTagManager: {
    enabled: process.env.NEXT_PUBLIC_GTM_ENABLED === "true",
    id: process.env.NEXT_PUBLIC_GTM_ID || "",
  },
  facebookPixel: {
    enabled: process.env.NEXT_PUBLIC_FB_PIXEL_ENABLED === "true",
    id: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
  },
  vkPixel: {
    enabled: process.env.NEXT_PUBLIC_VK_PIXEL_ENABLED === "true",
    id: process.env.NEXT_PUBLIC_VK_PIXEL_ID || "",
  },
  customScripts: {
    head: [],
    body: [],
  },
}
