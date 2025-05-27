"use server"

import { z } from "zod"
import { WEBHOOK_CONFIG } from "@/config/webhook"
import { appendToGoogleSheet } from "@/lib/google-sheets"

// Схема валидации для формы
const FormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+7\d{10}$/, "Неверный формат номера телефона"),
  honeypot: z.string().max(0, "Обнаружен бот").optional(),
})

// Тип для результата отправки формы
type FormResult = {
  success: boolean
  message: string
  data?: any
}

// Функция для отправки данных на вебхук
async function sendToWebhook(data: any): Promise<boolean> {
  if (!WEBHOOK_CONFIG.url) return false

  try {
    const response = await fetch(WEBHOOK_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.ok
  } catch (error) {
    console.error('Ошибка отправки на вебхук:', error)
    return false
  }
}

// Основная функция для обработки отправки формы
export async function submitContactForm(formData: FormData): Promise<FormResult> {
  try {
    // Извлекаем данные из формы
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      honeypot: formData.get("website") as string, // Поле-ловушка для ботов
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

    // Пытаемся отправить на вебхук
    const webhookSuccess = await sendToWebhook(formattedData)

    // Если вебхук недоступен и включен fallback, отправляем в Google Sheets
    if (!webhookSuccess && WEBHOOK_CONFIG.fallbackToGoogleSheets && WEBHOOK_CONFIG.googleSheetsId) {
      await appendToGoogleSheet(formattedData)
    }

    // Возвращаем успешный результат
    return {
      success: true,
      message: "Заявка успешно отправлена!",
      data: { name },
    }
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)
    // Возвращаем ошибку
    return {
      success: false,
      message: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.",
    }
  }
}
