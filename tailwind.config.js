import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [animate],
};

export default config;