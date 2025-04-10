import React from 'react';
import './HeroSection.css';
import heroImageSmall from '../assets/hero-image-small.webp';
import heroImageMedium from '../assets/hero-image-medium.webp';
import heroImageLarge from '../assets/hero-image-large.webp';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Transforme seu corpo e mente com Pilates</h1>
        <p>Descubra os benefícios do Pilates para flexibilidade, força, postura e bem-estar geral.</p>
        <button>Agende sua aula experimental</button>
      </div>
      <img
        src={heroImageLarge} // Usar a imagem grande como src padrão
        srcset={`${heroImageSmall} 480w, ${heroImageMedium} 768w, ${heroImageLarge} 1024w`}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1024px"
        alt="Pessoas praticando Pilates"
        loading="lazy" // Adicione este atributo para carregar a imagem de forma lazy
      />
    </section>
  );
}

export default HeroSection;