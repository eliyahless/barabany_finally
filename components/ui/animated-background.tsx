"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "../../utils/cn"

interface ParticleProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
  color?: string
  particleColor?: string
  particleSize?: number
  speed?: number
  opacity?: number
}

export default function AnimatedBackground({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#ffffff",
  particleColor = "#ff5500",
  particleSize = 1.5,
  speed = 1,
  opacity = 0.1,
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    animate()
    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
    }
  }, [])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    const size = Math.floor(Math.random() * particleSize) + 0.5
    const alpha = 0
    const targetAlpha = Number.parseFloat((Math.random() * opacity).toFixed(1))
    const dx = (Math.random() - 0.5) * speed
    const dy = (Math.random() - 0.5) * speed
    const magnetism = 0.1 + Math.random() * 4
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)
      context.current.fillStyle = particleColor
      context.current.globalAlpha = alpha
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const drawParticles = () => {
    clearContext()
    const particleCount = quantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const animate = () => {
    clearContext()
    circles.current.forEach((circle: any, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx
      circle.y += circle.dy
      if (circle.x < 0 || circle.x > canvasSize.current.w) {
        circle.dx *= -1
      }
      if (circle.y < 0 || circle.y > canvasSize.current.h) {
        circle.dy *= -1
      }
      // Mouse interaction
      const mouseDistance = Math.sqrt(
        Math.pow(mousePosition.current.x - circle.x, 2) + Math.pow(mousePosition.current.y - circle.y, 2),
      )
      const magnetism = circle.magnetism
      if (mouseDistance < 100) {
        const angle = Math.atan2(mousePosition.current.y - circle.y, mousePosition.current.x - circle.x)
        const velocity = remapValue(mouseDistance, 0, 100, magnetism, 0)
        circle.translateX += Math.cos(angle) * velocity
        circle.translateY += Math.sin(angle) * velocity
      } else {
        if (circle.translateX > 0) {
          circle.translateX -= 0.2
        } else if (circle.translateX < 0) {
          circle.translateX += 0.2
        }
        if (circle.translateY > 0) {
          circle.translateY -= 0.2
        } else if (circle.translateY < 0) {
          circle.translateY += 0.2
        }
      }
      drawCircle(
        {
          ...circle,
          x: circle.x,
          y: circle.y,
          translateX: circle.translateX,
          translateY: circle.translateY,
          alpha: circle.alpha,
        },
        true,
      )
    })
    window.requestAnimationFrame(animate)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const xRatio = w / rect.width
      const yRatio = h / rect.height
      mousePosition.current = { x: x * xRatio, y: y * yRatio }
    }
  }

  const handleMouseLeave = () => {
    mousePosition.current = { x: 0, y: 0 }
  }

  return (
    <div
      ref={canvasContainerRef}
      className={cn("fixed inset-0 z-0", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
