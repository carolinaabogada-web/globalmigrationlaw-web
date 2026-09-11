import type { Config } from "tailwindcss";

/**
 * Color tokens are exposed as CSS custom properties (see app/globals.css)
 * so they can be overridden at runtime from Sanity siteSettings.theme
 * without a redeploy. The values below are only the compile-time
 * fallbacks and match the approved "Marino" palette.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        bg: "var(--color-bg)",
        "bg-alt": "var(--color-bg-alt)",
        "card-bg": "var(--color-card-bg)",
        ink: "var(--color-text)",
        "ink-muted": "var(--color-text-muted)",
        "ink-soft": "var(--color-text-soft)",
        border: "var(--color-border)",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-public-sans)", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1320px",
        content: "1280px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "translateY(24px) scale(.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.92" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s ease both",
        "pop-in": "pop-in .35s ease both",
        "pulse-soft": "pulse-soft 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
