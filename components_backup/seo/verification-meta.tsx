"use client"

import Head from "next/head"

interface VerificationMetaProps {
  google?: string
  yandex?: string
  bing?: string
  facebook?: string
  pinterest?: string
}

export function VerificationMeta({ google, yandex, bing, facebook, pinterest }: VerificationMetaProps) {
  return (
    <Head>
      {google && <meta name="google-site-verification" content={google} />}
      {yandex && <meta name="yandex-verification" content={yandex} />}
      {bing && <meta name="msvalidate.01" content={bing} />}
      {facebook && <meta name="facebook-domain-verification" content={facebook} />}
      {pinterest && <meta name="p:domain_verify" content={pinterest} />}
    </Head>
  )
}
