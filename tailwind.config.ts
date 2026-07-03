import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        line: "var(--border)",
        overlay: "var(--overlay)",
        faint: "var(--faint)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "fluid-h1": "clamp(3rem, 8vw, 9rem)",
        "fluid-h2": "clamp(2rem, 5vw, 5rem)",
        "fluid-h3": "clamp(1.5rem, 3vw, 2.75rem)",
        "fluid-body": "clamp(1rem, 1.1vw, 1.25rem)",
      },
    },
  },
  plugins: [],
};

export default config;
