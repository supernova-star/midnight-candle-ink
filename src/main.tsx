import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/600.css';
import '@fontsource/lexend/700.css';
import { App } from './App';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import theme from './theme/theme';
import { GlobalStyles } from './theme/GlobalStyles';
import { ThemeManager } from './components/themeManager/ThemeManager';

function Main() {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ThemeManager>
          <App />
        </ThemeManager>
      </ThemeProvider>
    </StyleSheetManager>
  );
}

const el = document.getElementById('root')!;
createRoot(el).render(<Main />);
