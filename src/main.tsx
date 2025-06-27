import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css'; // Tailwind CSS or any global styles

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter> {/* Wrap your app in BrowserRouter */}
    <App />
  </BrowserRouter>
);

