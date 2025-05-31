"use client"

// Интерфейс для UTM-меток
export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  [key: string]: string | undefined
}

// Получение UTM-меток из URL
export function getUTMParams(): UTMParams {
  if (typeof window === "undefined") return {}

  const urlParams = new URLSearchParams(window.location.search)
  const utmParams: UTMParams = {}

  // Список всех возможных UTM-меток
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

  // Добавляем все найденные UTM-метки в объект
  utmKeys.forEach((key) => {
    const value = urlParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  return utmParams
}

// Сохранение UTM-меток в localStorage
export function saveUTMParams(): void {
  if (typeof window === "undefined") return

  const utmParams = getUTMParams()

  // Если есть UTM-метки, сохраняем их
  if (Object.keys(utmParams).length > 0) {
    localStorage.setItem("utm_params", JSON.stringify(utmParams))

    // Также сохраняем время, когда были получены UTM-метки
    localStorage.setItem("utm_timestamp", Date.now().toString())
  }
}

// Получение сохраненных UTM-меток
export function getSavedUTMParams(): UTMParams {
  if (typeof window === "undefined") return {}

  try {
    const savedParams = localStorage.getItem("utm_params")
    return savedParams ? JSON.parse(savedParams) : {}
  } catch (error) {
    console.error("Error getting saved UTM params:", error)
    return {}
  }
}

// Добавление UTM-меток к URL
export function addUTMParamsToUrl(url: string): string {
  if (typeof window === "undefined") return url

  const utmParams = getSavedUTMParams()

  if (Object.keys(utmParams).length === 0) return url

  const urlObj = new URL(url, window.location.origin)

  // Добавляем UTM-метки к URL
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      urlObj.searchParams.set(key, value)
    }
  })

  return urlObj.toString()
}

// Добавление UTM-меток к форме
export function addUTMParamsToForm(formElement: HTMLFormElement): void {
  const utmParams = getSavedUTMParams()

  if (Object.keys(utmParams).length === 0) return

  // Добавляем скрытые поля с UTM-метками к форме
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      // Проверяем, существует ли уже такое поле
      let input = formElement.querySelector(`input[name="${key}"]`) as HTMLInputElement

      if (!input) {
        // Если поля нет, создаем его
        input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        formElement.appendChild(input)
      }

      // Устанавливаем значение
      input.value = value
    }
  })
}
