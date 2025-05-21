"use client"

import { useState, useEffect, useRef } from "react"

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  preload?: "auto" | "metadata" | "none"
  width?: number
  height?: number
  priority?: boolean
  id?: string
}

export default function OptimizedVideo({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  preload = "metadata",
  width,
  height,
  priority = false,
  id,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Используем IntersectionObserver для определения, когда видео в зоне видимости
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver || priority) {
      setIsInView(true)
      return
    }

    const element = videoRef.current
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
      { rootMargin: "100px" }, // Загружаем видео, когда оно в пределах 100px от видимой области
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [priority])

  // Загружаем видео только когда оно в зоне видимости
  useEffect(() => {
    if (isInView && videoRef.current) {
      // Если autoPlay, загружаем и воспроизводим видео
      if (autoPlay) {
        videoRef.current.load()
        videoRef.current.play().catch((e) => console.error("Autoplay failed:", e))
      }
    }
  }, [isInView, autoPlay])

  return (
    <video
      ref={videoRef}
      id={id}
      className={`${className || ""} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      poster={poster}
      autoPlay={isInView && autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      preload={priority ? "auto" : isInView ? preload : "none"}
      width={width}
      height={height}
      playsInline
      onLoadedData={() => setIsLoaded(true)}
    >
      <source src={isInView || priority ? src : ""} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
