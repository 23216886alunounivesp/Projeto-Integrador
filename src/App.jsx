// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Principal from './components/Principal';
import NossoEspaco from './pages/NossoEspaco';
import Instrutores from './pages/Instrutores';
import Aulas from './pages/Aulas';
import './global.css';

// Importa a imagem do banner da pasta src/assets
import heroBannerSrc from './assets/fotoabaixobarra.jpg';
// Ajuste o caminho './assets/' se necessário

function App() {
  return (
    <BrowserRouter>
      {/* Header fixo fora do fluxo principal */}
      <Header />

      {/* Container e Imagem do Banner abaixo do Header */}
      <div className="hero-banner-container">
        <img
          src={heroBannerSrc} // Usa a variável importada
          alt="Banner Studio Pilates"
          className="hero-banner-image"
        />
      </div>

      {/* Conteúdo principal das páginas, com padding para compensar header */}
      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/nosso-espaco" element={<NossoEspaco />} />
          <Route path="/instrutores" element={<Instrutores />} />
          <Route path="/aulas" element={<Aulas />} />
          {/* Adicione outras rotas aqui se necessário */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;