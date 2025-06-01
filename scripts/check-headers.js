#!/usr/bin/env node

/**
 * Скрипт для проверки заголовков безопасности
 *
 * Использование:
 * node scripts/check-headers.js https://neshkola.ru
 */

const https = require("https")
const http = require("http")
const url = require("url")

// Получаем URL из аргументов командной строки или используем значение по умолчанию
<<<<<<< HEAD
const targetUrl = process.argv[2] || "https://neshkola.ru"
=======
const targetUrl = process.argv[2] || "http://79.174.93.221:3000"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
const parsedUrl = url.parse(targetUrl)

// Выбираем протокол
const protocol = parsedUrl.protocol === "https:" ? https : http

// Определяем важные заголовки безопасности
const securityHeaders = [
  "Content-Security-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "X-XSS-Protection",
  "Referrer-Policy",
  "Strict-Transport-Security",
  "Permissions-Policy",
]

console.log(`Checking security headers for ${targetUrl}...\n`)

// Отправляем запрос
const req = protocol.get(targetUrl, (res) => {
  console.log(`Status: ${res.statusCode} ${res.statusMessage}`)
  console.log("Headers:\n")

  // Проверяем наличие важных заголовков
  const missingHeaders = []

  securityHeaders.forEach((header) => {
    const headerValue = res.headers[header.toLowerCase()]
    if (headerValue) {
      console.log(`✅ ${header}: ${headerValue}`)
    } else {
      console.log(`❌ ${header}: Missing`)
      missingHeaders.push(header)
    }
  })

  console.log("\nOther headers:\n")

  // Выводим остальные заголовки
  Object.keys(res.headers).forEach((header) => {
    if (!securityHeaders.map((h) => h.toLowerCase()).includes(header)) {
      console.log(`${header}: ${res.headers[header]}`)
    }
  })

  // Выводим рекомендации
  if (missingHeaders.length > 0) {
    console.log("\nRecommendations:")
    missingHeaders.forEach((header) => {
      console.log(`- Add ${header} header`)
    })
  } else {
    console.log("\n✅ All security headers are present!")
  }
})

req.on("error", (e) => {
  console.error(`Error: ${e.message}`)
})

req.end()
