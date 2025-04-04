// src/pages/Instrutores.jsx
import React from 'react';
import './Instrutores.css'; // Importe o arquivo CSS

function Instrutores() {
  return (
    <div className="instrutores">
      <h1>Nossos Instrutores</h1>
      <p>Conheça a nossa equipe de instrutores altamente qualificados e experientes.</p>
      <div className="instrutor">
        <h2>Renata Squizzato</h2>
        <p>Especialista em Pilates com mais de 10 anos de experiência.</p>
        {/* Adicione a foto do instrutor aqui */}
        <img src="https://via.placeholder.com/150x150" alt="Renata Squizzato" />
        <p>Certificações: ...</p>
        <p>Formação: ...</p>
      </div>
    </div>
  );
}

export default Instrutores;