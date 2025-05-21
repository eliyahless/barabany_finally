"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import AnimateOnScroll from "./animate-on-scroll"
import OptimizedImage from "@/components/ui/optimized-image"
import { Plus, Check, ArrowLeft } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { getSavedUTMParams } from "@/utils/utm-utils"
import { useBrowserDetect } from "@/hooks/use-browser-detect"
import { submitContactForm, generateFormToken } from "@/app/actions/form-actions"

export default function ContactCta() {
  // Состояния формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rawPhone: "", // Для хранения только цифр
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAlternativeMessage, setIsAlternativeMessage] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [formTimestamp, setFormTimestamp] = useState<number>(0)
  const [formToken, setFormToken] = useState<string>("")

  // Рефы
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Хуки
  const { trackEvent } = useAnalytics()
  const { isIOS } = useBrowserDetect()

  // Инициализация формы
  useEffect(() => {
    // Генерируем временную метку и токен для защиты от CSRF
    const timestamp = Date.now()
    setFormTimestamp(timestamp)
    setFormToken(generateFormToken("contact-cta-form", timestamp))

    // Случайно выбираем один из двух вариантов сообщения
    setIsAlternativeMessage(Math.random() > 0.5)
  }, [])

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "phone") {
      // Обрабатываем только поле телефона
      const digitsOnly = value.replace(/\D/g, "")

      // Ограничиваем до 10 цифр (без учета +7)
      const truncatedDigits = digitsOnly.slice(0, 10)

      // Форматируем номер с маской
      let formattedPhone = "+7"
      if (truncatedDigits.length > 0) {
        formattedPhone += " (" + truncatedDigits.slice(0, 3)

        if (truncatedDigits.length > 3) {
          formattedPhone += ") " + truncatedDigits.slice(3, 6)

          if (truncatedDigits.length > 6) {
            formattedPhone += "-" + truncatedDigits.slice(6, 8)

            if (truncatedDigits.length > 8) {
              formattedPhone += "-" + truncatedDigits.slice(8, 10)
            }
          }
        }
      }

      // Обновляем состояние
      setFormData((prev) => ({
        ...prev,
        phone: formattedPhone,
        rawPhone: truncatedDigits,
      }))
    } else {
      // Для других полей обычная обработка
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Отслеживаем начало заполнения формы
    if (formData.name === "" && formData.phone === "") {
      trackEvent("form_start", "form_start", {
        event_category: "form",
        event_label: "contact_cta_form",
        form_name: "contact_cta",
      })
    }
  }

  // Обработчик фокуса на поле телефона
  const handlePhoneFocus = () => {
    // Если поле пустое, добавляем +7
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+7" }))
    }

    // Устанавливаем курсор после +7
    if (phoneInputRef.current) {
      setTimeout(() => {
        const length = phoneInputRef.current?.value.length || 0
        phoneInputRef.current?.setSelectionRange(length, length)
      }, 0)
    }

    setIsFocused("phone")

    // Для iOS добавляем дополнительную обработку
    if (isIOS) {
      // Предотвращаем скролл на iOS
      setTimeout(() => {
        const scrollY = window.scrollY
        window.scrollTo(0, scrollY)
      }, 100)
    }
  }

  // Обработчик фокуса на поле имени
  const handleNameFocus = () => {
    setIsFocused("name")
  }

  // Обработчик потери фокуса
  const handleBlur = () => {
    setIsFocused(null)

    // На iOS прокручиваем страницу обратно, если была прокрутка при фокусе
    if (isIOS) {
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY,
          behavior: "auto",
        })
      }, 100)
    }
  }

  // Валидация формы перед отправкой
  const validateForm = (): boolean => {
    // Проверяем имя (минимум 2 символа)
    if (!formData.name || formData.name.trim().length < 2) {
      return false
    }

    // Проверяем телефон (должен содержать 10 цифр после +7)
    if (!formData.rawPhone || formData.rawPhone.length !== 10) {
      return false
    }

    return true
  }

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Проверяем валидность формы
    if (!validateForm() || isSubmitting) {
      return
    }

    // Устанавливаем состояние отправки
    setIsSubmitting(true)

    try {
      // Проверяем, находимся ли мы в среде предварительного просмотра v0
      const isPreviewEnvironment =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("v0.dev") || window.location.hostname.includes("localhost"))

      // В среде предварительного просмотра имитируем успешную отправку
      if (isPreviewEnvironment) {
        console.log("Preview mode: Form data", formData)

        // Имитация задержки сетевого запроса
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Отслеживаем отправку формы
        trackEvent("form_submit", "form_submit", {
          event_category: "form",
          event_label: "contact_cta_form",
          form_name: "contact_cta",
          form_success: true,
        })

        // Показываем сообщение об успехе
        setIsSubmitted(true)

        // Генерируем событие об успешной отправке формы
        window.dispatchEvent(new Event("formSubmitted"))

        return
      }

      // Для реальной среды - оставляем оригинальный код
      // Создаем объект FormData для отправки
      const formDataToSend = new FormData(formRef.current || undefined)

      // Добавляем дополнительные данные
      formDataToSend.append("formId", "contact-cta-form")
      formDataToSend.append("timestamp", formTimestamp.toString())
      formDataToSend.append("token", formToken)
      formDataToSend.append("source", "Форма в блоке CTA")

      // Добавляем UTM-метки, если они есть
      const utmParams = getSavedUTMParams()
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value)
        }
      })

      // Отправляем форму
      const result = await submitContactForm(formDataToSend)

      // Отслеживаем отправку формы
      trackEvent("form_submit", "form_submit", {
        event_category: "form",
        event_label: "contact_cta_form",
        form_name: "contact_cta",
        form_success: result.success,
      })

      // Если успешно, показываем сообщение об успехе
      if (result.success) {
        setIsSubmitted(true)

        // Генерируем событие об успешной отправке формы
        window.dispatchEvent(new Event("formSubmitted"))
      } else {
        // Если ошибка, можно добавить обработку (например, показать сообщение)
        console.error("Ошибка при отправке формы:", result.message)
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error)

      // Отслеживаем ошибку отправки формы
      trackEvent("form_error", "form_error", {
        event_category: "form",
        event_label: "contact_cta_form",
        form_name: "contact_cta",
        error_message: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      // Сбрасываем состояние отправки
      setIsSubmitting(false)
    }
  }

  // Обработчик сброса формы
  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({
      name: "",
      phone: "",
      rawPhone: "",
    })

    // Генерируем новый токен для следующей отправки
    const newTimestamp = Date.now()
    setFormTimestamp(newTimestamp)
    setFormToken(generateFormToken("contact-cta-form", newTimestamp))

    // Отслеживаем закрытие формы успешной отправки
    trackEvent("cta_click", "close_success_message", {
      event_category: "form",
      event_label: "contact_cta_form",
    })
  }

  return (
    <section id="contact" className="container mx-auto px-4 py-12 md:py-16 lg:py-24 safe-bottom">
      <AnimateOnScroll animation="fade-up" threshold={0.05} rootMargin="-50px 0px">
        <div className="bg-white dark:bg-zinc-900 border-2 border-orange-500 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Левая колонка - контент и форма или сообщение об успешной отправке */}
            <div className="p-4 sm:p-5 md:p-8 lg:p-10">
              {!isSubmitted ? (
                // Форма
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white tracking-tight leading-tight">
                    Запишитесь на урок в{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                      не школу
                    </span>
                  </h2>

                  <div className="flex items-center mb-6 md:mb-8 text-gray-700 dark:text-white">
                    <Plus className="text-orange-500 mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Первый урок бесплатно для всех новых учеников
                    </span>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                    data-form="contact-cta"
                    data-form-name="contact-cta"
                  >
                    {/* Скрытое поле для защиты от спама (honeypot) */}
                    <div className="hidden">
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300"
                        >
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Например, Кирилл"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={handleNameFocus}
                          onBlur={handleBlur}
                          className={`w-full px-3 py-2 border border-[#595959] focus:outline-none focus:ring-2 focus:ring-[#ffc800] rounded-md ${
                            isFocused === "name" ? "ring-2 ring-orange-500 border-orange-500" : ""
                          }`}
                          data-field="name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300"
                        >
                          Телефон
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          ref={phoneInputRef}
                          placeholder="+7"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={handlePhoneFocus}
                          onBlur={handleBlur}
                          className={`w-full px-3 py-2 border border-[#595959] focus:outline-none focus:ring-2 focus:ring-[#ffc800] rounded-md ${
                            isFocused === "phone" ? "ring-2 ring-orange-500 border-orange-500" : ""
                          }`}
                          inputMode="tel"
                          data-field="phone"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                      data-event="form_submit"
                      data-event-category="form"
                      data-event-label="contact_cta_form"
                      data-track-cta="submit_contact_cta_form"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Отправка...
                        </>
                      ) : (
                        <span>Записаться на бесплатный урок</span>
                      )}
                    </button>

                    <div className="flex items-center mt-4">
                      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-2 border-orange-500 rounded-lg mr-3 text-gray-800 dark:text-white font-bold text-sm md:text-base">
                        5
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        Свободных мест на ближайшее занятие!
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                // Сообщение об успешной отправке
                <div className="animate-fade-in flex flex-col h-full justify-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Check className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white text-center">
                    Готово.
                  </h2>

                  <div className="text-center mb-8">
                    {isAlternativeMessage ? (
                      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200">
                        Ты в игре.
                        <br />
                        Скоро мы тебе напишем.
                      </p>
                    ) : (
                      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200">
                        Заявка принята.
                        <br />
                        Мы свяжемся с тобой в ближайшее время.
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center"
                    data-event="cta_click"
                    data-event-category="form"
                    data-event-label="close_success_message"
                    data-track-cta="close_success_message"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    <span>Закрыть</span>
                  </button>
                </div>
              )}
            </div>

            {/* Правая колонка - изображение */}
            <div className="relative bg-gray-100 dark:bg-black h-[200px] sm:h-[250px] md:h-full">
              <OptimizedImage
                src="/drummer-pink-hoodie.jpeg"
                alt="Барабанщик с палочками"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
