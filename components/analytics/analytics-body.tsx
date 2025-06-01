"use client"
import type { AnalyticsConfig } from "./analytics-head"

interface AnalyticsBodyProps {
  config: AnalyticsConfig
}

export function AnalyticsBody({ config }: AnalyticsBodyProps) {
  // Не рендерим ничего на сервере
  if (typeof window === "undefined") return null

  // Проверяем, включена ли хотя бы одна система аналитики
  const isAnyAnalyticsEnabled =
    (config.googleTagManager?.enabled && config.googleTagManager.id) ||
    (config.yandexMetrika?.enabled && config.yandexMetrika.id) ||
    (config.facebookPixel?.enabled && config.facebookPixel.id) ||
    (config.vkPixel?.enabled && config.vkPixel.id)

  // Если ни одна система не включена, не рендерим ничего
  if (!isAnyAnalyticsEnabled) return null

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      {config.googleTagManager?.enabled && config.googleTagManager.id && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${config.googleTagManager.id}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      )}

      {/* Яндекс.Метрика (noscript) */}
      {config.yandexMetrika?.enabled && config.yandexMetrika.id && (
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${config.yandexMetrika.id}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      )}

      {/* Facebook Pixel (noscript) */}
      {config.facebookPixel?.enabled && config.facebookPixel.id && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${config.facebookPixel.id}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}

      {/* Пользовательские скрипты для body */}
      {config.customScripts?.body?.map((script, index) => (
        <div key={`custom-body-${index}`} id={`custom-body-${index}`} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </>
  )
}
