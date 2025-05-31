/**
 * Конфигурация мониторинга для будущего использования
 *
 * Этот файл содержит настройки для быстрого подключения мониторинга
 * через UptimeRobot или аналогичные сервисы.
 *
 * Инструкция по настройке:
 * 1. Зарегистрируйтесь на UptimeRobot (https://uptimerobot.com/)
 * 2. Создайте новый монитор типа "HTTP(s)"
 * 3. Укажите URL вашего сайта: https://neshkola.ru
 * 4. Настройте интервал проверки (рекомендуется 5 минут)
 * 5. Настройте уведомления (email, SMS, webhook)
 *
 * Для расширенного мониторинга:
 * - Создайте дополнительный эндпоинт /api/health-check
 * - Настройте мониторинг для этого эндпоинта
 * - Добавьте проверку ключевых функций сайта
 */

// Пример эндпоинта для проверки здоровья системы
// Создайте файл app/api/health-check/route.ts с этим содержимым:

/*
import { NextResponse } from 'next/server';

export async function GET() {
  // Проверка основных компонентов системы
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  try {
    // Здесь можно добавить проверку подключения к базе данных или другим сервисам
    // например:
    // await db.query('SELECT 1');
    
    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    healthCheck.message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(healthCheck, { status: 503 });
  }
}
*/

// Экспортируем конфигурацию для использования в будущем
module.exports = {
  // Основные URL для мониторинга
  endpoints: [
    {
      url: "https://barabany-neshkola.ru",
      name: "Главная страница",
      interval: 5, // минуты
    },
    {
      url: "https://barabany-neshkola.ru/api/health-check",
      name: "API Health Check",
      interval: 5, // минуты
    },
  ],

  // Контакты для уведомлений
  contacts: [
    {
      name: "Администратор",
      email: "admin@neshkola.ru",
      phone: "+7XXXXXXXXXX", // Замените на реальный номер
    },
  ],

  // Настройки для резервного копирования
  backup: {
    frequency: "daily", // daily, weekly, monthly
    retention: 7, // количество сохраняемых копий
    storage: [
      {
        type: "local",
        path: "/backups",
      },
      {
        type: "cloud",
        provider: "aws-s3", // aws-s3, google-cloud, dropbox
        bucket: "neshkola-backups",
      },
    ],
  },
}
