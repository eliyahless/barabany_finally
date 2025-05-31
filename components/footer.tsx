import Link from "next/link"
import Image from "next/image"
import AnimateOnScroll from "./animate-on-scroll"

export default function Footer() {
  return (
    <footer className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8 mt-6 sm:mt-8 md:mt-16 safe-bottom">
      <AnimateOnScroll animation="fade-up">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="mb-2 md:mb-0">
            <div className="relative h-7 sm:h-8 md:h-10 w-24 sm:w-32 md:w-40">
              <Image
                src="/logo.png"
                alt="Не Школа Барабанов"
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
              />
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center md:text-left my-2 md:my-0">
            © {new Date().getFullYear()} Не Школа. Все права защищены.
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 text-center sm:text-left">
            <Link
              href="/privacy"
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors py-1 sm:py-0"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors py-1 sm:py-0"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </AnimateOnScroll>
    </footer>
  )
}
