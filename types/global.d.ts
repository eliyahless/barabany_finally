interface Window {
  gtag: (
    command: string,
    action: string,
    params?: {
      event_category?: string
      event_label?: string
      [key: string]: any
    }
  ) => void
  ym: (
    id: string | number,
    action: string,
    goal: string,
    params?: {
      [key: string]: any
    }
  ) => void
} 