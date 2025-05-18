// src/pages/Dashboard.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout, isInstructor } = useAuth();
  const navigate = useNavigate();

  // ... (handleLogout e verificações de segurança como antes) ...
  if (!user || !isInstructor) {
    // Esta verificação é uma segurança extra, PrivateRoute já deve ter feito
    // Em um app real, você poderia redirecionar ou mostrar uma mensagem mais amigável
    return <div>Acesso não autorizado ou sessão inválida. Redirecionando...</div>;
  }

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <h2>Dashboard</h2>
        <hr style={{ margin: '10px 0 20px 0' }} />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/aulas">Gerenciar Aulas</Link></li>
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/contato">Gerenciar Contato</Link></li> {/* << LINK ADICIONADO */}
          {/* Descomente os links abaixo quando os componentes estiverem prontos */}
          {/* <li style={{ marginBottom: '10px' }}><Link to="/dashboard/alunos">Gerenciar Alunos</Link></li> */}
          {/* <li style={{ marginBottom: '10px' }}><Link to="/dashboard/instrutores">Gerenciar Instrutores</Link></li> */}
        </ul>
        <hr style={{ margin: '20px 0' }} />
        <button onClick={handleLogout}>Logout ({user?.email?.split('@')[0]})</button>
      </nav>

      <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet /> {/* Renderiza AulasCRUD ou GerenciarContato, etc. */}
      </main>
    </div>
  );
}

export default Dashboard;