import { getCityBySlug } from "@/data/cities"
import PageTemplate from "@/components/page-template"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface CityPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city)

  if (!city) {
    return {
      title: "Страница не найдена | Не Школа",
      description: "Запрашиваемая страница не найдена",
    }
  }

  return {
    title: `Барабаны для взрослых в ${city.name} | Не Школа`,
    description: `Никогда не поздно начать играть на барабанах в ${city.name}. Присоединяйтесь к нашим урокам для взрослых и откройте свой ритм. Запишитесь на бесплатное пробное занятие!`,
    alternates: {
      canonical: `https://barabany-neshkola.ru/${city.slug}`,
    },
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city)

  // Если город не найден, показываем 404
  if (!city) {
    notFound()
  }

  return <PageTemplate city={city} />
}

// Генерируем статические пути для всех городов
export async function generateStaticParams() {
  const cities = await import("@/data/cities").then((module) => module.cities)

  return cities.map((city) => ({
    city: city.slug,
  }))
} 