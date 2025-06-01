"use client"
import { cn } from "../utils/cn"
import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "../theme-provider"

function BackgroundGradientAnimation({
  gradientBackgroundStart = "rgb(255, 255, 255)",
  gradientBackgroundEnd = "rgb(240, 240, 240)",
  firstColor = "255, 85, 0",
  secondColor = "255, 119, 51",
  thirdColor = "255, 153, 102",
  fourthColor = "255, 187, 153",
  fifthColor = "255, 221, 204",
  pointerColor = "255, 85, 0",
  size = "100%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [supportsHover, setSupportsHover] = useState(true)

  const curX = useRef(0)
  const curY = useRef(0)
  const tgX = useRef(0)
  const tgY = useRef(0)
  const animFrame = useRef<number>()

  useEffect(() => {
    setMounted(true)
    setSupportsHover(window.matchMedia('(hover: hover)').matches)
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Установка цветов в зависимости от темы
    const isDark = theme === "dark"
    document.body.style.setProperty("--gradient-background-start", isDark ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)")
    document.body.style.setProperty("--gradient-background-end", isDark ? "rgb(10, 10, 18)" : "rgb(240, 240, 240)")

    // Добавляем CSS-переменные для анимаций
    document.body.style.setProperty("--animation-duration", "15s")
    document.body.style.setProperty("--animation-timing", "cubic-bezier(0.4, 0, 0.2, 1)")

    document.body.style.setProperty("--first-color", firstColor)
    document.body.style.setProperty("--second-color", secondColor)
    document.body.style.setProperty("--third-color", thirdColor)
    document.body.style.setProperty("--fourth-color", fourthColor)
    document.body.style.setProperty("--fifth-color", fifthColor)
    document.body.style.setProperty("--pointer-color", pointerColor)
    document.body.style.setProperty("--size", size)
    document.body.style.setProperty("--blending-value", blendingValue)
  }, [firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue, theme, mounted])

  useEffect(() => {
    if (!mounted || !supportsHover) return

    let running = true
    function animate() {
      if (!interactiveRef.current) return
      curX.current += (tgX.current - curX.current) / 20
      curY.current += (tgY.current - curY.current) / 20
      interactiveRef.current.style.transform = `translate3d(${Math.round(curX.current)}px, ${Math.round(curY.current)}px, 0)`
      if (running) animFrame.current = requestAnimationFrame(animate)
    }
    animFrame.current = requestAnimationFrame(animate)
    return () => {
      running = false
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
    }
  }, [mounted, supportsHover])

  // Оптимизированный throttle для mousemove
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsHover || !interactiveRef.current) return
    
    const now = performance.now()
    if (now - lastMove < 16) return // 60fps
    lastMove = now

    const rect = interactiveRef.current.getBoundingClientRect()
    tgX.current = event.clientX - rect.left
    tgY.current = event.clientY - rect.top
  }, [supportsHover])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        "transition-opacity duration-1000 opacity-100",
        containerClassName,
      )}
    >
      <div 
        className={cn(
          "relative z-10 transition-all duration-1000 opacity-100 translate-y-0",
          className
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg absolute inset-0",
          "transform-gpu backface-visibility-hidden",
          "transition-opacity duration-1000 opacity-100",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]",
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.5)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-30`,
            `will-change-transform`,
            `transition-transform duration-[var(--animation-duration)] ease-[var(--animation-timing)]`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.5)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-30`,
            `will-change-transform`,
            `transition-transform duration-[var(--animation-duration)] ease-[var(--animation-timing)]`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.5)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-30`,
            `will-change-transform`,
            `transition-transform duration-[var(--animation-duration)] ease-[var(--animation-timing)]`,
          )}
        ></div>

        {interactive && supportsHover && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.5)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-30`,
              `will-change-transform`,
              `transform-gpu`,
              `transition-transform duration-300 ease-out`,
            )}
          ></div>
        )}
      </div>
    </div>
  )
}

export default BackgroundGradientAnimation
