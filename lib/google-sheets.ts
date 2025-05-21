/**
 * Утилита для работы с Google Sheets
 */

// Интерфейс для данных формы
interface FormData {
  name: string
  phone: string
  date: string
  source: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  [key: string]: any
}

// Функция для добавления данных в Google Sheets
export async function appendToGoogleSheet(data: FormData): Promise<boolean> {
  try {
    // Проверяем наличие необходимых переменных окружения
    if (
      !process.env.GOOGLE_SHEETS_ID ||
      !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    ) {
      return false
    }

    // Динамический импорт только в production-окружении
    try {
      // Динамически импортируем только когда это действительно необходимо
      const { google } = await import("googleapis")
      const { JWT } = await import("google-auth-library")

      // Создаем JWT клиент для аутентификации
      const client = new JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })

      // Инициализируем Google Sheets API
      const sheets = google.sheets({ version: "v4", auth: client })

      // Подготавливаем данные для добавления
      const values = [
        [
          data.name,
          data.phone,
          data.date,
          data.source || "Сайт",
          data.utmSource || "",
          data.utmMedium || "",
          data.utmCampaign || "",
        ],
      ]

      // Добавляем данные в таблицу
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: process.env.GOOGLE_SHEETS_RANGE || "Заявки!A:G",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      })

      // Проверяем успешность операции
      return response.status === 200
    } catch (importError) {
      return false
    }
  } catch (error) {
    return false
  }
}
