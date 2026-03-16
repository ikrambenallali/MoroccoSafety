/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",      // <-- important pour App Router
    "./pages/**/*.{ts,tsx}",    // si tu as encore des pages
    "./components/**/*.{ts,tsx}" 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}