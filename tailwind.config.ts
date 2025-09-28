/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4B2616",
          dark: "#2e1b1a",
          light: "#8b6b63",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      inset: {
        "inline-start": "var(--inset-inline-start)",
        "inline-end": "var(--inset-inline-end)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities(
        {
          "[inset-inline-start]": {
            "inset-inline-start": "var(--inset-inline-start)",
          },
          "[inset-inline-end]": {
            "inset-inline-end": "var(--inset-inline-end)",
          },
        },
        ["responsive"]
      );
    },
  ],
};
