import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        brand: "var(--text)",
        "brand-subtle": "var(--text-muted)",
        "brand-inverse": "var(--bg)",
        "brand-accent": "var(--accent)",
        "brand-accent2": "var(--accent-2)"
      },
      backgroundColor: {
        brand: "var(--bg)",
        "brand-alt": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-alt": "var(--bg-2)",
        glass: "var(--glass)",
        "brand-accent": "var(--accent)",
        "brand-accent2": "var(--accent-2)"
      },
      borderColor: {
        brand: "var(--border)",
        "brand-accent": "var(--accent)"
      },
      ringColor: {
        "brand-accent": "var(--accent)"
      },
      borderRadius: {
        'brand-sm': "var(--r-sm)",
        'brand-md': "var(--r-md)",
        'brand-lg': "var(--r-lg)",
        'brand-xl': "var(--r-xl)",
        'brand-2xl': "var(--r-2xl)"
      },
      boxShadow: {
        brand: "var(--shadow-e1)",
        'brand-md': "var(--shadow-e2)"
      },
      fontFamily: {
        heading: ["SF Pro Display", "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      fontSize: {
        display: "clamp(40px,7vw,88px)",
        h1: "clamp(32px,5vw,64px)",
        h2: "clamp(28px,4vw,48px)",
        h3: "22px",
        body: "18px",
        small: "14px"
      },
      transitionTimingFunction: {
        brand: "var(--ease)"
      }
    }
  },
  plugins: [
    plugin(({ addBase, addUtilities }) => {
      addBase({
        ":root": {
          fontFamily: "var(--font-body)"
        }
      });
      addUtilities({
        ".glass": {
          background: "var(--glass)",
          backdropFilter: "blur(var(--blur))",
          WebkitBackdropFilter: "blur(var(--blur))",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-e2)"
        }
      });
    })
  ]
};

export default config;
