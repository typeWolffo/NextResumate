import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        lg: "1200px",
      },
    },
    fontSize: {
      xs: "8px",
      sm: "14px",
      base: "16px",
      md: "18px",
      lg: "24px",
      xl: "32px",
      xlr: "40px",
      xxl: "48px",
      xxlr: "56px",
      xxxl: "72px",
    },
    letterSpacing: {
      ...defaultTheme.letterSpacing,
      kicker: "2.4px",
      14: "0.14px",
    },
    boxShadow: {
      100: "0px 0px 16px 0px rgba(47, 48, 51, 0.05), 0px 32px 72px 0px rgba(47, 48, 51, 0.07)",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: "#2F3033",
        brand: {
          primary: {
            DEFAULT: "#ff6d2a",
            100: "#fff8f5",
            200: "#ffeae0",
            400: "#ff905d",
            500: "#ff6d2a",
            600: "#e25718",
          },
        },
        neutral: {
          100: "#f4f5f5",
          200: "#eaeaeb",
          300: "#bfc0c4",
          400: "#95979d",
          500: "#696b72",
          600: "#4c4d52",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
