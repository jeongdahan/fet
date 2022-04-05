import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  basicWidth: "320px",

  color: {
    blue_600: "#22335E",
    blue_500: "#223280",
    blue_400: "#303F90",
    blue_300: "#45539A",
    blue_200: "#6E84C0",
    blue_100: "#98AAD2",

    red_400: "#EA2626",

    white_600: "#fff",
    white_400: "rgba(255,255,255,0.8)",
    white_100: "rgba(255,255,255,0.5)",

    gray_600: "gray",
    gray_400: "lightgray",

    black_600: "#000",
  },

  typography: {
    h1: "font-weight: 700; font-size: 2.5rem",
    h2: "font-weight: 700; font-size: 1rem",
    h3: "font-weight: 700; font-size: 1.875rem",
    h4: "font-weight: 700; font-size: 1.25rem",
    h5: "font-weight: 700; font-size: 1rem",
    h6: "font-weight: 700; font-size: 0.875rem",

    display_1: "font-weight: 400; font-size: 1rem",
    display_2: "font-weight: 400; font-size: 0.75rem",
    display_3: "font-weight: 700; font-size: 4.375rem",
  },

  ellipsis: (row) => {
    const lineHeight = 1.5;
    return `
      display: -webkit-box !important;
      
      max-height: ${lineHeight * row}em;
      line-height: ${lineHeight}em;
      text-overflow: ellipsis;

      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${row};
    `;
  },
};

export { theme };
