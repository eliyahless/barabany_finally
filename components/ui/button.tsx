import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-medium text-sm uppercase transition-all duration-300 overflow-hidden group",
          variant === "primary" &&
            "bg-orange-400 text-white hover:bg-orange-500 before:absolute before:inset-0 before:w-full before:h-full before:bg-orange-500 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left",
          variant === "secondary" &&
            "border border-gray-200 text-black hover:bg-gray-100 before:absolute before:inset-0 before:w-full before:h-full before:bg-gray-100 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left",
          variant === "outline" &&
            "border-2 border-orange-400 text-orange-400 hover:text-white before:absolute before:inset-0 before:w-full before:h-full before:bg-orange-400 before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 hover:before:scale-y-100",
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
