// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Ou o caminho para seu CSS global principal
import { AuthProvider } from './context/AuthContext'; // Importe o AuthProvider
import { BrowserRouter } from 'react-router-dom';   // IMPORTE BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>   {/* BrowserRouter é o MAIS EXTERNO */}
      <AuthProvider> {/* AuthProvider está DENTRO do BrowserRouter */}
        <App />      {/* App (que contém <Routes>) está DENTRO do AuthProvider */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);