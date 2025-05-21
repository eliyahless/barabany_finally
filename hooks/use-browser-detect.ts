"use client"

import { useEffect, useState } from "react"

interface BrowserInfo {
  isSafari: boolean
  isIOS: boolean
  isMobile: boolean
  isChrome: boolean
  isFirefox: boolean
  isEdge: boolean
  isWebKit: boolean
}

export function useBrowserDetect(): BrowserInfo {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    isSafari: false,
    isIOS: false,
    isMobile: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    isWebKit: false,
  })

  useEffect(() => {
    // Выполняем только на клиенте
    if (typeof window === "undefined") return

    const ua = window.navigator.userAgent.toLowerCase()

    // Определяем браузер и платформу
    const isSafari = /safari/.test(ua) && !/chrome/.test(ua) && !/chromium/.test(ua)
    const isIOS = /iphone|ipad|ipod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
    const isChrome = /chrome|chromium/i.test(ua)
    const isFirefox = /firefox/i.test(ua)
    const isEdge = /edg/i.test(ua)
    const isWebKit = /webkit/i.test(ua)

    setBrowserInfo({
      isSafari,
      isIOS,
      isMobile,
      isChrome,
      isFirefox,
      isEdge,
      isWebKit,
    })

    // Добавляем классы к body для CSS-селекторов
    if (isSafari) document.body.classList.add("is-safari")
    if (isIOS) document.body.classList.add("is-ios")
    if (isMobile) document.body.classList.add("is-mobile")
    if (isChrome) document.body.classList.add("is-chrome")
    if (isFirefox) document.body.classList.add("is-firefox")
    if (isEdge) document.body.classList.add("is-edge")
    if (isWebKit) document.body.classList.add("is-webkit")

    return () => {
      // Очищаем классы при размонтировании
      document.body.classList.remove(
        "is-safari",
        "is-ios",
        "is-mobile",
        "is-chrome",
        "is-firefox",
        "is-edge",
        "is-webkit",
      )
    }
  }, [])

  return browserInfo
}
