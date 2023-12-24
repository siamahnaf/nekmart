/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xxs: "0px",
        xs: "360px",
        sm: "480px",
        msm: "540px",
        lsm: "640px",
        md: "720px",
        lg: "960px",
        "lg-max": "992px",
        xl: "1140px",
        "2xl": "1320px",
        "3xl": "1536px",
        "4xl": "1920px"
      },
      boxShadow: {
        "3xl": "3px 0px 15px rgba(235, 249, 243, 0.8)"
      },
      colors: {
        main: "#e53935",
        secondary: "#8f97ab",
        white_hover: "#e1e6ea",
        "blue-gray": {
          "200": "#eeeeee"
        }
      }
    }
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/line-clamp")
  ]
})

