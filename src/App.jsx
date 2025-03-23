import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MenuAluno from './pages/MenuAluno';
import MenuOrientador from './pages/MenuOrientador';
import './App.css';
import flexibilityIcon from './assets/flexibility-icon.svg';
import coreIcon from './assets/core-icon.svg';
import stressIcon from './assets/stress-icon.svg';
import heroImage from './assets/hero-image.webp';

function App() {
  const isAuthenticated = () => {
    // Aqui você deve adicionar a lógica para verificar se o usuário está autenticado
    // Por exemplo, verificar se há um token de autenticação armazenado
    return false; // Retorne true se o usuário estiver autenticado, false caso contrário
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/aluno/principal"
          element={isAuthenticated() ? <MenuAluno /> : <Navigate to="/login" />}
        />
        <Route
          path="/orientador/principal"
          element={isAuthenticated() ? <MenuOrientador /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div className="App">
      <header>
        <h1>Perfect Posture Pilates</h1>
        <nav aria-label="Navegação principal">
          <a href="#pilates">Pilates</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#metodo">Nosso Método</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        <section className="hero" role="img" aria-label="Mulher praticando pilates em estúdio">
          <div>
            <h1>Restaure Seu Corpo com Pilates Inteligente</h1>
            <p>Bem-vindo à Perfect Posture Pilates, onde oferecemos um método contemporâneo de pilates.</p>
            <a href="/login" className="cta-button" aria-label="Começar agora">Começar Agora</a>
          </div>
        </section>

        <section className="benefits">
          <article className="benefit">
            <img src={flexibilityIcon} alt="Ícone de flexibilidade" loading="lazy" />
            <h3>Aumenta a Flexibilidade</h3>
            <p>Melhore sua amplitude de movimento e flexibilidade.</p>
          </article>

          <article className="benefit">
            <img src={coreIcon} alt="Ícone de fortalecimento do core" loading="lazy" />
            <h3>Fortalece o Core</h3>
            <p>Desenvolva um core forte para melhor postura.</p>
          </article>

          <article className="benefit">
            <img src={stressIcon} alt="Ícone de redução de estresse" loading="lazy" />
            <h3>Reduz o Estresse</h3>
            <p>Pratique pilates para relaxar e reduzir o estresse.</p>
          </article>
        </section>
      </main>

      <footer>
        <p>© 2025 Perfect Posture Pilates | Contato: contato@perfectposture.com</p>
      </footer>
    </div>
  );
}

export default App;