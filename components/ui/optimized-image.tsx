"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { optimizeImageProps } from "@/utils/image-optimizer"
import { useBrowserDetect } from "@/hooks/use-browser-detect" // Добавляем импорт

type OptimizedImageProps = ImageProps & {
  fallbackSrc?: string
  lowQualityPlaceholder?: boolean
  caption?: string
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  lowQualityPlaceholder = true,
  caption,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [uniqueId] = useState(`image-${Math.random().toString(36).substring(2, 9)}`)
  const { isSafari, isIOS } = useBrowserDetect() // Добавляем определение браузера

  // Оптимизируем параметры изображения
  const optimizedProps = optimizeImageProps(props)

  // Используем IntersectionObserver для определения, когда изображение в зоне видимости
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setIsInView(true)
      return
    }

    const element = document.getElementById(uniqueId)
    if (!element) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "200px" }, // Загружаем изображение, когда оно в пределах 200px от видимой области
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [uniqueId])

  // Устанавливаем источник изображения после того, как компонент монтируется
  useEffect(() => {
    if (src) {
      setImgSrc(typeof src === "string" ? src : "")
    }
  }, [src])

  // Если изображение не в зоне видимости и не приоритетное, не рендерим его
  if (!isInView && !props.priority) {
    return (
      <div
        id={uniqueId}
        className={`${props.className || ""} bg-gray-100 dark:bg-gray-800`}
        style={{
          width: props.width || "100%",
          height: props.height || "100%",
          position: props.fill ? "absolute" : "relative",
        }}
        role="img"
        aria-label={alt || "Загружаемое изображение"}
      />
    )
  }

  // Если imgSrc равен пустой строке или null, не рендерим Image
  if (!imgSrc) {
    return (
      <div
        id={uniqueId}
        className={`${props.className || ""} bg-gray-100 dark:bg-gray-800`}
        style={{
          width: props.width || "100%",
          height: props.height || "100%",
          position: props.fill ? "absolute" : "relative",
        }}
        role="img"
        aria-label={alt || "Загружаемое изображение"}
      />
    )
  }

  // Добавляем специальные классы для Safari и iOS
  const imageClasses = `${props.className || ""} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ${
    isSafari ? "safari-image-fix" : ""
  } ${isIOS ? "ios-image-fix" : ""}`

  return (
    <figure
      id={uniqueId}
      className={`relative ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      style={{
        width: props.width || "100%",
        height: props.height || "100%",
        position: props.fill ? "relative" : "relative",
      }}
    >
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt || "Изображение"} // Убедимся, что alt всегда присутствует
        {...optimizedProps}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (fallbackSrc) {
            setImgSrc(fallbackSrc)
          }
        }}
        className={imageClasses}
        // Добавляем crossOrigin для Safari
        crossOrigin={isSafari ? "anonymous" : undefined}
      />
      {caption && <figcaption className="text-sm text-gray-500 mt-2 text-center">{caption}</figcaption>}
    </figure>
  )
}
