import React from 'react';
import './Sobre.css';

function Sobre() {
  return (
    <div className="about-container">
      <h1>Sobre o Estudio de Pilates Dra Renata Squizzato</h1>
      <div className="about-content">
        <div className="about-text">
          <p>O Studio de Pilates Dra. Renata Squizzato é um espaço dedicado ao ensino do método Pilates Clássico.</p>
          <p>Nosso objetivo é compartilhar nossa paixão pelo Pilates e proporcionar aos nossos alunos uma experiência transformadora.</p>
        </div>
        <div className="about-image">
          <img src="/assets/about-image.jpg" alt="Studio de Pilates" />
        </div>
      </div>
    </div>
  );
}

export default Sobre;