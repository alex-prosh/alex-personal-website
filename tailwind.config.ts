import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFF5E9',
        foreground: '#000000',
        accent: '#AE5741',
        muted: '#666666',
        border: '#000000',
      },
      fontFamily: {
        sans: ['var(--font-nanum)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
