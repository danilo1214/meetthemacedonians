
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        loader: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(400%)" },
        },
      },
      animation: {
        loader: "loader 1.2s linear infinite",
      },
      colors: {
        primary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1", // base secondary
          600: "#4F46E5", // original primary
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        secondary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1", // original secondary
          600: "#4F46E5", // slightly darker tone
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        accent: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6", // original accent
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        background: {
          50: "#F9FAFB",
          100: "#F3F4F6", // original background
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF", // muted
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        surface: {
          50: "#FFFFFF", // original surface
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#E5E7EB",
          400: "#D1D5DB",
          500: "#9CA3AF",
          600: "#6B7280",
          700: "#4B5563",
          800: "#374151",
          900: "#1F2937",
        },
        muted: {
          50: "#F3F4F6",
          100: "#E5E7EB",
          200: "#D1D5DB",
          300: "#9CA3AF", // original muted
          400: "#6B7280",
          500: "#4B5563",
          600: "#374151",
          700: "#1F2937",
          800: "#111827",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
