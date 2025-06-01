/**
 * Утилита для отправки уведомлений в Telegram
 */

// Функция для отправки сообщения в Telegram
export async function sendTelegramNotification(message: string): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

<<<<<<< HEAD
    if (!botToken || !chatId) {
=======
    console.log("[TELEGRAM] Попытка отправки:", { botToken, chatId, message })

    if (!botToken || !chatId) {
      console.log("[TELEGRAM] Нет botToken или chatId!")
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
      return false
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

<<<<<<< HEAD
=======
    const result = await response.json()
    console.log("[TELEGRAM] Ответ Telegram:", result)

>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
    if (!response.ok) {
      return false
    }

    return true
  } catch (error) {
<<<<<<< HEAD
=======
    console.log("[TELEGRAM] Ошибка:", error)
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
    return false
  }
}
