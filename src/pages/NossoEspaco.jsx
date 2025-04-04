// src/pages/NossoEspaco.jsx
import React from 'react';
import './NossoEspaco.css';

function NossoEspaco() {
  return (
    <div className="nosso-espaco">
      <h1>Nosso Espaço</h1>
      <p>Bem-vindo ao nosso estúdio! Aqui você encontrará fotos e vídeos do nosso espaço acolhedor e moderno.</p>
      <p>Nosso estúdio foi projetado para proporcionar uma experiência única e relaxante. Contamos com equipamentos de última geração, como aparelhos de Pilates da marca X, para garantir o máximo de conforto e eficiência em suas aulas.</p>
      <div className="galeria">
        <img src="/assets/foto1.jpg" alt="Foto 1" />
        <img src="/assets/foto2.jpg" alt="Foto 2" />
        <video src="/assets/video1.mp4" controls /> {/* Adicione um vídeo */}
      </div>
      <h2>Contato</h2>
      <p>Endereço: Rua X, 123 - Bairro Y - Cidade Z</p>
      <p>Telefone: (12) 3456-7890</p>
      <p>E-mail: contato@escoladepilates.com.br</p>
      <p>Siga-nos nas redes sociais: <a href="#">Facebook</a> | <a href="#">Instagram</a></p>
    </div>
  );
}

export default NossoEspaco;