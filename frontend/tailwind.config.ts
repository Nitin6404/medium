import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

interface ThemeColors {
  [key: string]: string;
}

interface AddVariablesForColorsParams {
  addBase: (styles: { [key: string]: { [key: string]: string } }) => void;
  theme: (path: string) => ThemeColors;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        shine: "shine 2s ease infinite"
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0"
          },
          to: {
            backgroundPosition: "-200% 0"
          }
        },
        shine: {
          "0%": {
            backgroundPosition: "0"
          },
          "60%": {
            backgroundPosition: "200px"
          },
          "100%": {
            backgroundPosition: "200px"
          }
        }
      }
    }
  },
  plugins: [addVariablesForColors]
};

function addVariablesForColors({ addBase, theme }: AddVariablesForColorsParams): void {
  const allColors: ThemeColors = flattenColorPalette(theme("colors"));
  const newVars: { [key: string]: string } = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars
  });
}