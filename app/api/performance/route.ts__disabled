import { NextResponse } from "next/server"

export async function GET() {
  // Проверка производительности системы
  const startTime = process.hrtime()

  // Имитация нагрузки
  const performanceCheck = {
    memory: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
  }

  // Измеряем время выполнения
  const endTime = process.hrtime(startTime)
  const executionTime = endTime[0] * 1000 + endTime[1] / 1000000 // в миллисекундах

  return NextResponse.json(
    {
      ...performanceCheck,
      executionTime: `${executionTime.toFixed(2)}ms`,
    },
    { status: 200 },
  )
}
