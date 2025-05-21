"use client"

import { usePathname } from "next/navigation"
import Head from "next/head"

interface CanonicalUrlProps {
  baseUrl?: string
}

export function CanonicalUrl({ baseUrl = "https://neshkola.ru" }: CanonicalUrlProps) {
  const pathname = usePathname()
  const canonicalUrl = `${baseUrl}${pathname}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
