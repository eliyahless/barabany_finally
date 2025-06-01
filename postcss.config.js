module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
<<<<<<< HEAD
=======
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
          // purgecss: require('@fullhuman/postcss-purgecss')({
          //   content: [
          //     "./app/**/*.{js,ts,jsx,tsx}",
          //     "./pages/**/*.{js,ts,jsx,tsx}",
          //     "./components/**/*.{js,ts,jsx,tsx}",
          //   ],
          //   defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
          //   safelist: {
          //     standard: ["html", "body", "dark"],
          //     deep: [/^dark/, /^bg-/, /^text-/, /^border-/, /^from-/, /^to-/, /^via-/],
          //   },
          // }),
        }
      : {}),
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
  },
}
