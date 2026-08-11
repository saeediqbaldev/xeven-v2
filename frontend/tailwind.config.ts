import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#5B5FEF", hover: "#7377F5" },
        accent: { DEFAULT: "#FF6B4A", hover: "#FF8567" },
        base: {
          light: "#F7F8FC",
          dark: "#0B0F1A",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#12172A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        xevenlight: {
          primary: "#5B5FEF",
          secondary: "#FF6B4A",
          "base-100": "#F7F8FC",
          "base-content": "#10131C",
        },
      },
      {
        xevendark: {
          primary: "#7377F5",
          secondary: "#FF6B4A",
          "base-100": "#0B0F1A",
          "base-content": "#E7E9F3",
        },
      },
    ],
    darkTheme: "xevendark",
  },
};

export default config;
