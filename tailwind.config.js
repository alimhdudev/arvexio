// tailwind.config.js
import {nextui} from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,div}',
    './src/components/*.{js,ts,jsx,tsx,mdx,div}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/[filename]/page.js',
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xs': '320px',
      // => @media (min-width: 640px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '800px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bg-gradient-from': '#9747FF',
        'bg-gradient-to': '#7D4BFF',
        'custom-black': '#000000',
        'custom-purple': 'rgba(149, 58, 231, var(--tw-bg-opacity))',
        'background': '#E1C3FF',
        'accent': '#7F00FF',
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            accent: {
              DEFAULT: "#fff121",
              foreground: "#000000",
            },
            focus: "#fff121",
          },
        },
      },
    }),

  ],
}

export default config;

