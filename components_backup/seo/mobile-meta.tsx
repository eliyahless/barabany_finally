"use client"

import Head from "next/head"

interface MobileMetaProps {
  themeColor?: string
  appleMobileWebAppCapable?: "yes" | "no"
  appleMobileWebAppStatusBarStyle?: "default" | "black" | "black-translucent"
  appleMobileWebAppTitle?: string
  applicationName?: string
  msapplicationTileColor?: string
  msapplicationTileImage?: string
}

export function MobileMeta({
  themeColor = "#ff5500",
  appleMobileWebAppCapable = "yes",
  appleMobileWebAppStatusBarStyle = "black-translucent",
  appleMobileWebAppTitle = "Не Школа",
  applicationName = "Не Школа Барабанов",
  msapplicationTileColor = "#ff5500",
  msapplicationTileImage = "/ms-icon-144x144.png",
}: MobileMetaProps) {
  return (
    <Head>
      <meta name="theme-color" content={themeColor} />
      <meta name="apple-mobile-web-app-capable" content={appleMobileWebAppCapable} />
      <meta name="apple-mobile-web-app-status-bar-style" content={appleMobileWebAppStatusBarStyle} />
      <meta name="apple-mobile-web-app-title" content={appleMobileWebAppTitle} />
      <meta name="application-name" content={applicationName} />
      <meta name="msapplication-TileColor" content={msapplicationTileColor} />
      <meta name="msapplication-TileImage" content={msapplicationTileImage} />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    </Head>
  )
}
