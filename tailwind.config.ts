import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^(delay-|animate-|bg-|text-|border-|from-|to-|via-|grid-cols-|col-span-|gap-|space-|rounded-)/,
    },
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        orange: {
          50: "#fff8f5",
          100: "#fff0e8",
          400: "#ff5500",
          500: "#e64d00",
          600: "#cc4400",
        },
        gray: {
          100: "#f3f4f6",
          200: "#e5e5e5",
          400: "#9ca3af",
          500: "#6b7280",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        "input-border": "var(--input-border)",
        "input-bg": "var(--input-bg)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
      },
      fontFamily: {
        sans: ["BasisGrotesquePro-Regular", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        avant: ["AvantGardeCTT", "sans-serif"],
        basis: ["BasisGrotesquePro-Regular", "sans-serif"],
      },
      textShadow: {
        lg: "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
        subtle: "0 2px 4px rgba(0, 0, 0, 0.3)",
        glow: "0 0 5px rgba(255, 85, 0, 0.5), 0 0 10px rgba(255, 85, 0, 0.3)",
        "3d": "1px 1px 0 rgba(0, 0, 0, 0.4), 2px 2px 0 rgba(0, 0, 0, 0.3), 3px 3px 0 rgba(0, 0, 0, 0.2), 4px 4px 5px rgba(0, 0, 0, 0.5)",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
      },
      keyframes: {
        ripple: {
          to: {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        ripple: "ripple 1s linear forwards",
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
        "fade-in": "fadeIn 0.3s ease-in-out forwards",
        "slide-down": "slideDown 0.3s ease-in-out forwards",
        "slide-up": "slideUp 0.3s ease-in-out forwards",
      },
      screens: {
        xs: "375px",
        "3xl": "1920px",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    ({ addUtilities }: any) => {
      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-lg": {
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-subtle": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-glow": {
          textShadow: "0 0 5px rgba(255, 85, 0, 0.5), 0 0 10px rgba(255, 85, 0, 0.3)",
        },
        ".safe-top": {
          paddingTop: "env(safe-area-inset-top, 0)",
        },
        ".safe-bottom": {
          paddingBottom: "env(safe-area-inset-bottom, 0)",
          marginBottom: "env(safe-area-inset-bottom, 0)",
        },
        ".safe-left": {
          paddingLeft: "env(safe-area-inset-left, 0)",
        },
        ".safe-right": {
          paddingRight: "env(safe-area-inset-right, 0)",
        },
        ".touch-callout-none": {
          "-webkit-touch-callout": "none",
        },
        ".min-touch-height": {
          minHeight: "44px",
        },
        ".min-touch-width": {
          minWidth: "44px",
        },
      })
    },
    require("tailwindcss-animate"),
  ],
}
export default config
