"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
<<<<<<< HEAD
import { submitContactForm, generateFormToken } from "../app/actions/form-actions"
import { SuccessPopup } from "./ui/success-popup"
import { useAnalytics } from "../hooks/use-analytics"
import { getSavedUTMParams } from "../utils/utm-utils"
import { useBrowserDetect } from "../hooks/use-browser-detect"
=======
import { submitContactForm } from "@/app/actions/form-actions"
import { trackEvent } from "@/lib/analytics"
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db

interface ContactFormProps {
  formId?: string
  source?: string
<<<<<<< HEAD
  alternativeMessage?: boolean
=======
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
  className?: string
}

export default function ContactForm({
  formId = "main-contact-form",
<<<<<<< HEAD
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
=======
  source = "Сайт",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+7",
    rawPhone: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const formRef = useRef<HTMLFormElement>(null)

  // Обработчик изменения имени
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, name: value }))
  }

  // Обработчик изменения телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    const truncatedDigits = value.slice(0, 10)

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

    setFormData((prev) => ({
      ...prev,
      phone: formattedPhone,
      rawPhone: truncatedDigits,
    }))
  }

  // Валидация формы
  const validateForm = (): boolean => {
    if (!formData.name || formData.name.trim().length < 2) {
      setSubmitStatus({
        type: "error",
        message: "Пожалуйста, введите корректное имя",
      })
      return false
    }

    if (!formData.rawPhone || formData.rawPhone.length !== 10) {
      setSubmitStatus({
        type: "error",
        message: "Пожалуйста, введите корректный номер телефона",
      })
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
      return false
    }

    return true
  }

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
<<<<<<< HEAD

    // Проверяем валидность формы
=======
    setSubmitStatus({ type: null, message: "" })

>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
    if (!validateForm() || isSubmitting) {
      return
    }

<<<<<<< HEAD
    // Устанавливаем состояние отправки
=======
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
    setIsSubmitting(true)

    try {
      // Создаем объект FormData для отправки
      const formDataToSend = new FormData(formRef.current || undefined)

      // Добавляем дополнительные данные
<<<<<<< HEAD
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
=======
      formDataToSend.append("source", source)

      // Добавляем UTM-метки
      const urlParams = new URLSearchParams(window.location.search)
      for (const [key, value] of urlParams.entries()) {
        if (key.startsWith("utm_")) {
          formDataToSend.append(key, value)
        }
      }

      const result = await submitContactForm(formDataToSend)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })

        // Отправляем событие в аналитику
        trackEvent("form_submit", "form_submit", {
          event_category: "form",
          event_label: formId,
          form_name: formId,
          form_success: true,
        })

        // Очищаем форму
        setFormData({
          name: "",
          phone: "+7",
          rawPhone: "",
        })

        // Отправляем событие о успешной отправке формы
        window.dispatchEvent(new Event("formSubmitted"))
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
        })

        // Отправляем событие об ошибке в аналитику
        trackEvent("form_error", "form_error", {
          event_category: "form",
          event_label: formId,
          form_name: formId,
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
      })

      // Отправляем событие об ошибке в аналитику
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
      trackEvent("form_error", "form_error", {
        event_category: "form",
        event_label: formId,
        form_name: formId,
<<<<<<< HEAD
        error_message: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      // Сбрасываем состояние отправки
=======
      })
    } finally {
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
      setIsSubmitting(false)
    }
  }

<<<<<<< HEAD
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
=======
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      data-form={formId}
      data-form-name={formId}
    >
      <div>
        <label
          htmlFor={`name-${formId}`}
          className="block text-sm font-medium text-gray-700"
        >
          Ваше имя
        </label>
        <input
          type="text"
          name="name"
          id={`name-${formId}`}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor={`phone-${formId}`}
          className="block text-sm font-medium text-gray-700"
        >
          Телефон
        </label>
        <input
          type="tel"
          name="phone"
          id={`phone-${formId}`}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="+7 (___) ___-__-__"
          value={formData.phone}
          onChange={handlePhoneChange}
          required
        />
      </div>

      {/* Скрытое поле для защиты от ботов */}
      <div className="hidden">
        <input type="text" name="website" />
      </div>

      {submitStatus.type && (
        <div
          className={`rounded-md p-4 ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        data-event="form_submit"
        data-event-category="form"
        data-event-label={formId}
      >
        {isSubmitting ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
  )
}
