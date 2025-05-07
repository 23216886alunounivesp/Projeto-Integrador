// src/components/PageHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PageHeader.css'; // Importa o CSS associado
import { useAuth } from '../context/AuthContext'; // Importa o hook para acessar o contexto de autenticação

// Componente funcional PageHeader que recebe 'title' como prop
function PageHeader({ title }) {
  // Log para indicar que o componente está sendo renderizado e qual o título
  console.log(`------ PageHeader ('${title}') - Renderizando ------`);

  // Usa o hook useAuth para obter os dados e funções do AuthContext
  const authData = useAuth();
  // Log detalhado do objeto completo retornado por useAuth
  // JSON.stringify é usado para poder visualizar o conteúdo de 'user' e 'session' (se existirem)
  console.log(`PageHeader ('${title}') - Dados recebidos de useAuth():`, JSON.stringify(authData, null, 2));

  // Desestrutura os valores necessários do objeto authData
  const { user, logout } = authData;

  // Obtém a função navigate do react-router-dom para redirecionamento programático
  const navigate = useNavigate();

  // Função assíncrona para lidar com o clique no botão de logout
  const handleLogout = async () => {
    console.log("PageHeader: Botão Logout Clicado!"); // Log 1: Confirma clique
    try {
      console.log("PageHeader: Chamando await logout()..."); // Log 2: Antes de chamar a função do contexto
      await logout(); // Chama a função logout fornecida pelo AuthContext (que chama supabase.auth.signOut())
      console.log("PageHeader: await logout() concluído."); // Log 3: Após a conclusão do logout no Supabase
      console.log("PageHeader: Navegando para / ..."); // Log 4: Antes de redirecionar
      navigate('/'); // Redireciona o usuário para a página inicial após o logout
      console.log("PageHeader: Navegação para / concluída (ou iniciada)."); // Log 5: Após iniciar a navegação
    } catch (error) {
      // Captura e loga qualquer erro que ocorra durante o processo de logout
      console.error("PageHeader: Erro dentro do handleLogout:", error);
      // Mostra um alerta simples para o usuário em caso de erro
      alert("Erro ao tentar deslogar: " + error.message);
    }
  };

  // Estrutura JSX do cabeçalho
  return (
    <header className="page-header"> {/* Container principal com classe CSS */}
      {/* Link para voltar à página inicial (Landing Page) */}
      <Link to="/" className="back-link">
        <span className="back-arrow">←</span> {/* Símbolo de seta */}
      </Link>
      {/* Título da página recebido via props */}
      <h2 className="page-title">{title}</h2>

      {/* Log para verificar a condição de exibição do botão Logout */}
      {console.log(`PageHeader ('${title}'): Verificando condição para botão Logout. User existe? ${!!user}`)}

      {/* Renderização condicional do botão Logout: Só aparece se 'user' não for null/undefined */}
      {user && (
        <button
          onClick={handleLogout} // Associa a função handleLogout ao clique
          style={{ marginLeft: 'auto', padding: '5px 10px' }} // Estilo inline simples
        >
          {/* Log para confirmar que o botão está sendo renderizado */}
          {console.log(`PageHeader ('${title}'): Renderizando botão Logout para usuário:`, user?.email)}
          {/* Texto do botão, mostra "Logout" e parte do email do usuário (com optional chaining) */}
          Logout ({user.email?.split('@')[0]})
        </button>
      )}
    </header>
  );
}

// Exporta o componente para ser usado em outros lugares
export default PageHeader;