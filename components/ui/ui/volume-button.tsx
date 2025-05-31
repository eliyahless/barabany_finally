import * as React from "react"
import { cn } from "@/lib/utils"

interface VolumeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "image"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
  withBorder?: boolean
  belowImage?: boolean
}

export const VolumeButton = React.forwardRef<HTMLButtonElement, VolumeButtonProps>(
  (
    { className, variant = "primary", size = "default", children, withBorder = false, belowImage = false, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "volume-button",
          size === "default" && "px-6 py-3 text-base",
          size === "sm" && "px-4 py-2 text-sm",
          size === "lg" && "px-8 py-4 text-lg",
          variant === "primary" &&
            "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 active:translate-y-[1px]",
          variant === "secondary" &&
            "bg-zinc-800 text-white hover:bg-zinc-700 active:bg-zinc-600 active:translate-y-[1px]",
          variant === "outline" &&
            "bg-transparent text-orange-500 border-2 border-orange-500 hover:bg-orange-950 active:bg-orange-900 active:translate-y-[1px]",
          variant === "image" &&
            "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 active:translate-y-[1px] w-full rounded-full mt-4 shadow-lg",
          belowImage && "relative mt-4 w-full",
          withBorder && "border-2 border-white/20",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
VolumeButton.displayName = "VolumeButton"
