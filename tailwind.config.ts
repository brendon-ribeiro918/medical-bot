import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: "#167DFF",
      red: "#FF2330",
      white: "#FFFFFF",
      "black-0": "#0F1828",
      "black-1": "#282727",
      "black-2": "#A4A4A4",
      "black-3": "#ADB5BD",
      "black-4": "#EDEDED",
      "black-5": "#F7F7FC",
    },
    borderRadius: {
      "br-1": "3px",
      "br-2": "4.363px",
      "br-3": "6px",
      "br-4": "10px",
      full: "100%",
    },
    fontSize: {
      "fs-1": "10px",
      "fs-2": "14px",
      "fs-3": "15.27px",
      "fs-4": "15.46px",
      "fs-5": "16px",
    },
    fontFamily: {
      mulish: ["Mulish", "sans-serif"],
      montserrat: ["Montserrat", "serif"],
    },
  },
  plugins: [],
};
export default config;
