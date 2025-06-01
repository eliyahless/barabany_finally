"use client"

import Head from "next/head"

interface LocaleMetaProps {
  locale?: string
  alternateLocales?: { locale: string; url: string }[]
}

export function LocaleMeta({ locale = "ru_RU", alternateLocales = [] }: LocaleMetaProps) {
  return (
    <Head>
      <meta property="og:locale" content={locale} />
      {alternateLocales.map((alt) => (
        <meta key={alt.locale} property="og:locale:alternate" content={alt.locale} />
      ))}
<<<<<<< HEAD
      <link rel="alternate" hrefLang="x-default" href="https://barabany-neshkola.ru/" />
      <link rel="alternate" hrefLang="ru" href="https://barabany-neshkola.ru/" />
=======
      <link rel="alternate" hrefLang="x-default" href="http://79.174.93.221:3000/" />
      <link rel="alternate" hrefLang="ru" href="http://79.174.93.221:3000/" />
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
      {alternateLocales.map((alt) => (
        <link key={alt.locale} rel="alternate" hrefLang={alt.locale.split("_")[0]} href={alt.url} />
      ))}
    </Head>
  )
}
