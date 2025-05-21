"use client"

import Script from "next/script"

// Типы для конфигурации аналитики
export interface AnalyticsConfig {
  yandexMetrika?: {
    enabled: boolean
    id: string
  }
  googleTagManager?: {
    enabled: boolean
    id: string
  }
  facebookPixel?: {
    enabled: boolean
    id: string
  }
  vkPixel?: {
    enabled: boolean
    id: string
  }
  customScripts?: {
    head?: string[]
    body?: string[]
  }
}

interface AnalyticsHeadProps {
  config: AnalyticsConfig
}

export function AnalyticsHead({ config }: AnalyticsHeadProps) {
  // Не рендерим ничего на сервере или если все системы аналитики отключены
  if (typeof window === "undefined") return null

  // Проверяем, включена ли хотя бы одна система аналитики
  const isAnyAnalyticsEnabled =
    (config.yandexMetrika?.enabled && config.yandexMetrika.id) ||
    (config.googleTagManager?.enabled && config.googleTagManager.id) ||
    (config.facebookPixel?.enabled && config.facebookPixel.id) ||
    (config.vkPixel?.enabled && config.vkPixel.id)

  // Если ни одна система не включена, не рендерим ничего
  if (!isAnyAnalyticsEnabled) return null

  return (
    <>
      {/* Яндекс.Метрика */}
      {config.yandexMetrika?.enabled && config.yandexMetrika.id && (
        <Script id="yandex-metrika-head" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${config.yandexMetrika.id}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
          `}
        </Script>
      )}

      {/* Google Tag Manager */}
      {config.googleTagManager?.enabled && config.googleTagManager.id && (
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.googleTagManager.id}');
          `}
        </Script>
      )}

      {/* Facebook Pixel */}
      {config.facebookPixel?.enabled && config.facebookPixel.id && (
        <Script id="facebook-pixel-head" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${config.facebookPixel.id}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* VK Pixel */}
      {config.vkPixel?.enabled && config.vkPixel.id && (
        <Script id="vk-pixel-head" strategy="afterInteractive">
          {`
            !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("${config.vkPixel.id}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
          `}
        </Script>
      )}

      {/* Пользовательские скрипты для head */}
      {config.customScripts?.head?.map((script, index) => (
        <Script key={`custom-head-${index}`} id={`custom-head-${index}`} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </>
  )
}
