// src/components/PageHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PageHeader.css';
import { useAuth } from '../context/AuthContext';

function PageHeader({ title }) {
  console.log(`------ PageHeader ('${title}') - Renderizando (Teste Simples) ------`);
  const { user, logout } = useAuth();
  console.log(`PageHeader ('${title}') - User recebido:`, user ? user.id : null); // Log simplificado
  const navigate = useNavigate();

  const handleLogout = async () => { /* ... (código do logout) ... */ };

  return (
    <header className="page-header">
      <Link to="/" className="back-link">
        <span className="back-arrow">←</span>
      </Link>
      <h2 className="page-title">{title}</h2>

      {/* ***** TESTE: Renderizar o botão SEMPRE (Removendo a condição {user && ...}) ***** */}
      <button
        onClick={handleLogout}
        style={{ marginLeft: 'auto', padding: '5px 10px' }}
        disabled={!user} // Desabilita o botão se não houver user, mas ele AINDA deve aparecer
      >
        {/* Adapta o texto se não houver user */}
        {user ? `Logout (${user.email?.split('@')[0]})` : 'Logout (Desabilitado)'}
      </button>
      {/* ***** FIM DO TESTE ***** */}

    </header>
  );
}

export default PageHeader;