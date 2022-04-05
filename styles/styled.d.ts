import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      blue_600: string;
      blue_500: string;
      blue_400: string;
      blue_300: string;
      blue_200: string;
      blue_100: string;

      red_400: string;

      white_600: string;
      white_400: string;
      white_100: string;

      gray_600: string;
      gray_400: string;

      black_600: string;
    };

    typography: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;

      display_1: string;
      display_2: string;
      display_3: string;
    };

    ellipsis(row: number);
  }
}
