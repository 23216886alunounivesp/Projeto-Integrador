// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ... outros imports ...
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // Importe PrivateRoute
import Dashboard from './pages/Dashboard';       // Importe Dashboard
import LandingScreen from './components/LandingScreen';
import Principal from './components/Principal';
import NossoEspaco from './pages/NossoEspaco';
import Instrutores from './pages/Instrutores';
import Aulas from './pages/Aulas';
import AulasCRUD from './pages/AulasCRUD';
// Importe ou crie componentes placeholder se necessário
// const Placeholder = ({ title }) => <div>Placeholder: {title}</div>;
// const AulasCRUD = () => <Placeholder title="Aulas CRUD" />;
// const AlunosCRUD = () => <Placeholder title="Alunos CRUD" />;
// const InstrutoresCRUD = () => <Placeholder title="Instrutores CRUD" />;


function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingScreen />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/nosso-espaco" element={<NossoEspaco />} />
          <Route path="/instrutores" element={<Instrutores />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rota Protegida do Dashboard - AGORA DESCOMENTADA */}
          <Route
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
              {/* Rotas Filhas (Exemplo - crie componentes para elas) */}
              {/* Se AulasCRUD existe: */}
              {/* <Route path="aulas" element={<AulasCRUD />} /> */}
              {/* Se AlunosCRUD existe: */}
              {/* <Route path="alunos" element={<AlunosCRUD />} /> */}
              {/* Se InstrutoresCRUD existe: */}
              {/* <Route path="instrutores" element={<InstrutoresCRUD />} /> */}

              {/* Rota índice padrão (o que mostrar em /dashboard) */}
              {/* Pode ser uma das rotas acima ou um componente de boas-vindas */}
              {/* Exemplo: Mostrar AulasCRUD por padrão */}
              {/* <Route index element={<AulasCRUD />} /> */}
              {/* Ou um placeholder */}
              <Route index element={<div>Bem-vindo ao Dashboard! Selecione uma opção.</div>} />
          </Route>

          {/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;