import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Получаем параметры из URL
    const title = searchParams.get("title") || "Не Школа Барабанов"
    const subtitle = searchParams.get("subtitle") || "Школа барабанов для взрослых в Москве"
    const theme = searchParams.get("theme") || "dark"

    // Определяем цвета в зависимости от темы
    const bgColor = theme === "dark" ? "#000000" : "#ffffff"
    const textColor = theme === "dark" ? "#ffffff" : "#000000"
    const accentColor = "#ff5500"

    // Загружаем шрифты
    // const interBold = await fetch(
    //   new URL("../../../public/fonts/BasisGrotesquePro-Regular.woff", import.meta.url),
    // ).then((res) => res.arrayBuffer())

    // Создаем OG-изображение
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: accentColor,
              margin: "0",
              lineHeight: "1.2",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h1>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "normal",
              color: textColor,
              margin: "20px 0 0 0",
              lineHeight: "1.4",
            }}
          >
            {subtitle}
          </h2>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: textColor, fontSize: "24px" }}>barabany-neshkola.ru</p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 700,
          },
        ],
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate OG image", { status: 500 })
  }
}
