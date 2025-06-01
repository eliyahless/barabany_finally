import type React from "react"
import { cn } from "../../utils/cn"

interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children: React.ReactNode
  as?: React.ElementType
}

export function GradientText({ className, children, as: Component = "span", ...props }: GradientTextProps) {
  return (
    <Component className={cn("inline", className)} {...props}>
      {children}
    </Component>
  )
}
