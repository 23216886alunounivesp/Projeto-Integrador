// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Ou global.css
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; // <<<< 1. IMPORTE BrowserRouter AQUI

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>   {/* <<<< 2. ENVOLVA AuthProvider com BrowserRouter */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>  {/* <<<< 2. FECHE BrowserRouter */}
  </React.StrictMode>
);