/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF6F3',
          100: '#FBECE6',
          200: '#F7D4C7',
          300: '#F0B39F',
          400: '#E28468',
          500: '#C85A32',
          600: '#B64620',
          700: '#973517',
          800: '#7B2C16',
          900: '#662716',
        },
        marigold: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        indigoCraft: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#4F46E5',
          600: '#3730A3',
          700: '#2E2880',
          800: '#1E1B4B',
          900: '#141235',
        },
        khadi: {
          50: '#FCFBF8',
          100: '#F8F5EE',
          200: '#F0EAD8',
          300: '#E5DBC0',
          400: '#D5C4A0',
          500: '#BAA37A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
        handwritten: ['"Kalam"', 'cursive'],
        folk: ['"Rozha One"', 'serif'],
      },
      boxShadow: {
        'warm': '0 10px 25px -5px rgba(200, 90, 50, 0.12), 0 8px 10px -6px rgba(200, 90, 50, 0.08)',
        'art': '0 20px 40px -15px rgba(182, 70, 32, 0.18)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
