import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f172a', // slate-900
          accent: '#e11d48',  // rose-600
          soft: '#f1f5f9',    // slate-100
        },
      },
    },
  },
  plugins: [],
}

export default config
