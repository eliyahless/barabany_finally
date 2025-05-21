"use client"

export function FontPreloader() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/BasisGrotesquePro-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preload" href="/fonts/AvantGardeCTT.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <style jsx global>{`
        /* Предварительно загруженные шрифты */
        @font-face {
          font-family: 'BasisGrotesquePro-Regular';
          src: local('BasisGrotesquePro-Regular'),
               url('/fonts/BasisGrotesquePro-Regular.woff2') format('woff2'),
               url('/fonts/BasisGrotesquePro-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        
        @font-face {
          font-family: 'AvantGardeCTT';
          src: local('AvantGardeCTT'),
               url('/fonts/AvantGardeCTT.woff2') format('woff2'),
               url('/fonts/AvantGardeCTT.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `}</style>
    </>
  )
}
