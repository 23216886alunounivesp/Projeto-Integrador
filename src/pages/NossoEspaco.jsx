// src/pages/NossoEspaco.jsx
import React from 'react';
import './NossoEspaco.css';
import PageHeader from '../components/PageHeader'; // Importe o PageHeader
// import studioImage from '../assets/studio-exterior.jpg'; // Exemplo: Imagem para a seção "Perguntas"

function NossoEspaco() {
  // SUBSTITUA O CONTEÚDO DESTA STRING PELO NOVO IFRAME COPIADO:
  const googleMapsEmbed = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.3357426238495!2d-46.585152199999996!3d-23.5563823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5f02eb4f54fb%3A0x734bb740d568c6a2!2sStudio%20de%20Pilates%20Dra%20Renata%20Sguizzato!5e0!3m2!1spt-BR!2sbr!4v1744509608594!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

  return (
    <div className="nosso-espaco-page"> {/* Container principal da página */}
      <PageHeader title="Nosso Espaço" /> {/* Adicione o PageHeader NO TOPO com o título "Nosso Espaço" */}

      {/* --- Seção Superior: Contato e Mapa --- */}
      <section className="contact-info-map-section">
        <div className="contact-details">
          <h2>FALE CONOSCO</h2>
          <div className="contact-item">
            <span className="icon-placeholder">📍</span>
            <div className="contact-text">
              <strong>LOCALIZAÇÃO</strong>
              <span>Endereço: Rua X, 123 - Bairro Y - Cidade Z</span>
              {/* Adicione mais detalhes se necessário */}
            </div>
          </div>
          <div className="contact-item">
            <span className="icon-placeholder">📞</span>
            <div className="contact-text">
              <strong>TELEFONE</strong>
              <span>(12) 3456-7890</span>
            </div>
          </div>
          <div className="contact-item">
            <span className="icon-placeholder">✉️</span>
            <div className="contact-text">
              <strong>E-MAIL</strong>
              <span>contato@escoladepilates.com.br</span>
            </div>
          </div>
          <div className="contact-item social-links">
            <span className="icon-placeholder">📱</span>
            <div className="contact-text">
              <strong>REDES SOCIAIS</strong>
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a> |{' '}
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div className="map-container">
          {/* Renderiza o iframe do Google Maps */}
          <div dangerouslySetInnerHTML={{ __html: googleMapsEmbed }} />
        </div>
      </section>

      {/* --- Seção Inferior: Perguntas e Formulário --- */}
      <section className="questions-form-section">
        <div className="questions-image-wrapper">
          <h2>TEM ALGUMA PERGUNTA?</h2>
          <div className="studio-image-placeholder">
            {/* <img src={studioImage} alt="Foto do Studio Pilates"/> */}
            <span>Foto do Studio</span>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="firstName">Nome *</label>
              <input type="text" id="firstName" name="firstName" required placeholder="Primeiro nome" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="lastName">Sobrenome</label>
              <input type="text" id="lastName" name="lastName" placeholder="Último nome" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="phone">Telefone</label>
              <input type="tel" id="phone" name="phone" placeholder="(XX) XXXXX-XXXX" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="email">E-mail *</label>
              <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Mensagem *</label>
            <textarea id="comments" name="comments" rows="6" required placeholder="Digite sua pergunta ou comentário aqui..."></textarea>
          </div>

          {/* Placeholder para o CAPTCHA - Implementação real é mais complexa */}
          <div className="form-group captcha-placeholder">
            <span>[Espaço para reCAPTCHA ou similar]</span>
          </div>

          <div className="form-group submit-area">
            <button type="submit" className="submit-button">Enviar Mensagem</button>
          </div>
        </form>
      </section>

    </div>
  );
}

export default NossoEspaco;