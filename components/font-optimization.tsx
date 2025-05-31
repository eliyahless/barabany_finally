"use client"

export function FontOptimization() {
  return (
    <style jsx global>{`
      /* Определение системных fallback-шрифтов для уменьшения CLS */
      :root {
        --font-basis: 'BasisGrotesquePro-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --font-avant: 'AvantGardeCTT', 'Arial', 'Helvetica', sans-serif;
      }
      
      /* Применение переменных шрифтов */
      .font-basis {
        font-family: var(--font-basis);
      }
      
      .font-avant {
        font-family: var(--font-avant);
      }
      
      /* Предотвращение FOUT (Flash of Unstyled Text) */
      .font-optimization-complete {
        opacity: 1;
        transition: opacity 0.1s ease;
      }
      
      html.fonts-loading * {
        /* Используем системные шрифты до загрузки пользовательских */
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
      }
    `}</style>
  )
}
