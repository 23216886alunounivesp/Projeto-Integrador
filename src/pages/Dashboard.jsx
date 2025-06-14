// src/pages/Dashboard.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  console.log("Dashboard Completo: Renderizando...");
  const { user, logout, isInstructor } = useAuth();
  const navigate = useNavigate();
  console.log("Dashboard Completo: Estado Auth recebido:", { user, isInstructor });

  // ==============================================
  // ADICIONE A FUNÇÃO handleLogout DE VOLTA AQUI:
  // ==============================================
  const handleLogout = async () => {
    console.log("Dashboard: Botão Logout Clicado!");
    try {
      console.log("Dashboard: Chamando await logout()...");
      await logout(); // Chama a função logout do AuthContext
      console.log("Dashboard: await logout() concluído.");
      console.log("Dashboard: Navegando para / ...");
      navigate('/'); // Redireciona para a home após logout
    } catch (error) {
      console.error("Dashboard: Erro dentro do handleLogout:", error);
      alert("Erro ao tentar deslogar: " + (error.message || "Erro desconhecido"));
    }
  };
  // ==============================================

  // Verificações de segurança (redundantes se PrivateRoute funciona, mas não prejudicam)
  if (!user) { // Se, após o loading do AuthContext, ainda não há user
    console.error("Dashboard: Tentando renderizar sem usuário válido (user é null/undefined). Redirecionando para login.");
    // Idealmente, PrivateRoute já teria lidado com isso, mas como fallback:
    // setTimeout(() => navigate('/login', { replace: true }), 0); // Evita erro de render durante render
    return <div>Sessão inválida. Redirecionando para login...</div>;
  }
  if (!isInstructor) {
     console.error("Dashboard: Tentando renderizar para usuário não instrutor!");
     // Idealmente, PrivateRoute já teria lidado com isso
     return <div>Acesso não autorizado.</div>;
  }

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <h2>Dashboard</h2>
        <hr style={{ margin: '10px 0 20px 0' }} />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/aulas">Gerenciar Aulas</Link></li>
          <li style={{ marginBottom: '10px' }}><Link to="/dashboard/contato">Gerenciar Contato</Link></li>
          {/* ... outros links ... */}
        </ul>
        <hr style={{ margin: '20px 0' }} />
        <button onClick={handleLogout}>Logout ({user.email?.split('@')[0]})</button> {/* user.email aqui é mais seguro */}
      </nav>
      <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;