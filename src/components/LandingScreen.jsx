// src/components/LandingScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingScreen.css';
import heroImage from '../assets/hero-image.webp'; // Importação da imagem

function LandingScreen() {
  return (
    <div className="landing-screen-container">
      {/* Nova tag <img> ADICIONADA AQUI, ANTES do <h1> */}
      <img
        src={heroImage} // Use a variável importada para o src
        alt="Logo Studio de Pilates" // Texto alternativo para acessibilidade
        className="landing-logo" // Classe CSS para estilização (opcional)
      />

      <h1 className="landing-title">Studio de Pilates Dra Renata Squizzato</h1>
      <nav className="landing-nav">
        <ul className="landing-links">
          <li>
            <Link to="/principal">Principal</Link>
          </li>
          <li>
            <Link to="/nosso-espaco">Nosso Espaço</Link>
          </li>
          <li>
            <Link to="/instrutores">Instrutores</Link>
          </li>
          <li>
            <Link to="/aulas">Aulas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingScreen;