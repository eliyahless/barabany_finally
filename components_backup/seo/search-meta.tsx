"use client"

import Head from "next/head"

interface SearchMetaProps {
  title: string
  description: string
  keywords: string[]
  author?: string
  robots?: string
}

export function SearchMeta({
  title,
  description,
  keywords,
  author = "Не Школа Барабанов",
  robots = "index, follow",
}: SearchMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="google" content="notranslate" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ff5500" />
    </Head>
  )
}
