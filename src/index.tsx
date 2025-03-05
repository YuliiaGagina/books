import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BooksProvider from './context /BookContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BooksProvider>
    <App />
    </BooksProvider>
  </React.StrictMode>
);


reportWebVitals();
