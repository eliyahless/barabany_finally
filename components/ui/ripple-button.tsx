"use client"

import * as React from "react"
<<<<<<< HEAD
import { cn } from "../../utils/cn"
=======
import { cn } from "@/lib/utils"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  children: React.ReactNode
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const id = Date.now()

      setRipples([...ripples, { x, y, id }])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id))
      }, 1000)
    }

    return (
      <button
        ref={(node) => {
          // Merge refs
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          buttonRef.current = node
        }}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-medium text-sm uppercase transition-all duration-300 overflow-hidden",
          variant === "primary" && "bg-orange-400 text-white hover:bg-orange-500 active:bg-orange-600",
          variant === "secondary" && "border border-gray-200 text-black hover:bg-gray-100 active:bg-gray-200",
          variant === "outline" && "border-2 border-orange-400 text-orange-400 hover:bg-orange-50 active:bg-orange-100",
          className,
        )}
        onClick={addRipple}
        {...props}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={cn(
              "absolute rounded-full animate-ripple",
              variant === "primary" && "bg-white/30",
              variant === "secondary" && "bg-black/10",
              variant === "outline" && "bg-orange-400/20",
            )}
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
              width: "300%",
              paddingBottom: "300%",
            }}
          />
        ))}
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)
RippleButton.displayName = "RippleButton"
