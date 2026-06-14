/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.src.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        // Risograph-flat warm paper palette (usejarvis.dev aesthetic)
        paper: '#F4EFE6',
        'paper-2': '#EBE5D9',
        'paper-3': '#E2DBCC',
        ink: '#1F1B16',
        'ink-2': '#514A3F',
        'ink-3': '#8C8275',
        accent: '#C0533A',
        'accent-dark': '#A23E29',
        line: '#DAD2C4',
        amber: '#C99A4B',
        sage: '#5B8A72',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        wave: 'wave 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%': { transform: 'scaleY(0.4)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
};
