import React from 'react';
import { render } from 'react-dom';  // render를 불러옵니다.
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = document.getElementById('root');
const queryClient = new QueryClient()

render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>,
  // </React.StrictMode>,
  root
);

reportWebVitals();
