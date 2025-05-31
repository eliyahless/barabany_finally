"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "./utils/cn"

type AnimateOnScrollProps = {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-up"
  delay?: number
  threshold?: number
  once?: boolean
  rootMargin?: string
}

export default function AnimateOnScroll({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  once = true,
  rootMargin = "0px",
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Проверка предпочтений пользователя по уменьшению движения
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange)
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  useEffect(() => {
    // Если пользователь предпочитает уменьшенное движение, показываем контент сразу
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasAnimated(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once && hasAnimated) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold, rootMargin, hasAnimated, prefersReducedMotion])

  const animationClasses = {
    "fade-up": "opacity-0 translate-y-8 transition-all duration-700 ease-out",
    "fade-in": "opacity-0 transition-opacity duration-700 ease-out",
    "slide-in": "opacity-0 -translate-x-8 transition-all duration-700 ease-out",
    "scale-up": "opacity-0 scale-95 transition-all duration-700 ease-out",
  }

  const visibleClasses = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-in": "opacity-100",
    "slide-in": "opacity-100 translate-x-0",
    "scale-up": "opacity-100 scale-100",
  }

  // Если пользователь предпочитает уменьшенное движение, не применяем анимацию
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        delay > 0 && `delay-${delay}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
