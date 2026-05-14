import type { Config } from "tailwindcss";

/** Code Nexus — unified neon cyber palette (Tailwind semantic names). */
const config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pink: "#ff008a",
        purple: "#8b5cf6",
        fuchsia: "#d946ef",
        bg: "#050505",
        "bg-card": "#0a0a0f",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #ff008a 0%, #d946ef 48%, #8b5cf6 100%)",
      },
      fontFamily: {
        heading: [
          "var(--font-space-grotesk)",
          "system-ui",
          "sans-serif",
        ],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        dm: [
          "var(--font-dm-sans)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "glow-pink": "0 0 48px rgba(255, 0, 138, 0.35)",
        "glow-purple": "0 0 48px rgba(139, 92, 246, 0.28)",
      },
    },
  },
} satisfies Config;

export default config;
