/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#5B4FE8',
          600: '#4A3FD7',
          700: '#392FC6',
        },
        secondary: {
          500: '#8B85F0',
          600: '#7A74EF',
          700: '#6963EE',
        },
        accent: {
          500: '#FF6B6B',
          600: '#FF5252',
          700: '#FF3939',
        },
        success: {
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
        },
        warning: {
          500: '#FF9800',
          600: '#F57C00',
          700: '#E65100',
        },
        error: {
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
        },
        info: {
          500: '#2196F3',
          600: '#1976D2',
          700: '#1565C0',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
        },
        priority: {
          high: '#FF6B6B',
          medium: '#FF9800',
          low: '#4CAF50',
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}