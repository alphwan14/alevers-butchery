import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B0000",
        secondary: "#800020",
        accent: "#25D366",
        offer: "#FFE4C4",
        background: "#FDF5E6",
        text: "#36454F",
        hover: "#660000",
        border: "#D2B48C",
        card: "#FFFFFF",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
    },
  },
} satisfies Config;