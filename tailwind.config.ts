import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#fbeaea",
          200: "#f5c6c5",
          300: "#ec9f9e",
          400: "#e57877",
          500: "#b23e3b", // Base rich red
          600: "#9d3634",
          700: "#852d2b",
          800: "#6d2523",
          900: "#561c1b",
          1000: "#3f1313",
        },
        secondary: {
          100: "#fdf4e7",
          200: "#f9e0bd",
          300: "#f5c890",
          400: "#f1b065",
          500: "#e4b865", // Base golden yellow
          600: "#c99957",
          700: "#ad7a49",
          800: "#91613b",
          900: "#734b2d",
          1000: "#55351f",
        },
        accent: {
          100: "#ede7e4",
          200: "#dacfc9",
          300: "#c6b7ae",
          400: "#b3a093",
          500: "#6a4a3c", // Base earthy brown
          600: "#5e4235",
          700: "#50362c",
          800: "#422b24",
          900: "#34201c",
          1000: "#271514",
        },
        neutral: {
          100: "#faf8f6",
          200: "#f4efe8",
          300: "#eee6d9",
          400: "#e8dccb",
          500: "#f4ede4", // Base soft beige
          600: "#ccc5be",
          700: "#a49e97",
          800: "#7c7670",
          900: "#544f49",
          1000: "#2c2823",
        },
        highlight: {
          100: "#e8f1f0",
          200: "#c6dbd9",
          300: "#a3c6c2",
          400: "#81b0ab",
          500: "#91a6a3", // Base muted teal
          600: "#7d9390",
          700: "#697f7c",
          800: "#556b68",
          900: "#415654",
          1000: "#2d4240",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
