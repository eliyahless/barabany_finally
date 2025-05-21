// Этот скрипт можно запустить с помощью Node.js для оптимизации шрифтов
// Пример использования: node scripts/optimize-fonts.js

/**
 * Этот скрипт демонстрирует процесс оптимизации шрифтов.
 * В реальном проекте вы можете использовать инструменты как:
 * - fonttools (Python)
 * - glyphhanger (Node.js)
 * - subfont (Node.js)
 *
 * Пример команды для glyphhanger:
 * npx glyphhanger --subset=*.woff2 --formats=woff2,woff --US_ASCII --output=public/fonts
 */

console.log("Инструкции по оптимизации шрифтов:")
console.log("1. Установите необходимые инструменты:")
console.log("   npm install -g glyphhanger")
console.log("   или")
console.log("   pip install fonttools brotli zopfli")
console.log("")
console.log("2. Создайте подмножества шрифтов:")
console.log("   glyphhanger --subset=*.woff2 --formats=woff2,woff --US_ASCII --output=public/fonts")
console.log("   или")
console.log('   pyftsubset font.ttf --unicodes="U+0000-00FF" --output-file="font.subset.woff2" --flavor=woff2')
console.log("")
console.log("3. Обновите пути к шрифтам в CSS")
console.log("")
console.log("Примечание: Этот скрипт является демонстрационным. В реальном проекте вы должны интегрировать")
console.log("оптимизацию шрифтов в ваш процесс сборки.")
