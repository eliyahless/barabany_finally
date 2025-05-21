"use client"

import { useState } from "react"
import { useBrowserDetect } from "@/hooks/use-browser-detect"

export function BrowserCompatibilityTester() {
  const [isOpen, setIsOpen] = useState(false)
  const browserInfo = useBrowserDetect()

  // Только для разработки
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
        aria-label="Проверка совместимости браузеров"
      >
        {isOpen ? "×" : "🔍"}
      </button>

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mt-2 w-64">
          <h3 className="font-bold mb-2">Информация о браузере:</h3>
          <ul className="text-sm">
            <li>Safari: {browserInfo.isSafari ? "✅" : "❌"}</li>
            <li>iOS: {browserInfo.isIOS ? "✅" : "❌"}</li>
            <li>Mobile: {browserInfo.isMobile ? "✅" : "❌"}</li>
            <li>Chrome: {browserInfo.isChrome ? "✅" : "❌"}</li>
            <li>Firefox: {browserInfo.isFirefox ? "✅" : "❌"}</li>
            <li>Edge: {browserInfo.isEdge ? "✅" : "❌"}</li>
            <li>WebKit: {browserInfo.isWebKit ? "✅" : "❌"}</li>
          </ul>
          <div className="mt-2 text-xs">
            <p>User Agent: {navigator.userAgent}</p>
          </div>
        </div>
      )}
    </div>
  )
}
