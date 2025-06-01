import type React from "react"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <title>Школа барабанов для взрослых в Москве — Не Школа Барабанов</title>
        <meta name="description" content="Школа барабанов для взрослых в Москве. Первый урок бесплатно! Научитесь играть на барабанах с нуля. Индивидуальные занятия, дружеская атмосфера, профессиональные преподаватели." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preload" as="image" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF7745.jpg-HlzPqdA0i4bSpHh982QJihgyB6mNd7.jpeg" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="neshkola-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
