import React from 'react';
import { render } from 'react-dom';  // render를 불러옵니다.
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';

const root = document.getElementById('root');

render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  // </React.StrictMode>,
  root
);

reportWebVitals();
