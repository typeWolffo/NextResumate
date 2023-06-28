import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
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
    extend: {
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
  plugins: [],
} satisfies Config;
