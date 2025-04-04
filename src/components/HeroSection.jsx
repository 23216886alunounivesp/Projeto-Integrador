// src/components/HeroSection.jsx
import React from 'react';
import heroImage from '../assets/hero-image.webp'; // Importe a imagem
import './HeroSection.css'; // Importe o arquivo CSS

function HeroSection() {
  return (
    <section className="hero-section">
      <img src={heroImage} alt="Pessoas praticando Pilates" />
      <div className="hero-text">
        <h1>Transforme seu corpo e mente com Pilates</h1>
        <p>Descubra os benefícios do Pilates para flexibilidade, força, postura e bem-estar geral.</p>
        <button>Agende sua aula experimental</button>
      </div>
    </section>
  );
}

export default HeroSection;