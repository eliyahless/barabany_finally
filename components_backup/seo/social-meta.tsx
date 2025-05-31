"use client"

import Head from "next/head"

interface SocialMetaProps {
  title: string
  description: string
  image: string
  url: string
  type?: string
  twitterCard?: "summary" | "summary_large_image" | "app" | "player"
  twitterSite?: string
  twitterCreator?: string
}

export function SocialMeta({
  title,
  description,
  image,
  url,
  type = "website",
  twitterCard = "summary_large_image",
  twitterSite = "@neshkola",
  twitterCreator = "@neshkola",
}: SocialMetaProps) {
  return (
    <Head>
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Не Школа Барабанов" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* VK */}
      <meta property="vk:image" content={image} />

      {/* WhatsApp */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  )
}
