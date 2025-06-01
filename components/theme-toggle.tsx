"use client"

<<<<<<< HEAD
import { useTheme } from "./theme-provider"
=======
import { useTheme } from "@/components/theme-provider"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Предотвращаем гидратацию
  useEffect(() => {
    setMounted(true)
  }, [])

  // Компонент ничего не отображает
  return null
}
