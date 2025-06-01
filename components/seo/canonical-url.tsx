"use client"

import { usePathname } from "next/navigation"
import Head from "next/head"

interface CanonicalUrlProps {
  baseUrl?: string
}

<<<<<<< HEAD
export function CanonicalUrl({ baseUrl = "https://barabany-neshkola.ru" }: CanonicalUrlProps) {
=======
export function CanonicalUrl({ baseUrl = "http://79.174.93.221:3000" }: CanonicalUrlProps) {
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
  const pathname = usePathname()
  const canonicalUrl = `${baseUrl}${pathname}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
