/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    "bg-green-600",
    "hover:bg-green-700",
    "bg-green-500/70",
    "bg-green-600/70",
    "outline-green-600",

    "bg-red-600",
    "hover:bg-red-700",
    "bg-red-500/70",
    "bg-red-600/70",
    "outline-red-600",

    "bg-blue-600",
    "hover:bg-blue-700",
    "bg-blue-500/70",
    "bg-blue-600/70",
    "outline-blue-600",
  ],
  plugins: [],
};
