/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0A0A0A',
        'brand-cream': '#F5EFE6',
        'brand-gold': '#C9A84C',
        'brand-burgundy': '#6B1E2E',
        'brand-charcoal': '#1C1C1E',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'sans': ['"DM Sans"', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
