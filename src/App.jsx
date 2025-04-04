// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Principal from './components/Principal';
import NossoEspaco from './pages/NossoEspaco';
import Instrutores from './pages/Instrutores';
import Aulas from './pages/Aulas'; // Importe o componente Aulas

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/nosso-espaco" element={<NossoEspaco />} />
          <Route path="/instrutores" element={<Instrutores />} />
          <Route path="/aulas" element={<Aulas />} /> {/* Rota para a página Aulas */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;