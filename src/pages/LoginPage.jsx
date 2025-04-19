// src/pages/LoginPage.jsx (Versão Limpa - Sem o botão de teste)
import React from 'react';
import { supabase } from '../supabaseClient'; // Importa o cliente Supabase configurado
// Adicione import de CSS se você tiver um arquivo LoginPage.css
// import './LoginPage.css';

function LoginPage() {

  // Função para iniciar o login com Google
  const handleGoogleLogin = async () => {
    console.log("LoginPage: Iniciando login com Google...");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Você pode definir um redirectTo aqui se quiser ir direto para
        // o dashboard após o login, em vez da raiz.
        // redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) {
      console.error('LoginPage: Erro no login com Google:', error);
      alert('Erro ao tentar logar com Google: ' + error.message);
    }
  };

  // Você pode adicionar aqui a lógica e o formulário para login com Email/Senha no futuro, se desejar

  return (
    // Você pode adicionar sua classe CSS aqui ou manter os estilos inline
    <div className="login-page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
      <h1>Login Instrutor</h1>
      <button
        onClick={handleGoogleLogin}
        style={{ padding: '12px 25px', fontSize: '1.1em', cursor: 'pointer' /* Adicione outros estilos que desejar */ }}
      >
        Entrar com Google
      </button>
      {/* Área para futuro formulário de email/senha */}
    </div>
  );
}

export default LoginPage;