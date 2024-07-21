/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Outfit", "sans-serif"],
        secondary: ["Bodoni Moda", "serif"],
      },
      colors: {
        customBgMain: "#EEECE8",
        customGreen: {
          50: "#F1FDF0",
          100: "#DCFDDB",
          200: "#BCF8BA",
          300: "#6EEE6B",
          400: "#4AE147",
          500: "#22C81F",
          600: "#16A613",
          700: "#148213",
          800: "#156615",
          900: "#135414",
          950: "#042F05",
        },
        customRed: {
          50: "#FFF1F1",
          100: "#FFE1E1",
          200: "#FFC7C7",
          300: "#FFA0A0",
          400: "#FF7A7A",
          500: "#F83B3B",
          600: "#E51D1D",
          700: "#C11414",
          800: "#A01414",
          900: "#841818",
          950: "#480707",
        },
        customYellow: {
          50: "#FEFEE8",
          100: "#FEFFC2",
          200: "#FFFE87",
          300: "#FFF643",
          400: "#FFEA28",
          500: "#EFCE03",
          600: "#CEA100",
          700: "#A47404",
          800: "#885A0B",
          900: "#734910",
          950: "#432605",
        },
        customBlue: {
          50: "#EEF2FF",
          100: "#DAE2FF",
          200: "#BDCCFF",
          300: "#90ACFF",
          400: "#597EFF",
          500: "#3554FC",
          600: "#1F32F1",
          700: "#171EDE",
          800: "#191BB4",
          900: "#1A1E8E",
          950: "#151556",
        },
        customGray: {
          50: "#F5F5F5",
          100: "#EFEFEF",
          200: "#DCDCDC",
          300: "#BDBDBD",
          400: "#989898",
          500: "#7C7C7C",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3D3D3D",
          950: "#292929",
        },
      },
      boxShadow: {
        "custom-light": "0 2px 5px 0 rgba(0, 0, 0, 0.1)",
      },
      lineClamp: {
        2: "2",
      },
      height: {
        "2-line": "calc(2 * 15px * 1.1025)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".word-spacing-tight": {
            wordSpacing: "-0.125rem",
          },
          ".word-spacing-normal": {
            wordSpacing: "normal",
          },
          ".word-spacing-wide": {
            wordSpacing: "0.25rem",
          },
          ".word-spacing-wider": {
            wordSpacing: "0.5rem",
          },
          ".word-spacing-widest": {
            wordSpacing: "1rem",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
