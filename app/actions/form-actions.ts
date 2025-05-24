"use server"

import { z } from "zod"
import { sendTelegramNotification } from "@/lib/telegram"
import { appendToGoogleSheet } from "@/lib/google-sheets"
import { createHmac } from "crypto"

// Схема валидации для формы
const FormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+7\d{10}$/, "Неверный формат номера телефона"),
  honeypot: z.string().max(0, "Обнаружен бот").optional(),
  formId: z.string().optional(),
  timestamp: z.number().optional(),
  token: z.string().optional(),
})

// Тип для результата отправки формы
type FormResult = {
  success: boolean
  message: string
  data?: any
}

// Функция для создания токена защиты от CSRF
export async function generateFormToken(formId: string, timestamp: number): Promise<string> {
  if (!process.env.FORM_SECRET_KEY) {
    return "temp-token"
  }

  const data = `${formId}:${timestamp}`
  return createHmac("sha256", process.env.FORM_SECRET_KEY).update(data).digest("hex")
}

// Функция для проверки токена
function verifyFormToken(formId: string, timestamp: number, token: string): boolean {
  // Проверяем, что форма отправлена не слишком быстро (защита от ботов)
  const now = Date.now()
  const minSubmitTime = 1500 // минимальное время в мс для заполнения формы

  if (now - timestamp < minSubmitTime) {
    return false
  }

  // Проверяем, что токен не устарел (максимум 1 час)
  const maxTokenAge = 60 * 60 * 1000 // 1 час в мс
  if (now - timestamp > maxTokenAge) {
    return false
  }

  // Проверяем сам токен
  const expectedToken = generateFormToken(formId, timestamp)
  return token === expectedToken
}

// Основная функция для обработки отправки формы
export async function submitContactForm(formData: FormData): Promise<FormResult> {
  try {
    console.log("[SERVER ACTION] submitContactForm вызван с:", Object.fromEntries(formData.entries()))
    // Извлекаем данные из формы
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      honeypot: formData.get("website") as string, // Поле-ловушка для ботов
      formId: formData.get("formId") as string,
      timestamp: Number(formData.get("timestamp")),
      token: formData.get("token") as string,
    }

    // Проверяем токен для защиты от CSRF
    if (rawData.formId && rawData.timestamp && rawData.token) {
      if (!verifyFormToken(rawData.formId, rawData.timestamp, rawData.token)) {
        return {
          success: false,
          message: "Ошибка проверки безопасности. Пожалуйста, попробуйте еще раз.",
        }
      }
    }

    // Валидация данных
    const validationResult = FormSchema.safeParse(rawData)

    if (!validationResult.success) {
      return {
        success: false,
        message: "Пожалуйста, проверьте правильность заполнения формы.",
      }
    }

    const { name, phone } = validationResult.data

    // Подготовка данных для отправки
    const formattedData = {
      name,
      phone,
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
      source: formData.get("source") || "Сайт",
      utmSource: formData.get("utm_source") || "",
      utmMedium: formData.get("utm_medium") || "",
      utmCampaign: formData.get("utm_campaign") || "",
    }

    // Массив промисов для параллельной отправки во все каналы
    const sendPromises = []

    // 1. Отправка в Google Sheets (основной канал)
    if (process.env.GOOGLE_SHEETS_ID) {
      sendPromises.push(
        appendToGoogleSheet(formattedData).catch(() => {
          throw new Error("Не удалось сохранить данные в Google Sheets")
        }),
      )
    }

    // 2. Отправка уведомления в Telegram (быстрое уведомление)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const message = `🔔 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📅 Дата: ${formattedData.date}\n🔍 Источник: ${formattedData.source}\n\nUTM: ${formattedData.utmSource} / ${formattedData.utmMedium} / ${formattedData.utmCampaign}`

      sendPromises.push(
        sendTelegramNotification(message).catch(() => {
          // Не выбрасываем ошибку, так как это дополнительный канал
        }),
      )
    }

    // Ждем выполнения всех отправок
    await Promise.all(sendPromises)

    // Возвращаем успешный результат
    return {
      success: true,
      message: "Заявка успешно отправлена!",
      data: { name },
    }
  } catch (error) {
    // Возвращаем ошибку
    return {
      success: false,
      message: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.",
    }
  }
}
