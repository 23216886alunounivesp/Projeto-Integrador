// src/App.jsx
import React from 'react';
// Removido BrowserRouter daqui
import { Routes, Route } from 'react-router-dom';

// Páginas e Componentes Públicos
import LandingScreen from './components/LandingScreen';
import Principal from './components/Principal';
import NossoEspaco from './pages/NossoEspaco';
import Instrutores from './pages/Instrutores';
import Aulas from './pages/Aulas';
import LoginPage from './pages/LoginPage';

// Componentes de Autenticação e Dashboard
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

// Componentes CRUD para o Dashboard
import AulasCRUD from './pages/AulasCRUD'; // Importe AulasCRUD
import GerenciarContato from './pages/GerenciarContato'; // << IMPORTADO
// import AlunosCRUD from './pages/AlunosCRUD'; // Descomente quando criar
// import InstrutoresCRUD from './pages/InstrutoresCRUD'; // Descomente quando criar

function App() {
  return (
    // BrowserRouter está agora em main.jsx
    <main>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/nosso-espaco" element={<NossoEspaco />} />
        <Route path="/instrutores" element={<Instrutores />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rota Protegida do Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Define AulasCRUD como a página padrão do dashboard */}
          <Route index element={<AulasCRUD />} />
          <Route path="aulas" element={<AulasCRUD />} />
          <Route path="contato" element={<GerenciarContato />} /> {/* << ROTA ADICIONADA */}
          {/* Descomente as rotas abaixo quando os componentes estiverem prontos */}
          {/* <Route path="alunos" element={<AlunosCRUD />} /> */}
          {/* <Route path="instrutores" element={<InstrutoresCRUD />} /> */}
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </main>
  );
}

export default App;