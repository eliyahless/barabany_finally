import Link from "next/link"
import Image from "next/image"
import AnimateOnScroll from "./animate-on-scroll"

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-6 md:py-8 mt-8 md:mt-16 safe-bottom">
      <AnimateOnScroll animation="fade-up">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="relative h-8 md:h-10 w-32 md:w-40">
              <Image
                src="/logo.png"
                alt="Не Школа Барабанов"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center md:text-left my-4 md:my-0">
            © {new Date().getFullYear()} Не Школа. Все права защищены.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 text-center sm:text-left">
            <Link
              href="/privacy"
              className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </AnimateOnScroll>
    </footer>
  )
}
