// src/App.jsx
import React from 'react';
// Removido BrowserRouter daqui, importado Routes e Route
import { Routes, Route } from 'react-router-dom'; 
// Componentes e Páginas
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import LandingScreen from './components/LandingScreen';
import Principal from './components/Principal';
import NossoEspaco from './pages/NossoEspaco';
import Instrutores from './pages/Instrutores';
import Aulas from './pages/Aulas';
// CSS Global (opcional, dependendo da sua estrutura)
// import './global.css'; 

// Placeholders para componentes CRUD futuros (se precisar descomentar rotas filhas)
// const Placeholder = ({ title }) => <div>Placeholder: {title}</div>;
// const AulasCRUD = () => <Placeholder title="Aulas CRUD" />;
// const AlunosCRUD = () => <Placeholder title="Alunos CRUD" />;
// const InstrutoresCRUD = () => <Placeholder title="Instrutores CRUD" />;
// const NotFoundPage = () => <div>404 - Página não encontrada</div>; // Exemplo de página 404

function App() {
  return (
    // O <BrowserRouter> foi movido para main.jsx (ou index.jsx)
    // O <main> pode ser usado para semântica ou estilos globais se necessário
    <main>
      <Routes>
        {/* --- Rotas Públicas --- */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/nosso-espaco" element={<NossoEspaco />} />
        <Route path="/instrutores" element={<Instrutores />} />
        <Route path="/aulas" element={<Aulas />} />

        {/* --- Rota de Login --- */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- Rota Protegida do Dashboard --- */}
        {/* A rota pai /dashboard é protegida pelo PrivateRoute */}
        <Route
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard /> {/* O Dashboard contém o layout e o <Outlet/> */}
            </PrivateRoute>
          }
        >
            {/* --- Rotas Filhas do Dashboard (Renderizadas no <Outlet/>) --- */}
            
            {/* Rota índice padrão: O que é exibido em /dashboard */}
            <Route index element={<div>Bem-vindo ao Dashboard! Selecione uma opção no menu.</div>} /> 
            
            {/* Rotas para cada seção CRUD (descomente quando criar os componentes) */}
            {/* 
            <Route path="aulas" element={<AulasCRUD />} />
            <Route path="alunos" element={<AlunosCRUD />} />
            <Route path="instrutores" element={<InstrutoresCRUD />} /> 
            */}
            {/* Adicione mais rotas filhas aqui conforme necessário */}

        </Route>

        {/* --- Rota Curinga (404 - Página Não Encontrada) --- */}
        {/* Descomente se você criar um componente NotFoundPage */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}

      </Routes>
    </main>
    // O </BrowserRouter> foi removido daqui
  );
}

export default App;