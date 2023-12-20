import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "heading-xs": ["1.8rem", { fontWeight: "500" }],
        "heading-light-sm": ["2.4rem", { fontWeight: "300" }],
        "heading-medium-sm": ["2.4rem", { fontWeight: "500" }],
        "heading-lg": ["3.6rem", { fontWeight: "300" }],
        "body-sm": ["1.3rem", { fontWeight: "300" }],
        "body-md": ["1.5rem", { fontWeight: "300" }],
      },

      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-background": "rgb(var(--primary-background) / <alpha-value>)",
        "secondary-background":
          "rgb(var(--secondary-background) / <alpha-value>)",
        "tertiary-background":
          "rgb(var(--tertiary-background) / <alpha-value>)",
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        fontSize: {
          html: "10px",
        },
      });
    }),
  ],
};
export default config;
