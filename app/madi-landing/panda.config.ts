import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          main: { value: "#FF554A" },
          white: { value: "#FFFCFC" },
          black: { value: "#110000" },
          point: { value: "#F3F910" },
          sub1: { value: "#FFC2BE" },
          sub2: { value: "#FF7873" },
          sub3: { value: "#E0392F" },
          sub4: { value: "#8E0800" },
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  syntax: "object-literal",

  jsxFramework: "react"
});
