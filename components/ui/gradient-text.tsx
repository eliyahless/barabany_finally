import type React from "react"
<<<<<<< HEAD
import { cn } from "../../utils/cn"
=======
import { cn } from "@/lib/utils"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

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
