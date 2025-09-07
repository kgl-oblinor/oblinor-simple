import React from 'react';
import ReactDOM from 'react-dom/client';
import { THEME, ALPHA_COLORS } from './constants/theme';
import App from './App';

// Global styles
const globalStyles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${THEME.colors.background};
    color: ${THEME.colors.primary};
  }

  #root {
    min-height: 100vh;
  }

  input, select, textarea, button {
    font-family: inherit;
  }

  input::placeholder {
    color: ${ALPHA_COLORS.background.medium};
  }

  /* Ensure proper styling for form elements on dark backgrounds */
  input[type="email"], input[type="password"], input[type="text"], input[type="number"], select, textarea {
    background-color: ${ALPHA_COLORS.background.light};
    border: 1px solid ${ALPHA_COLORS.background.strong};
    color: ${THEME.colors.background};
  }

  input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus, input[type="number"]:focus, select:focus, textarea:focus {
    outline: none;
    border-color: ${ALPHA_COLORS.background.medium};
    box-shadow: 0 0 0 2px ${ALPHA_COLORS.background.light};
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${THEME.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${THEME.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${ALPHA_COLORS.primary.strong};
  }
`;

// Inject global styles
const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);