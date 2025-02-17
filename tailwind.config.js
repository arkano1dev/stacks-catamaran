/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';

export const darkMode = 'class';
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];

export const theme = {
  extend: {
    colors: {
      'special-black': '#07070A',
    },
    backgroundImage: {
      'dark-image': "url('./assets/img/background.png')",
    },
    fontFamily: {
      sans: ['SF Mono', ..._fontFamily.sans],
    },
    keyframes: {
      bounceDown: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(10px)' },
      },
      bgColorChange: {
        '0%': { backgroundColor: 'white' },
        '100%': { backgroundColor: 'black' },
      },

      gradientMove: {
        '0%': {
          'background-size': '200% 200%',
          'background-position': 'right center',
        },
        '100%': {
          'background-size': '200% 200%',
          'background-position': 'left center',
        },
      },
    },
    animation: {
      bounceDown: 'bounceDown 1s infinite',
      bgColorChange: 'bgColorChange 10s linear',
      gradientMove: 'gradientMove 20s ease infinite',
    },
  },
};
export const plugins = [];
