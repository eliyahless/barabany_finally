<<<<<<< HEAD
import type { AnalyticsConfig } from "../components/analytics/analytics-head"
=======
import type { AnalyticsConfig } from "@/components/analytics/analytics-head"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

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
