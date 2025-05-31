"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { submitContactForm, generateFormToken } from "../app/actions/form-actions"
import { SuccessPopup } from "./ui/success-popup"
import { useAnalytics } from "../hooks/use-analytics"
import { getSavedUTMParams } from "../utils/utm-utils"
import { useBrowserDetect } from "../hooks/use-browser-detect"

interface ContactFormProps {
  formId?: string
  source?: string
  alternativeMessage?: boolean
  className?: string
}

export default function ContactForm({
  formId = "main-contact-form",
  source = "Главная форма",
  alternativeMessage = false,
  className = "",
}: ContactFormProps) {
  // Состояния формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rawPhone: "", // Для хранения только цифр
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
    const initializeForm = async () => {
      const timestamp = Date.now()
      setFormTimestamp(timestamp)
      const token = await generateFormToken(formId, timestamp)
      setFormToken(token)
    }
    initializeForm()
  }, [formId])

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
        event_label: formId,
        form_name: formId,
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
      // Создаем объект FormData для отправки
      const formDataToSend = new FormData(formRef.current || undefined)

      // Добавляем дополнительные данные
      formDataToSend.append("formId", formId)
      formDataToSend.append("timestamp", formTimestamp.toString())
      formDataToSend.append("token", formToken)
      formDataToSend.append("source", source)

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
        event_label: formId,
        form_name: formId,
        form_success: result.success,
      })

      // Если успешно, показываем сообщение об успехе
      if (result.success) {
        const resetForm = async () => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            phone: "",
            rawPhone: "",
          })

          // Генерируем новый токен для следующей отправки
          const newTimestamp = Date.now()
          setFormTimestamp(newTimestamp)
          const newToken = await generateFormToken(formId, newTimestamp)
          setFormToken(newToken)

          // Отслеживаем закрытие формы успешной отправки
          trackEvent("cta_click", "close_success_message", {
            event_category: "form",
            event_label: formId,
          })
        }
        resetForm()

        // Генерируем событие об успешной отправке формы
        window.dispatchEvent(new Event("formSubmitted"))
      }
    } catch (error) {
      // Отслеживаем ошибку отправки формы
      trackEvent("form_error", "form_error", {
        event_category: "form",
        event_label: formId,
        form_name: formId,
        error_message: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      // Сбрасываем состояние отправки
      setIsSubmitting(false)
    }
  }

  // Обработчик закрытия попапа успешной отправки
  const handleCloseSuccessPopup = () => {
    setIsSubmitted(false)

    // Отслеживаем закрытие попапа
    trackEvent("cta_click", "close_success_popup", {
      event_category: "form",
      event_label: formId,
      form_name: formId,
    })
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-[#595959]"
        data-form={formId}
        data-form-name={formId}
      >
        {/* Скрытое поле для защиты от спама (honeypot) */}
        <div className="hidden">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mb-4">
          <label
            htmlFor={`name-${formId}`}
            className="block text-sm font-medium mb-1 text-left text-gray-600 dark:text-gray-300"
          >
            Ваше имя
          </label>
          <input
            type="text"
            id={`name-${formId}`}
            name="name"
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

        <div className="mb-6">
          <label
            htmlFor={`phone-${formId}`}
            className="block text-sm font-medium mb-1 text-left text-gray-600 dark:text-gray-300"
          >
            Телефон
          </label>
          <input
            type="tel"
            id={`phone-${formId}`}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-70"
          data-event="form_submit"
          data-event-category="form"
          data-event-label={formId}
          data-track-cta={`submit_${formId}`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Отправка...
            </>
          ) : (
            <>• ЗАПИСАТЬСЯ НА БЕСПЛАТНЫЙ УРОК</>
          )}
        </button>
      </form>

      {/* Попап успешной отправки */}
      <SuccessPopup
        isOpen={isSubmitted}
        onClose={handleCloseSuccessPopup}
        autoCloseTime={5000}
        alternativeMessage={alternativeMessage}
      />
    </div>
  )
}
