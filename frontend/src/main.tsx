import React from 'react';
import ReactDOM from 'react-dom/client';
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
    background-color: #fcfbfa;
    color: #123543;
  }

  #root {
    min-height: 100vh;
  }

  input, select, textarea, button {
    font-family: inherit;
  }

  input::placeholder {
    color: rgba(252, 251, 250, 0.6);
  }

  /* Ensure proper styling for form elements on dark backgrounds */
  input[type="email"], input[type="password"], input[type="text"], input[type="number"], select, textarea {
    background-color: rgba(252, 251, 250, 0.1);
    border: 1px solid rgba(252, 251, 250, 0.3);
    color: #fcfbfa;
  }

  input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus, input[type="number"]:focus, select:focus, textarea:focus {
    outline: none;
    border-color: rgba(252, 251, 250, 0.6);
    box-shadow: 0 0 0 2px rgba(252, 251, 250, 0.2);
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #fcfbfa;
  }

  ::-webkit-scrollbar-thumb {
    background: #123543;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0a2330;
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