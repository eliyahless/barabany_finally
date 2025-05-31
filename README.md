# Не Школа Барабанов - Лендинг

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Responsive](https://img.shields.io/badge/Responsive-Ready-success?style=for-the-badge&logo=google-chrome&logoColor=white)](https://github.com/yourusername/neshkola)

## 📌 Назначение проекта

Лендинг для школы барабанов "Не Школа" в Москве. Сайт предназначен для привлечения взрослых учеников, желающих научиться играть на барабанах с нуля. Основная цель — конвертация посетителей в заявки на бесплатный пробный урок.

## 🚀 Что реализовано

- **Адаптивный дизайн** — корректное отображение на устройствах от 320px до 1920px+
- **Темная и светлая темы** — автоматическое определение и возможность переключения
- **Формы обратной связи** — с валидацией, защитой от ботов и CSRF
- **Интеграции**:
  - Google Sheets — для сохранения заявок
  - Telegram — для мгновенных уведомлений о новых заявках
- **Оптимизация**:
  - Lazy loading компонентов и изображений
  - Оптимизация шрифтов и предзагрузка критических ресурсов
  - Минификация и сжатие CSS/JS
- **UX-улучшения**:
  - Липкая кнопка CTA на мобильных устройствах
  - Анимации при скролле
  - Плавная навигация по якорям
- **SEO-оптимизация**:
  - Структурированные данные (Schema.org)
  - Оптимизированные мета-теги
  - Sitemap и robots.txt

## 🛠 Используемые технологии

- **Frontend**:
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
- **Оптимизация**:
  - PostCSS (autoprefixer, cssnano)
  - SWC минификация
  - Brotli сжатие
- **Инфраструктура**:
  - Vercel для хостинга
  - Vercel Edge Functions для middleware
- **Аналитика** (опционально):
  - Яндекс.Метрика
  - Google Tag Manager
  - Facebook Pixel
  - VK Pixel

## 🔐 Переменные окружения

Перед деплоем необходимо настроить переменные окружения. Пример можно найти в файле `.env.example`.

## 📦 Инструкция по локальному запуску

1. Клонировать репозиторий:
\`\`\`bash
git clone https://github.com/your-username/neshkola.git
cd neshkola
\`\`\`

2. Установить зависимости:
\`\`\`bash
npm install
\`\`\`

3. Создать файл `.env.local` на основе `.env.example` и заполнить необходимые переменные окружения.

4. Запустить проект в режиме разработки:
\`\`\`bash
npm run dev
\`\`\`

5. Открыть [http://localhost:3000](http://localhost:3000) в браузере.

## 🧪 Что протестировано

- **Браузеры**:
  - Chrome (последние 2 версии)
  - Firefox (последние 2 версии)
  - Safari (последние 2 версии)
  - Edge (последние 2 версии)
- **Устройства**:
  - Мобильные (320px, 375px, 414px)
  - Планшеты (768px, 1024px)
  - Десктопы (1280px, 1440px, 1920px)
- **Функциональность**:
  - Отправка форм и валидация
  - Навигация по якорям
  - Переключение темы
  - Адаптивность интерфейса
  - Поведение липкой кнопки
  - Загрузка и отображение изображений

## 📄 Особенности

- **Режим предпросмотра**: В режиме предпросмотра (v0.dev или localhost) API-вызовы к Google Sheets и Telegram заменяются моками для возможности тестирования без реальных API-ключей.

- **Липкая кнопка CTA**: Появляется только на мобильных устройствах после скролла на 300px и автоматически скрывается, когда форма попадает в область видимости или после успешной отправки формы.

- **Оптимизация шрифтов**: Реализована стратегия FOUT (Flash of Unstyled Text) с использованием системных шрифтов до загрузки кастомных для предотвращения прыжков контента.

- **Кроссбраузерные исправления**: Добавлены специальные исправления для iOS Safari (проблемы с 100vh, фиксированными элементами, фокусом на инпутах).

- **Безопасность**: Реализована защита от CSRF-атак с использованием токенов, защита от ботов с помощью honeypot-полей и минимального времени заполнения формы.

## ✅ Состояние

Проект полностью готов к продакшн-деплою. Все компоненты протестированы, оптимизированы и работают корректно. Код очищен от отладочных сообщений и временных заглушек. Можно загружать в GitHub и деплоить на Vercel без дополнительных доработок.

## 📁 Структура проекта

\`\`\`
neshkola/
├── app/                  # Next.js App Router
│   ├── actions/          # Server Actions для форм
│   ├── api/              # API Routes
│   ├── globals.css       # Глобальные стили
│   ├── layout.tsx        # Корневой layout
│   └── page.tsx          # Главная страница
├── components/           # React компоненты
│   ├── analytics/        # Компоненты для аналитики
│   ├── seo/              # SEO компоненты
│   ├── ui/               # UI компоненты
│   └── ...               # Основные компоненты страницы
├── hooks/                # React хуки
├── lib/                  # Утилиты и API клиенты
├── public/               # Статические файлы
│   ├── fonts/            # Шрифты
│   └── ...               # Изображения и другие ресурсы
├── utils/                # Вспомогательные функции
├── .env.example          # Пример переменных окружения
├── .env.production       # Продакшн переменные окружения
├── next.config.mjs       # Конфигурация Next.js
├── postcss.config.js     # Конфигурация PostCSS
├── tailwind.config.ts    # Конфигурация Tailwind CSS
└── vercel.json           # Конфигурация Vercel
\`\`\`

## 📜 Лицензия

[MIT](LICENSE)
\`\`\`

## 📝 Подробная инструкция по развертыванию и поддержке

### 1. Клонирование и подготовка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/eliyahless/barabany_finally.git
   cd barabany_finally
   ```
2. Установите Node.js (рекомендуется LTS 18.x или 20.x) и npm (8.x+).
3. Установите зависимости:
   ```bash
   npm install
   ```

### 2. Переменные окружения

- Используйте `.env.example` как шаблон:
  ```bash
  cp .env.example .env.production
  # или .env.local для локального запуска
  ```
- Заполните все переменные:
  - **NEXT_PUBLIC_SITE_URL** — основной домен сайта
  - **FORM_SECRET_KEY** — любой длинный случайный ключ (например, сгенерировать через `openssl rand -hex 32`)
  - **TELEGRAM_BOT_TOKEN**, **TELEGRAM_CHAT_ID** — для уведомлений о заявках
  - **GOOGLE_SHEETS_ID** и связанные — для интеграции с Google Sheets
  - **RESEND_API_KEY** и email — если нужна email-рассылка
  - **Аналитика** — включайте нужные пиксели (true/false) и указывайте ID

### 3. Сборка и запуск

1. Соберите проект:
   ```bash
   npm run build
   ```
2. Запустите через PM2:
   ```bash
   pm2 start npm --name "barabany-neshkola" -- run start
   pm2 save
   pm2 startup
   ```
3. Для перезапуска после изменений:
   ```bash
   npm run build
   pm2 restart barabany-neshkola
   ```

### 4. Настройка nginx (рекомендуется)

- Пример конфига — в `nginx.conf.example`.
- Проксируйте 80/443 порт на 3000 (Next.js).
- Не забудьте про SSL (Let's Encrypt или свой сертификат).

### 5. Восстановление и откат

- Чтобы восстановить проект:
  ```bash
  git clone https://github.com/eliyahless/barabany_finally.git
  cd barabany_finally
  npm install
  npm run build
  pm2 start npm --name "barabany-neshkola" -- run start
  ```
- Для отката к нужному коммиту:
  ```bash
  git checkout <commit_hash>
  npm install
  npm run build
  pm2 restart barabany-neshkola
  ```

### 6. Частые ошибки и решения

- **Ошибка с алиасами (@/components/...)** — всегда используйте относительные пути (`./ui/volume-button`), как в актуальной версии.
- **Не работает отправка форм** — проверьте переменные для Google Sheets и Telegram, а также секретный ключ.
- **Проблемы с шрифтами или стилями** — убедитесь, что все файлы из папки `public/fonts` и `public/` загружены на сервер.
- **Ошибка при билде** — внимательно читайте вывод, чаще всего не хватает зависимостей или не тот Node.js.
- **Проблемы с nginx** — проверьте, что proxy_pass указывает на 127.0.0.1:3000 и нет конфликтов портов.

### 7. Интеграции

- **Google Sheets** — сервисный аккаунт должен иметь доступ к таблице, ключи должны быть корректно скопированы в `.env.production`.
- **Telegram** — бот должен быть добавлен в чат, chat_id можно узнать через @userinfobot.
- **Email (Resend)** — опционально, для уведомлений на почту.
- **Аналитика** — включайте только нужные пиксели, чтобы не грузить лишний JS.

### 8. Советы по безопасности и обновлению

- Не храните реальные секреты в публичном репозитории!
- Для продакшн используйте `.env.production`, для локальной разработки — `.env.local`.
- Регулярно делайте бэкапы базы и .env файлов.
- После обновления зависимостей всегда тестируйте билд и функционал.
