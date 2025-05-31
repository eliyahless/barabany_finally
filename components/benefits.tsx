import AnimateOnScroll from "./animate-on-scroll"
import Image from "next/image"

export default function Benefits() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 mb-8 md:mb-12 lg:mb-20">
        {/* Левая колонка - заголовок */}
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
              БЕЗ ЛЕКЦИЙ,
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-500 dark:text-gray-400 mb-4 md:mb-6">
              БЕЗ НУДНЫХ УПРАЖНЕНИЙ
            </h3>
          </div>
        </AnimateOnScroll>

        {/* Правая колонка - текст */}
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="flex items-center h-full">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white leading-relaxed">
              Профессиональные музыканты помогут пройти путь от аккордов до полноценных выступлений. Репетиции в
              группах, современное оборудование и живые концерты. Запишись сейчас — и скоро ты выйдешь из тени в свет
              софитов!
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Изображение внизу с фигурной верхней границей */}
      <AnimateOnScroll animation="fade-up" delay={300}>
        <div className="relative w-full">
          {/* Изображение */}
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/M00A6538.jpg-DroudHTjJWFE2FU2SCfGudwfkGyhg5.jpeg"
              alt="Барабанщик в студии"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
