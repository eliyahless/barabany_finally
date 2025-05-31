import type { ImageProps } from "next/image"

// Функция для оптимизации параметров изображений
export function optimizeImageProps(props: Partial<ImageProps>): Partial<ImageProps> {
  // Базовые параметры оптимизации
  const optimizedProps: Partial<ImageProps> = {
    ...props,
    quality: 80, // Хороший баланс между качеством и размером
    loading: props.priority ? "eager" : "lazy", // Lazy loading для непрриоритетных изображений
    placeholder: props.placeholder || "blur", // Добавляем placeholder для улучшения CLS
    blurDataURL:
      props.blurDataURL ||
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7aQAAAABJRU5ErkJggg==", // Минимальный placeholder
  }

  // Оптимизация sizes для отзывчивых изображений
  if (!props.sizes) {
    optimizedProps.sizes = "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
  }

  return optimizedProps
}

// Функция для создания оптимизированного URL изображения
export function getOptimizedImageUrl(src: string): string {
  // Если это уже URL с параметрами оптимизации, возвращаем как есть
  if (src.includes("?q=") || src.includes("&q=")) {
    return src
  }

  // Если это внешний URL, добавляем параметры оптимизации
  if (src.startsWith("http")) {
    const url = new URL(src)
    url.searchParams.set("q", "80") // Качество 80%
    url.searchParams.set("auto", "format") // Автоматический выбор формата (WebP если поддерживается)
    return url.toString()
  }

  // Для локальных изображений просто возвращаем путь
  return src
}
