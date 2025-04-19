// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importe seu hook de autenticação

function PrivateRoute({ children }) {
  // Obtenha 'isInstructor' do contexto
  const { user, loading, isInstructor } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Verificando autenticação...</div>; // Ou <LoadingSpinner />
  }

  // Verifica se NÃO HÁ usuário OU se o usuário NÃO É um instrutor
  if (!user || !isInstructor) {
    console.log(`PrivateRoute: Acesso negado. User: ${!!user}, IsInstructor: ${isInstructor}`);
    // Redireciona para login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se chegou aqui, está logado E é instrutor
  console.log(`PrivateRoute: Acesso permitido. User: ${!!user}, IsInstructor: ${isInstructor}`);
  return children; // Renderiza o componente protegido (Dashboard)
}

export default PrivateRoute;