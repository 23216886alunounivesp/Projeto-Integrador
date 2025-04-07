// src/components/Principal.jsx
import React from 'react';
import './Principal.css';
// Não há mais import de logoPrincipal aqui

// Pode importar imagem real para o placeholder se desejar:
// import placeholderImage from '../assets/sua-imagem-de-pratica.jpg';

function Principal() {
  return (
    // A classe principal-content define a largura máxima e margens
    <div className="principal-content">

      {/* Título Principal */}
      <h1>Informações sobre o Studio de Pilates</h1>

      {/* Container para as colunas principais */}
      <div className="content-columns">

        {/* Coluna da Esquerda */}
        <div className="left-column">
          <h2>Sobre a Prática de Pilates</h2>
          <p>
            Studio de Pilates Dra Renata Sguizzato é um estúdio boutique de Pilates dedicado ao ensino do método Pilates Clássico. O ensino do Pilates é nosso foco e nossa paixão, e mal podemos esperar para compartilhar nosso amor pelo método com você. Mantemos tudo autêntico, sem pretensões, apenas Pilates puro! Tudo gira em torno de nossos clientes. Atendemos você onde você está e o ajudamos a alcançar seus objetivos. Corpos saudáveis são nossa prioridade.
          </p>
          {/* Placeholder ou local para imagem */}
          <div className="practice-image-placeholder">
             {/* <img src={placeholderImage} alt="Aluna praticando Pilates"/> */}
             <span>Imagem Ilustrativa da Prática</span>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="right-column">
          {/* Seção Por que Pilates? */}
          <div className="why-pilates-box">
            <h2>Por que Pilates?</h2>
            <p>
              Experimente os efeitos positivos que o Pilates pode proporcionar para a saúde geral, condicionamento físico e desempenho atlético.
            </p>
          </div>

          {/* Seção Nossos Serviços */}
          <div className="services-box">
            <h2>Nossos Serviços Melhorados</h2>
            <ul>
              <li>Oferecemos aulas particulares presenciais e online, além de sessões semi-particulares com todo o equipamento de Pilates</li>
              <li>Visite nosso estúdio no Alto da Mooca, onde nossos instrutores certificados irão personalizar um programa de Pilates que atenda às suas necessidades e objetivos específicos</li>
              <li>Nosso estúdio está equipado com autênticos aparelhos de Pilates e nossos instrutores mantêm os mais altos níveis de treinamento em Pilates</li>
              <li>Oferecemos horários flexíveis para melhor atender sua agenda</li>
              <li>Agendamento facilitado através do sistema MindBody ou contato direto com o estúdio por e-mail</li>
              <li>Primeira avaliação gratuita para novos alunos</li>
              <li>Pacotes de aulas com descontos progressivos</li>
              <li>Atendimento personalizado com foco em seus objetivos individuais</li>
            </ul>
          </div>

           {/* Botão de Ação */}
           <div className="cta-section">
              <button className="cta-button-principal">Agende sua aula experimental</button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Principal;