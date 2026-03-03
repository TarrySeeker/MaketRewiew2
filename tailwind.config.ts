import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ультра-премиальная тёмная палитра
        background: "#09090B",      // Глубокий чёрный/графит
        foreground: "#FAFAFA",       // Чистый белый текст
        card: "#18181B",             // Тёмно-серые карточки (Glassmorphism fallbacks)
        "card-foreground": "#FAFAFA",
        popover: "#18181B",
        "popover-foreground": "#FAFAFA",
        primary: "#FFFFFF",          // Высокий контраст
        "primary-foreground": "#09090B",
        secondary: "#27272A",        // Акценты
        "secondary-foreground": "#FAFAFA",
        muted: "#27272A",
        "muted-foreground": "#A1A1AA",  // Приглушённый текст
        accent: "#27272A",
        "accent-foreground": "#FAFAFA",
        destructive: "#7F1D1D",      // Темно-красный для ошибок
        "destructive-foreground": "#FAFAFA",
        border: "#27272A",           // Тонкие границы
        input: "#27272A",
        ring: "#D4D4D8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",  // Более строгие, архитектурные формы
        lg: "0.5rem",
        xl: "1rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 255, 255, 0.05)",  // Нежное свечение
        intense: "0 10px 40px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
