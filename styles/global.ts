import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
    ${normalize}
    
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
        word-wrap: break-word;
    }

    ul, ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    input:focus { outline: none; }
`;

export default GlobalStyle;
