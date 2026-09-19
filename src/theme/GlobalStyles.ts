import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    min-width: 0;
    min-height: 100%;
  }

  html {
    min-height: 100%;
    background: var(--background, ${({ theme }) => theme.colors.background2});
  }

  body {
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0;
    background: var(--background, ${({ theme }) => theme.colors.background2});
    font-family: ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--background, ${({ theme }) => theme.colors.background2});
  }

  button, input, textarea, select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
