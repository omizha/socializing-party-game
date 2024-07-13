import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Files to exclude
  exclude: [],

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // Whether to use css reset
  preflight: true,

  syntax: 'object-literal',

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          black: { value: '#110000' },
          main: { value: '#FF554A' },
          point: { value: '#F3F910' },
          sub1: { value: '#FFC2BE' },
          sub2: { value: '#FF7873' },
          sub3: { value: '#E0392F' },
          sub4: { value: '#8E0800' },
          white: { value: '#FFFCFC' },
        },
      },
    },
  },
});
