"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { submitContactForm } from "@/app/actions/form-actions"
import { trackEvent } from "@/lib/analytics"

interface ContactFormProps {
  formId?: string
  source?: string
  className?: string
}

export default function ContactForm({
  formId = "main-contact-form",
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
      return false
    }

    return true
  }

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus({ type: null, message: "" })

    if (!validateForm() || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      // Создаем объект FormData для отправки
      const formDataToSend = new FormData(formRef.current || undefined)

      // Добавляем дополнительные данные
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
      trackEvent("form_error", "form_error", {
        event_category: "form",
        event_label: formId,
        form_name: formId,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
  )
}
