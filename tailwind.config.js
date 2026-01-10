/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern SaaS Palette
        background: "var(--background)",
        surface: "var(--surface)",
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          hover: "#4f46e5",   // Indigo 600
        },
        // Status Colors for the lists
        status: {
          mutual: "#10b981",  // Emerald 500
          fan: "#f59e0b",     // Amber 500 (They follow you)
          non: "#ef4444",     // Red 500 (You follow them)
        }
      }
    },
  },
  plugins: [],
}