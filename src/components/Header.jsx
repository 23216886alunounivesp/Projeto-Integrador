// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link
import './Header.css'; // Importe o arquivo CSS

function Header() {
  return (
    <header>
      <h1>Escola de Pilates</h1>
      <nav>
        <ul>
          <li><Link to="/">Principal</Link></li>
          <li><Link to="/nosso-espaco">Nosso Espaço</Link></li>
          <li><Link to="/instrutores">Instrutores</Link></li>
          <li><Link to="/aulas">Aulas</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;