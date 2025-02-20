import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f7dfe0",
          100: "#f0bfc1",
          200: "#ea9ea1",
          300: "#e57b80",
          400: "#df525b",
          500: "#b8434b",
          600: "#93363c",
          700: "#6f292d",
          800: "#4e1c1f",
          900: "#2d1112",
        },
        accent: {
          50: "#f2e3ca",
          100: "#e7c78d",
          200: "#d7ac4f",
          300: "#ba9544",
          400: "#9d7e3a",
          500: "#826830",
          600: "#675326",
          700: "#4e3e1d",
          800: "#362b14",
          900: "#201a0c",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
