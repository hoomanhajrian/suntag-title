import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-dancing-script)'],
        sans: ['var(--font-montserrat)'],
      },
      colors: {
        gold: {
          light: '#FFD700',
          DEFAULT: '#FFC040',
          dark: '#B8860B',
        },
        navy: '#000080',
        crimson: '#DC143C',
      }
    },
  },
  plugins: [],
}
export default config