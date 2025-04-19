// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Ou global.css
import { AuthProvider } from './context/AuthContext'; // Importe o AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Envolva o App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);