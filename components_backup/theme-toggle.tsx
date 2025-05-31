"use client"

import { useTheme } from "./theme-provider"
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
