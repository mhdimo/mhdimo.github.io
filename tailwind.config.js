/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic roles resolved from CSS variables (see src/index.css),
        // so the dark/light switch is a variable swap, not a class sweep.
        ground: 'var(--ground)',
        panel: 'var(--panel)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        accentline: 'var(--accent-line)',
        onaccent: 'var(--on-accent)',
      },
      fontFamily: {
        // The proven stack from the previous design — render-verified.
        sans: ['"Noto Sans SC"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
