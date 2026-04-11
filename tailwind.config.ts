// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Enables class-based dark mode (adds 'dark' class to <html>)
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. FONT FAMILY SETUP
      // These map to the CSS variables defined in your layout/fonts setup
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-merriweather)", "serif"],
      },

      // 2. COLOR PALETTE SETUP (Semantic Mapping)
      // These map to the CSS variables defined in your globals.css
      colors: {
        background: "var(--background)",
        "text-base": "var(--text-base)",
        "text-muted": "var(--text-muted)",
        
        // Brand Colors
        primary: "var(--primary)",      // Deep Navy (#0D2E55)
        secondary: "var(--secondary)",  // Vibrant Orange (#FF7D0C)
        accent: "var(--accent)",        // Off-White/Deep Navy variant
        highlight: "#FFC600",           // Sun Yellow (Static brand color)
        metallic: "#E6E6E6",            // Silver (Static brand color)
      },
    },
  },
  plugins: [],
};

export default config;