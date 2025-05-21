import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { FontOptimization } from "@/components/font-optimization"
import { FontLoadingObserver } from "@/components/font-loading-observer"
import { AnalyticsHead } from "@/components/analytics/analytics-head"
import { AnalyticsBody } from "@/components/analytics/analytics-body"
import { UTMInitializer } from "@/components/analytics/utm-initializer"
import { analyticsConfig } from "@/config/analytics-config"
import { Suspense } from "react"
import { BrowserFixes } from "@/components/browser-fixes"
import { ScrollbarWidthDetector } from "@/components/scrollbar-width-detector"

// Обновленные метаданные для SEO
export const metadata: Metadata = {
  title: "Школа барабанов для взрослых в Москве | Не Школа",
  description:
    "Научитесь играть на барабанах с нуля. Первый урок бесплатно! Индивидуальный подход, опытные преподаватели, гибкий график. Запишитесь на пробное занятие прямо сейчас!",
  metadataBase: new URL("https://neshkola.ru"),
  alternates: {
    canonical: "https://neshkola.ru",
    languages: {
      "ru-RU": "https://neshkola.ru",
    },
  },
  keywords: [
    "школа барабанов",
    "уроки барабанов",
    "барабаны для взрослых",
    "научиться играть на барабанах",
    "барабанная школа москва",
    "первый урок бесплатно",
  ],
  authors: [{ name: "Не Школа Барабанов", url: "https://neshkola.ru" }],
  creator: "Не Школа Барабанов",
  publisher: "Не Школа Барабанов",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#ff5500",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://neshkola.ru/",
    title: "Школа барабанов для взрослых в Москве | Не Школа",
    description:
      "Научитесь играть на барабанах с нуля. Первый урок бесплатно! Индивидуальный подход, опытные преподаватели, гибкий график.",
    siteName: "Не Школа Барабанов",
    images: [
      {
        url: "https://neshkola.ru/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Не Школа Барабанов - Школа барабанов для взрослых в Москве",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Школа барабанов для взрослых в Москве | Не Школа",
    description:
      "Научитесь играть на барабанах с нуля. Первый урок бесплатно! Индивидуальный подход, опытные преподаватели, гибкий график.",
    images: ["https://neshkola.ru/og-image.jpg"],
    creator: "@neshkola",
    site: "@neshkola",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <FontOptimization />
        {/* Предзагрузка критических ресурсов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Предзагрузка логотипа, только если файл существует */}
        {process.env.NODE_ENV === "production" && <link rel="preload" href="/logo.png" as="image" type="image/png" />}

        {/* Слот для скриптов аналитики в head */}
        <AnalyticsHead config={analyticsConfig} />
      </head>
      <body className="antialiased">
        <FontLoadingObserver />
        <ThemeProvider defaultTheme="dark" storageKey="neshkola-theme">
          {/* Инициализатор UTM-меток */}
          <UTMInitializer />

          {/* Добавляем компоненты для кроссбраузерных исправлений */}
          <BrowserFixes />
          <ScrollbarWidthDetector />

          <Suspense>{children}</Suspense>

          {/* Слот для скриптов аналитики в конце body */}
          <AnalyticsBody config={analyticsConfig} />
        </ThemeProvider>
      </body>
    </html>
  )
}
