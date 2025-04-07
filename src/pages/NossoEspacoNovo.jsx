import React from 'react';
import './NossoEspacoNovo.css';

function NossoEspacoNovo() {
  return (
    <div className="contact-container">
      <h1>Nosso Espaço</h1>
      <div className="contact-content">
        <div className="welcome-section">
          <h2>Bem-vindo ao Nosso Espaço!</h2>
          <p>Aqui você encontrará uma visão geral do que oferecemos, incluindo fotos e vídeos do nosso ambiente acolhedor e das atividades que realizamos.</p>
        </div>
        <div className="gallery">
          <div className="gallery-item">
            <img src="/assets/gallery1.jpg" alt="Foto/Vídeo 1" />
          </div>
          <div className="gallery-item">
            <img src="/assets/gallery2.jpg" alt="Foto/Vídeo 2" />
          </div>
          <div className="gallery-item">
            <img src="/assets/gallery3.jpg" alt="Foto/Vídeo 3" />
          </div>
          <div className="gallery-item">
            <img src="/assets/gallery4.jpg" alt="Foto/Vídeo 4" />
          </div>
        </div>
        <div className="contact-info">
          <h2>Informações de Contato</h2>
          <ul>
            <li>Localização</li>
            <li>Instagram</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NossoEspacoNovo;