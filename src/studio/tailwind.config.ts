/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/studio/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/templates/**/*.{js,ts,jsx,tsx}",
    "./src/templates/components/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#1e293b",
        background: "#ffffff",
        foreground: "#0f172a",
        primary: {
          DEFAULT: "#1e293b",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b",
        },
        destructive: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
