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
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="neshkola-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
