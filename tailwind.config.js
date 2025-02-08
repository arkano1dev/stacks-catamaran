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
  },
};
export const plugins = [];
