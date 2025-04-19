// src/pages/Dashboard.jsx (Versão Completa com Layout e Navegação)
import React from 'react';
// Importe Outlet se for usar rotas filhas IMEDIATAMENTE. Se não, pode importar depois.
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Adicione CSS se desejar para estilizar o layout do dashboard
// import './Dashboard.css';

function Dashboard() {
  // Log para confirmar renderização
  console.log("Dashboard Completo: Renderizando...");

  const { user, logout, isInstructor } = useAuth(); // Pega user e logout
  const navigate = useNavigate();

   // Log para ver o estado recebido
   console.log("Dashboard Completo: Estado Auth recebido:", { user, isInstructor });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redireciona para a home após logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Verificações de segurança (redundantes se PrivateRoute funciona, mas não prejudicam)
  if (!user) {
    console.error("Dashboard: Tentando renderizar sem usuário!");
    return <div>Redirecionando para login...</div>; // Ou um redirecionamento real
  }
  if (!isInstructor) {
     console.error("Dashboard: Tentando renderizar para usuário não instrutor!");
     return <div>Acesso não autorizado.</div>;
  }

  return (
    // Use display: flex para layout de barra lateral + conteúdo principal
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Barra Lateral de Navegação */}
      <nav style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <h2>Dashboard</h2>
        <hr style={{ margin: '10px 0 20px 0' }} />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {/* Links para as seções CRUD */}
          {/* Descomente os links à medida que criar as rotas e componentes */}
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/aulas">Gerenciar Aulas</Link></li>
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/alunos">Gerenciar Alunos</Link></li>
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/instrutores">Gerenciar Instrutores</Link></li>
          {/* Adicione links para Gestão Principal e Nosso Espaço se criar rotas para eles */}
          {/* <li style={{ marginBottom: '10px' }}><Link to="/dashboard/principal-content">Gerenciar Página Principal</Link></li> */}
          {/* <li style={{ marginBottom: '10px' }}><Link to="/dashboard/nosso-espaco-content">Gerenciar Nosso Espaço</Link></li> */}
        </ul>
        <hr style={{ margin: '20px 0' }} />
        <button onClick={handleLogout}>Logout ({user?.email?.split('@')[0]})</button>
      </nav>

      {/* Área Principal de Conteúdo */}
      <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
        {/* O Outlet renderiza o componente da rota filha ativa */}
        {/* Certifique-se de ter uma rota index definida em App.jsx para exibir algo aqui por padrão */}
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;