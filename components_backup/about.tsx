import AnimateOnScroll from "./animate-on-scroll"

export default function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <AnimateOnScroll animation="fade-up">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-16 text-gray-800 dark:text-white tracking-tight leading-none transition-all duration-700">
          Не школа
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600"> это</span>
        </h2>
      </AnimateOnScroll>

      <div className="mt-8 md:mt-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Первый блок */}
          <AnimateOnScroll animation="fade-up">
            <div className="flex flex-col items-center">
              <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-orange-500 tracking-tighter leading-tight mb-4">
                285 школ
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white tracking-wide font-normal text-center max-w-[280px] mt-2">
                Самая большая международная сеть музыкальных школ
              </p>
            </div>
          </AnimateOnScroll>

          {/* Второй блок */}
          <AnimateOnScroll animation="fade-up" delay={150}>
            <div className="flex flex-col items-center">
              <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-orange-500 tracking-tighter leading-tight mb-4 -translate-x-[4px]">
                10 лет
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white tracking-wide font-normal text-center max-w-[280px] mt-2">
                Учим музыке. Каждый день.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Третий блок */}
          <AnimateOnScroll animation="fade-up" delay={300}>
            <div className="flex flex-col items-center">
              <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-orange-500 tracking-tighter leading-tight mb-4">
                100 000+
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white tracking-wide font-normal text-center max-w-[280px] mt-2">
                Обучили музыке. И продолжаем.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
