import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff2f1",
          100: "#ffd8d5",
          200: "#ffb3ac",
          300: "#ff8d83",
          400: "#ff6558",
          500: "#e74c3c", // coral red
          600: "#c03d30",
          700: "#982f25",
          800: "#70211a",
          900: "#49120f",
        },
        secondary: {
          50: "#f1fafa",
          100: "#d6f0ef",
          200: "#ade1df",
          300: "#84d1cf",
          400: "#5bc2bf",
          500: "#3aa9a6", // soft teal
          600: "#2e8684",
          700: "#226261",
          800: "#163f3f",
          900: "#0b1f1f",
        },
        accent: {
          50: "#fdf6e7",
          100: "#fbeac6",
          200: "#f6d998",
          300: "#f2c86a",
          400: "#efb73c",
          500: "#d79e23", // warm golden
          600: "#ab7d1b",
          700: "#7f5c13",
          800: "#543c0b",
          900: "#2b1e05",
        },
        neutral: {
          50: "#fafafa",
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#bfbfbf",
          400: "#a6a6a6",
          500: "#8c8c8c",
          600: "#737373",
          700: "#595959",
          800: "#404040",
          900: "#1a1a1a",
        },
        info: {
          50: "#e6f4fa",
          100: "#c1e5f4",
          200: "#99d5ed",
          300: "#70c5e6",
          400: "#47b6df",
          500: "#2c9cc5", // ocean blue
          600: "#237d9e",
          700: "#1a5e77",
          800: "#123f51",
          900: "#0a202b",
        },
        success: {
          50: "#e8f8ee",
          100: "#c3edd1",
          200: "#9ee2b4",
          300: "#78d697",
          400: "#53cb7a",
          500: "#39b161", // green, but friendly
          600: "#2d8e4e",
          700: "#226b3b",
          800: "#164828",
          900: "#0a2615",
        },
        warning: {
          50: "#fff7e6",
          100: "#ffebbf",
          200: "#ffd88f",
          300: "#ffc45f",
          400: "#ffb02f",
          500: "#e69516", // amber orange
          600: "#b37511",
          700: "#80550c",
          800: "#4d3607",
          900: "#1f1702",
        },
        error: {
          50: "#fdeeee",
          100: "#f9d1d1",
          200: "#f3a9a9",
          300: "#ec8181",
          400: "#e65858",
          500: "#cc3f3f", // stronger red tone
          600: "#a13232",
          700: "#762525",
          800: "#4b1818",
          900: "#210a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
