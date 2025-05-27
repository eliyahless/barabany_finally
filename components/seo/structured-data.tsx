import Script from "next/script"

export function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: "Не Школа Барабанов",
    description: "Школа барабанов для взрослых в Москве. Научитесь играть на барабанах с нуля. Первый урок бесплатно!",
    url: "http://79.174.93.221:3000",
    telephone: "+7XXXXXXXXXX", // Замените на реальный номер телефона
    email: "info@neshkola.ru", // Замените на реальный email
    address: {
      "@type": "PostalAddress",
      streetAddress: "Улица Примерная, 123", // Замените на реальный адрес
      addressLocality: "Москва",
      postalCode: "123456", // Замените на реальный индекс
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 55.7558, // Замените на реальные координаты
      longitude: 37.6173, // Замените на реальные координаты
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "11:00",
        closes: "18:00",
      },
    ],
    image: "http://79.174.93.221:3000/og-image.jpg",
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/neshkola", // Замените на реальные ссылки
      "https://www.instagram.com/neshkola",
      "https://vk.com/neshkola",
    ],
    offers: {
      "@type": "Offer",
      name: "Первый урок бесплатно",
      description: "Запишитесь на бесплатный пробный урок прямо сейчас!",
      price: "0",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: "http://79.174.93.221:3000/#contact",
      validFrom: "2023-01-01",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Нужен ли опыт для обучения в Не Школе Барабанов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Нет, опыт не требуется. Наша методика подходит для полных новичков. Мы научим вас играть с нуля.",
        },
      },
      {
        "@type": "Question",
        name: "Сколько стоит обучение в Не Школе Барабанов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Стоимость обучения зависит от выбранной программы. Первый пробный урок бесплатный для всех новых учеников.",
        },
      },
      {
        "@type": "Question",
        name: "Как записаться на бесплатный урок?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Вы можете записаться на бесплатный урок через форму на нашем сайте или позвонив по телефону. Мы свяжемся с вами для подтверждения времени занятия.",
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
