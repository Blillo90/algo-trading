import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030810',
          900: '#050D1C',
          800: '#071426',
          700: '#0A1628',
          600: '#0E1F3A',
          500: '#132847',
          400: '#1B3A5C',
          300: '#1E4D7B',
        },
        cobalt: {
          950: '#0A1628',
          900: '#0D1F40',
          800: '#1B3A7A',
          700: '#1B4FD8',
          600: '#2563EB',
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
          200: '#BFDBFE',
          100: '#DBEAFE',
        },
        electric: '#00D4FF',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(37,99,235,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(37,99,235,0.5), 0 0 60px rgba(37,99,235,0.2)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 2s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(37, 99, 235, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.07) 1px, transparent 1px)',
        'grid-pattern-sm':
          'linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '50px 50px',
        'grid-sm': '25px 25px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(37,99,235,0.2)',
        glow: '0 0 30px rgba(37,99,235,0.3)',
        'glow-lg': '0 0 60px rgba(37,99,235,0.4)',
        'glow-xl': '0 0 100px rgba(37,99,235,0.5)',
        'inner-glow': 'inset 0 0 30px rgba(37,99,235,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
