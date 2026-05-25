import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#fafaf7',
        accent: '#b07d4a',
        muted: '#7a6a55',
        border: '#e8e4dc',
      },
    },
  },
  plugins: [],
}

export default config
