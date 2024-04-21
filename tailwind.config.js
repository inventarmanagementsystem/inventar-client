module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#1f2937",

          "secondary": "#374151",

          "accent": "#f5f5f4",

          "neutral": "#57534e",

          "base-100": "#1c1917",

          "info": "#60a5fa",

          "success": "#4d7c0f",

          "warning": "#f59e0b",

          "error": "#dc2626",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

