// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Importa a imagem do logo da pasta src/assets
import logoBarraSrc from '../assets/logobarra.jpg';
// Ajuste o caminho '../assets/' se necessário (ex: './assets/' ou '../../assets/')

function Header() {
  return (
    // A classe 'site-header' controla posicionamento, fundo, altura
    <header className="site-header">
      {/* A classe 'nav-bar' controla o layout interno e padding */}
      <nav className="nav-bar">
        {/* Grupo do logo e texto à esquerda */}
        <div className="logo-container">
          <img
            src={logoBarraSrc} // Usa a variável importada
            alt="Logo Studio de Pilates Dra Renata Squizzato"
            className="header-logo"
          />
          <span className="studio-name">Studio de Pilates Dra Renata Squizzato</span>
        </div>
        {/* Lista de links de navegação à direita */}
        <ul className="nav-links">
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