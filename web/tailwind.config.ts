import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        foreground: '#F9FAFB',
        primary: {
          DEFAULT: '#4F46E5',
          foreground: '#EEF2FF',
        },
        muted: {
          DEFAULT: '#020617',
          foreground: '#9CA3AF',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.65)',
      },
    },
  },
  plugins: [],
};

export default config;

