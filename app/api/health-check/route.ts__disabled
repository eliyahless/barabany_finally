import { NextResponse } from "next/server"

export async function GET() {
  // Проверка основных компонентов системы
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  }

  try {
    // Здесь можно добавить проверку подключения к базе данных или другим сервисам
    // например:
    // await db.query('SELECT 1');

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    healthCheck.message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(healthCheck, { status: 503 })
  }
}
