/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      }, 
      animation: {
        'assistant-message': 'blink 1s steps(5,start) infinite',
      },
      keyframes: { 
        blink: {
          to: {
              visibility: 'hidden'
          }
        }
    }
    },
  },
  plugins: [require("@tailwindcss/typography"),require('@tailwindcss/forms')],
};
