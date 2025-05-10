// src/pages/Instrutores.jsx
import React from 'react';
import './Instrutores.css'; // Mantenha para estilos específicos de .instrutor, etc.
import PageHeader from '../components/PageHeader';

function Instrutores() {
  return (
    <div> {/* Container Geral */}
      <PageHeader title="Instrutores" />

      {/* Aplique a classe genérica aqui */}
      <div className="page-content-container">

        <h1>Nossos Instrutores</h1>
        <p>Conheça a nossa equipe de instrutores altamente qualificados e experientes.</p>

        {/* Estrutura do instrutor (mantém estilos de Instrutores.css) */}
        <div className="instrutor">
          {/* Imagem já será estilizada pelo CSS */}
          <img src="https://via.placeholder.com/150x150" alt="Renata Squizzato" />
          <h2>Renata Squizzato</h2>
          <p>Especialista em Pilates com mais de 10 anos de experiência.</p>
          <p><strong>Certificações:</strong> <span className="certificacao">Certificação A</span>, <span className="certificacao">Certificação B</span></p> {/* Exemplo */}
          <p><strong>Formação:</strong> Graduação em Fisioterapia</p> {/* Exemplo */}
          {/* Você pode adicionar mais instrutores seguindo a mesma estrutura .instrutor */}
        </div>

        {/* Adicione outro instrutor aqui se necessário */}
        {/*
        <div className="instrutor">
          <img src="https://via.placeholder.com/150x150" alt="Outro Instrutor" />
          <h2>Nome do Instrutor</h2>
          <p>Descrição breve.</p>
          <p><strong>Certificações:</strong> ...</p>
          <p><strong>Formação:</strong> ...</p>
        </div>
        */}

      </div>
    </div>
  );
}

export default Instrutores;