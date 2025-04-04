// src/components/Principal.jsx
import React from 'react';
import studioImage from '../assets/hero-image.webp'; // Imagem de abertura

function Principal() {
  return (
    <div className="principal-container">
      <section className="principal">
        <div className="principal-content">
          <h2>Estudio de Pilates Dra Renata Squizzato</h2>
          <p>Olá! Sou a professora Ana Paula, especialista em Pilates, e quero compartilhar com vocês os incríveis benefícios desta prática transformadora. O Pilates não é apenas um exercício físico - é uma filosofia que integra corpo e mente.</p>
          <p>Ao praticar Pilates regularmente, você experimentará maior flexibilidade e força muscular, especialmente no core - seu centro de poder. Sua postura melhorará significativamente, aliviando dores nas costas e pescoço que muitos sofrem no dia a dia.</p>
          <p>Um dos maiores tesouros do Pilates é sua capacidade de reduzir o estresse e aumentar a consciência corporal. Cada movimento é realizado com precisão e respiração controlada, criando uma experiência meditativa que acalma a mente enquanto fortalece o corpo.</p>
          <button>Veja nossas atividades!</button>
        </div>
        <div className="principal-image">
          <img src={studioImage} alt="Foto de Abertura" />
        </div>
      </section>
    </div>
  );
}

export default Principal;