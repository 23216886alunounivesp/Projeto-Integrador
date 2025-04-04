// src/pages/Aulas.jsx
import React from 'react';
import './Aulas.css'; // Importe o arquivo CSS

function Aulas() {
  return (
    <div className="aulas">
      <h1>Nossas Aulas</h1>
      <p>Confira os tipos de aulas que oferecemos em nosso estúdio.</p>
      <ul>
        <li>Pilates Clássico</li>
        <li>Pilates Contemporâneo</li>
        <li>Pilates para Gestantes</li>
        <li>Pilates para Idosos</li>
      </ul>
      <h2>Horários</h2>
      <p>Segunda a Sexta: 7h às 22h</p>
      <p>Sábado: 8h às 12h</p>
      <h2>Agendamento</h2>
      <p>Para agendar sua aula, entre em contato conosco:</p>
      <p>Telefone: (12) 3456-7890</p>
      <p>E-mail: agendamento@escoladepilates.com.br</p>
    </div>
  );
}

export default Aulas;