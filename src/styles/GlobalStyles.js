import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: ${({ theme }) => theme.fonts.primary};
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3 {
        font-family: ${({ theme }) => theme.fonts.secondary};
    }
`;

export default GlobalStyle;