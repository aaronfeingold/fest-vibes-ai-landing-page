import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "neue-machina": ["Neue Machina", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Festival Brand Colors
        festival: {
          "slate-900": "hsl(var(--festival-slate-900))",
          "purple-900": "hsl(var(--festival-purple-900))",
          "purple-500": "hsl(var(--festival-purple-500))",
          "pink-500": "hsl(var(--festival-pink-500))",
          "purple-400": "hsl(var(--festival-purple-400))",
          "pink-400": "hsl(var(--festival-pink-400))",
          "gradient-light": "hsl(var(--festival-gradient-light))",
          "gradient-dark": "hsl(var(--festival-gradient-dark))",
        },
        // Stage Colors
        stage: {
          coral: "hsl(var(--stage-coral))",
          turquoise: "hsl(var(--stage-turquoise))",
          sky: "hsl(var(--stage-sky))",
          mint: "hsl(var(--stage-mint))",
          yellow: "hsl(var(--stage-yellow))",
        },
        // Semantic Brand Colors
        brand: {
          primary: "hsl(var(--brand-primary))",
          secondary: "hsl(var(--brand-secondary))",
          accent: "hsl(var(--brand-accent))",
          background: {
            start: "hsl(var(--brand-background-start))",
            middle: "hsl(var(--brand-background-middle))",
            end: "hsl(var(--brand-background-end))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        // Original Festival Gradients (now using CSS variables)
        "festival-gradient":
          "linear-gradient(135deg, hsl(var(--festival-gradient-light)) 0%, hsl(var(--festival-gradient-dark)) 100%)",
        "stage-lights":
          "linear-gradient(45deg, hsl(var(--stage-coral)), hsl(var(--stage-turquoise)), hsl(var(--stage-sky)), hsl(var(--stage-mint)), hsl(var(--stage-yellow)))",
        // New Brand Gradient Utilities
        "brand-gradient":
          "linear-gradient(to right, hsl(var(--brand-primary)), hsl(var(--brand-secondary)))",
        "brand-gradient-r":
          "linear-gradient(to right, hsl(var(--brand-primary)), hsl(var(--brand-secondary)))",
        "brand-gradient-br":
          "linear-gradient(to bottom right, hsl(var(--brand-background-start)) 0%, hsl(var(--brand-background-middle)) 50%, hsl(var(--brand-background-end)) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config
