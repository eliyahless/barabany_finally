// Функция для отправки событий в аналитику
export function trackEvent(
  action: string,
  label: string,
  params: {
    event_category?: string
    event_label?: string
    [key: string]: any
  }
) {
  // Проверяем, доступен ли объект window (для SSR)
  if (typeof window === 'undefined') return

  // Отправляем событие в Google Analytics, если он доступен
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: params.event_category,
      event_label: params.event_label,
      ...params,
    })
  }

  // Отправляем событие в Яндекс.Метрику, если она доступна
  if (window.ym) {
    window.ym(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID, 'reachGoal', action, {
      label,
      ...params,
    })
  }

  // Логируем событие в консоль в режиме разработки
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { action, label, params })
  }
} 