// src/components/PageHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PageHeader.css';
import { useAuth } from '../context/AuthContext'; // Importe o hook

function PageHeader({ title }) {
  const { user, logout } = useAuth(); // Pegue o usuário e a função logout
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redireciona para a home após logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="page-header">
      <Link to="/" className="back-link">
        <span className="back-arrow">←</span>
      </Link>
      <h2 className="page-title">{title}</h2>
      {/* Botão de Logout condicional */}
      {user && (
        <button onClick={handleLogout} style={{ marginLeft: 'auto', padding: '5px 10px' }}>
          Logout ({user.email?.split('@')[0]}) {/* Mostra parte do email */}
        </button>
      )}
    </header>
  );
}

export default PageHeader;