// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingScreen from './components/LandingScreen';
import Principal from './components/Principal';
import NossoEspaco from './pages/NossoEspaco';
import Instrutores from './pages/Instrutores';
import Aulas from './pages/Aulas';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AulasCRUD from './pages/AulasCRUD';
import GerenciarContato from './pages/GerenciarContato';
// import NotFoundPage from './pages/NotFoundPage'; // Se você criar um

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/nosso-espaco" element={<NossoEspaco />} />
        <Route path="/instrutores" element={<Instrutores />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<AulasCRUD />} />
          <Route path="aulas" element={<AulasCRUD />} />
          <Route path="contato" element={<GerenciarContato />} />
          {/* Futuras rotas do dashboard: */}
          {/* <Route path="alunos" element={<AlunosCRUD />} /> */}
          {/* <Route path="instrutores" element={<InstrutoresCRUD />} /> */}
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </main>
  );
}

export default App;