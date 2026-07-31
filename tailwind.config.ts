import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2C5389",
          dark: "#1F3D68",
          light: "#4A72AC",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F4A22A",
          dark: "#D6870F",
          light: "#FFC266",
          foreground: "#1B1B1B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F4F7F5",
          alt: "#EEF2F6",
        },
        ink: {
          DEFAULT: "#1B1B1B",
          muted: "#5B6B63",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
