export function CriticalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      /* Критические стили для предотвращения CLS */
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      
      /* Предварительные размеры для элементов, которые будут загружены */
      .hero-image-placeholder {
        aspect-ratio: 16/9;
        background-color: #f0f0f0;
      }
      
      /* Предотвращение FOUT */
      .invisible-until-fonts-loaded {
        opacity: 0;
      }
      
      html.fonts-loaded .invisible-until-fonts-loaded {
        opacity: 1;
        transition: opacity 0.2s ease;
      }
    `,
      }}
    />
  )
}
