"use client"

import type React from "react"
import { useState, useRef } from "react"
import AnimateOnScroll from "./animate-on-scroll"
import ImageWithFallback from "./ui/image-with-fallback"
import { Plus } from "lucide-react"

export default function ContactCta() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rawPhone: "",
  })
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Форматирование номера для отображения
  function formatPhone(raw: string) {
    if (!raw) return ""
    const digits = raw.replace(/\D/g, "").slice(0, 10)
    if (!digits) return "+7"
    
    let formatted = "+7"
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`
    if (digits.length > 3) formatted += `) ${digits.slice(3, 6)}`
    if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`
    if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`
    
    return formatted
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, selectionStart } = e.target;

    if (name === "phone") {
      // Удаляем все нецифровые символы
      let digitsOnly = value.replace(/\D/g, "");
      // Если пользователь пытается удалить префикс, не даём этого сделать
      if (!digitsOnly.startsWith("7")) {
        digitsOnly = "7" + digitsOnly;
      }
      // Оставляем только 10 цифр после +7
      digitsOnly = digitsOnly.slice(0, 11); // 1 (семёрка) + 10 цифр
      // Не даём ввести 7 или 8 после +7
      let afterPrefix = digitsOnly.slice(1);
      if (afterPrefix.startsWith("7") || afterPrefix.startsWith("8")) {
        afterPrefix = afterPrefix.slice(1);
      }
      // Формируем итоговую строку
      const raw = afterPrefix.slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        phone: formatPhone(raw),
        rawPhone: raw,
      }));
      // После обновления value курсор всегда в конце
      setTimeout(() => {
        if (phoneInputRef.current) {
          const length = phoneInputRef.current.value.length;
          phoneInputRef.current.setSelectionRange(length, length);
        }
      }, 0);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneFocus = () => {
    // Если поле пустое, добавляем +7
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+7" }));
    }
    // Устанавливаем курсор после +7
    setTimeout(() => {
      if (phoneInputRef.current) {
        const length = phoneInputRef.current.value.length;
        phoneInputRef.current.setSelectionRange(length, length);
      }
    }, 0);
    setIsFocused("phone");
  };

  const handleNameFocus = () => {
    setIsFocused("name")
  }

  const handleBlur = () => {
    setIsFocused(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || formData.name.trim().length < 2) {
      alert("Введите имя (минимум 2 символа)")
      return
    }
    
    if (!formData.rawPhone || formData.rawPhone.length !== 10) {
      alert("Введите корректный номер телефона: 10 цифр после +7")
      return
    }
    
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    alert("Спасибо за интерес! Мы свяжемся с вами в ближайшее время для планирования бесплатного пробного урока.")
  }

  return (
    <section id="contact" className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-24 safe-bottom">
      <AnimateOnScroll animation="fade-up" threshold={0.05} rootMargin="-50px 0px">
        <div className="bg-white dark:bg-zinc-900 border-2 border-orange-500 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-0">
            {/* Левая колонка - контент и форма */}
            <div className="p-3 sm:p-5 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-800 dark:text-white tracking-tight leading-tight">
                Запишитесь на урок в{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  не школу
                </span>
              </h2>

              <div className="flex items-center mb-6 md:mb-8 text-gray-700 dark:text-white">
                <Plus className="text-orange-500 mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="text-sm md:text-base lg:text-lg">Первый урок бесплатно для всех новых учеников</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
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
                      required
                      className={`form-input text-base sm:text-lg ${isFocused === "name" ? "ring-2 ring-orange-500 border-orange-500" : ""}`}
                      ref={nameInputRef}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+7"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handleBlur}
                      ref={phoneInputRef}
                      required
                      className={`form-input text-base sm:text-lg ${isFocused === "phone" ? "ring-2 ring-orange-500 border-orange-500" : ""}`}
                      inputMode="tel"
                      autoComplete="off"
                      maxLength={18}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="cta-btn"
                >
                  Записаться на бесплатный урок <span className="ml-2">→</span>
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
            </div>

            {/* Правая колонка - изображение */}
            <div className="relative bg-gray-100 dark:bg-black h-[160px] sm:h-[220px] md:h-full">
              <ImageWithFallback
                src="/images/contact-cta.jpg"
                alt="Уроки музыки в не школе"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}

