"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  autoCloseTime?: number
  title?: string
  message?: string
  alternativeMessage?: boolean
}

export function SuccessPopup({
  isOpen,
  onClose,
  autoCloseTime = 5000,
  title = "Готово.",
  message,
  alternativeMessage = false,
}: SuccessPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)

      // Автоматическое закрытие через указанное время
      const timer = setTimeout(() => {
        handleClose()
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoCloseTime])

  const handleClose = () => {
    setIsVisible(false)
    // Небольшая задержка перед вызовом onClose для завершения анимации
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  const defaultMessage = "Заявка принята.\nМы свяжемся с тобой в ближайшее время."
  const altMessage = "Ты в игре.\nСкоро мы тебе напишем."

  const displayMessage = message || (alternativeMessage ? altMessage : defaultMessage)

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={(e) => {
        // Закрываем попап при клике на затемненный фон
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-2xl shadow-lg max-w-md w-full p-6 sm:p-8 transition-all duration-300 transform",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Закрыть"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-6 whitespace-pre-line">
          {displayMessage}
        </p>

        <button
          onClick={handleClose}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
