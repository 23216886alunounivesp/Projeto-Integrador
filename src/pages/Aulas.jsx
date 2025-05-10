// src/pages/Aulas.jsx
import React from 'react';
import './Aulas.css'; // Mantenha para estilos específicos de títulos, listas, etc.
import PageHeader from '../components/PageHeader';

function Aulas() {
  return (
    <div> {/* Container Geral */}
       <PageHeader title="Aulas" />

      {/* Aplique a classe genérica aqui */}
      <div className="page-content-container">

        <h1>Nossas Aulas</h1>
        <p>Confira os tipos de aulas que oferecemos em nosso estúdio, projetadas para atender a todos os níveis e necessidades.</p>

        <div className="aulas-section"> {/* Container opcional para agrupar tipos de aulas */}
          <h2>Tipos de Aulas</h2>
          <ul>
             {/* Exemplo usando ícone placeholder */}
            <li><span className="icon-placeholder">🧘</span>Pilates Clássico</li>
            <li><span className="icon-placeholder">🤸</span>Pilates Contemporâneo</li>
            <li><span className="icon-placeholder">🤰</span>Pilates para Gestantes</li>
            <li><span className="icon-placeholder">👵</span>Pilates para Idosos</li>
            <li><span className="icon-placeholder">💪</span>Pilates Funcional (Exemplo)</li>
          </ul>
        </div>

        <div className="horarios-section"> {/* Container opcional */}
          <h2>Horários</h2>
          <p>Segunda a Sexta: <strong>7h às 22h</strong></p>
          <p>Sábado: <strong>8h às 12h</strong></p>
        </div>

        <div className="agendamento-section"> {/* Container opcional */}
          <h2>Agendamento</h2>
          <p>Para agendar sua aula experimental gratuita ou obter mais informações, entre em contato conosco:</p>
          <p><span className="icon-placeholder">📞</span>Telefone: <strong>(12) 3456-7890</strong></p>
          <p><span className="icon-placeholder">✉️</span>E-mail: <strong>agendamento@escoladepilates.com.br</strong></p>
        </div>

      </div>
    </div>
  );
}

export default Aulas;