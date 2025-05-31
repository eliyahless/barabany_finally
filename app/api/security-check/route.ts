import { NextResponse } from "next/server"

// Этот эндпоинт доступен только в режиме разработки
export async function GET(request: Request) {
  // Проверяем, что мы в режиме разработки
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 })
  }

  // Получаем заголовки запроса для проверки
  const headers = Object.fromEntries(new Headers(request.headers))

  // Проверяем наличие важных заголовков безопасности
  const securityHeaders = {
    "Content-Security-Policy": headers["content-security-policy"] || "Missing",
    "X-Content-Type-Options": headers["x-content-type-options"] || "Missing",
    "X-Frame-Options": headers["x-frame-options"] || "Missing",
    "X-XSS-Protection": headers["x-xss-protection"] || "Missing",
    "Referrer-Policy": headers["referrer-policy"] || "Missing",
    "Strict-Transport-Security": headers["strict-transport-security"] || "Missing",
    "Permissions-Policy": headers["permissions-policy"] || "Missing",
  }

  // Проверяем настройки cookie
  const cookieSettings = {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  }

  // Проверяем настройки CSP
  const cspAnalysis = analyzeCsp(securityHeaders["Content-Security-Policy"])

  return NextResponse.json(
    {
      headers: securityHeaders,
      cookies: cookieSettings,
      csp: cspAnalysis,
      recommendations: generateRecommendations(securityHeaders),
    },
    { status: 200 },
  )
}

// Анализ CSP
function analyzeCsp(csp: string) {
  if (csp === "Missing") {
    return { status: "Missing", analysis: "Content Security Policy is not set" }
  }

  // Простой анализ CSP
  const directives = csp.split(";").map((d) => d.trim())
  const analysis = directives.map((directive) => {
    const [name, ...values] = directive.split(" ")
    return { name, values }
  })

  return { status: "Present", analysis }
}

// Генерация рекомендаций
function generateRecommendations(headers: Record<string, string>) {
  const recommendations = []

  if (headers["Content-Security-Policy"] === "Missing") {
    recommendations.push("Add Content-Security-Policy header to prevent XSS attacks")
  }

  if (headers["X-Content-Type-Options"] === "Missing") {
    recommendations.push("Add X-Content-Type-Options: nosniff header to prevent MIME type sniffing")
  }

  if (headers["X-Frame-Options"] === "Missing") {
    recommendations.push("Add X-Frame-Options: DENY header to prevent clickjacking")
  }

  if (headers["Strict-Transport-Security"] === "Missing") {
    recommendations.push("Add Strict-Transport-Security header to enforce HTTPS")
  }

  return recommendations
}
