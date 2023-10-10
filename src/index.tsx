import React from 'react';
import { render } from 'react-dom';  // render를 불러옵니다.
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = document.getElementById('root');
const queryClient = new QueryClient()

render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
      <App />
  </QueryClientProvider>,
  // </React.StrictMode>,
  root
);

reportWebVitals();
