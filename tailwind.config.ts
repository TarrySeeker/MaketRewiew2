import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Светлая нежная палитра (полная противоположность тёмному инструментальному)
        background: "#FFF8F0",      // Кремовый фон
        foreground: "#4A3F35",       // Тёплый коричневый текст
        card: "#FFFFFF",             // Белые карточки
        "card-foreground": "#4A3F35",
        popover: "#FFFFFF",
        "popover-foreground": "#4A3F35",
        primary: "#D4A0A0",          // Пыльная роза (акцент)
        "primary-foreground": "#FFFFFF",
        secondary: "#F5E6D3",        // Бежевый
        "secondary-foreground": "#4A3F35",
        muted: "#F0E6DC",            // Светло-бежевый
        "muted-foreground": "#8B7355",  // Приглушённый коричневый
        accent: "#8B9E8B",           // Мятный/зелёный
        "accent-foreground": "#FFFFFF",
        destructive: "#C17878",      // Мягкий красный
        "destructive-foreground": "#FFFFFF",
        border: "#E5D5C3",           // Светлая граница
        input: "#F5E6D3",
        ring: "#D4A0A0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",  // Более закруглённые углы чем у инструментов
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.06)",  // Мягкие тени
        medium: "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
