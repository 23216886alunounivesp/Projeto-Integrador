// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom'; // 1. IMPORTE useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true); // Começa como true
  const navigate = useNavigate(); // 2. INICIALIZE useNavigate

  // --- LOG INICIAL ---
  console.log('AuthProvider: Montado ou Renderizado');

  // Função para verificar se um user ID existe na tabela 'instrutores'
  const checkIsInstructor = useCallback(async (userId) => {
    console.log(`[checkIsInstructor] Iniciando para userId: ${userId}`);
    if (!userId) {
      console.log("[checkIsInstructor] userId nulo ou indefinido. Retornando false.");
      return false;
    }
    try {
      console.log(`[checkIsInstructor] Executando query: supabase.from('instrutores').select('id', { head: true }).eq('user_id', ${userId})`);
      const { error, status } = await supabase
        .from('instrutores')
        .select('id', { head: true })
        .eq('user_id', userId);

      console.log(`[checkIsInstructor] Resultado da Query - Status: ${status}, Error: ${JSON.stringify(error)}`);

      if (error && status !== 406) { // 406 = Range not satisfiable (esperado para 'not found' com head)
        console.error('[checkIsInstructor] Erro na query Supabase:', error);
        return false;
      }
      const found = status === 200;
      console.log(`[checkIsInstructor] Registro encontrado? ${found}. Retornando ${found}.`);
      return found;
    } catch (err) {
      console.error('[checkIsInstructor] Erro inesperado no try/catch em checkIsInstructor:', err);
      return false;
    }
  }, []);

  // useEffect Principal para lidar com autenticação
  useEffect(() => {
    let isMounted = true;
    // Não setamos loading true aqui no início do useEffect,
    // pois getSession já fará isso e o listener pode ser chamado antes.
    // setLoading(true) no início do AuthProvider já cobre o carregamento inicial.
    console.log("AuthContext useEffect: Registrando listeners e buscando sessão inicial...");

    // Função interna para processar a sessão
    // 3. ADICIONE isInitialSession como parâmetro
    const handleAuthSession = async (currentSession, isInitialSession = false) => {
      if (!isMounted) {
        console.log("handleAuthSession: Componente desmontado, abortando atualização de estado.");
        return;
      }

      console.log("handleAuthSession: Processando sessão. É inicial?", isInitialSession, "Sessão:", currentSession);
      const currentUser = currentSession?.user ?? null;
      let currentIsInstructor = false;

      if (currentUser) {
        console.log(`handleAuthSession: Usuário encontrado (${currentUser.id}). Chamando checkIsInstructor...`);
        currentIsInstructor = await checkIsInstructor(currentUser.id);
        console.log(`handleAuthSession: checkIsInstructor retornou ${currentIsInstructor} para usuário ${currentUser.id}`);
      } else {
        console.log("handleAuthSession: Nenhum usuário na sessão, isInstructor será false.");
      }

      if (isMounted) {
        console.log("handleAuthSession: Atualizando estados:", { userId: currentUser?.id, isInstructor: currentIsInstructor, sessionExists: !!currentSession });
        setSession(currentSession);
        setUser(currentUser);
        setIsInstructor(currentIsInstructor);
        
        // Garante que loading fique false APÓS processar a sessão
        // e a verificação de instrutor, se houver.
        // Se já estiver false, não há problema em chamar de novo.
        console.log("handleAuthSession: Definindo loading como false.");
        setLoading(false);

        // 4. ADICIONE ESTA LÓGICA DE REDIRECIONAMENTO
        if (!isInitialSession && currentUser && currentIsInstructor) {
          console.log("handleAuthSession: Usuário instrutor logado (não é sessão inicial), redirecionando para /dashboard");
          navigate('/dashboard', { replace: true });
        } else if (!isInitialSession && currentUser && !currentIsInstructor) {
          console.log("handleAuthSession: Usuário não-instrutor logado (não é sessão inicial), redirecionando para /");
          navigate('/', { replace: true });
        }
      }
    };

    // Verifica a sessão inicial ao montar
    // setLoading(true) é chamado no início do componente AuthProvider
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("AuthContext useEffect: getSession concluído.");
      handleAuthSession(initialSession, true); // 5. PASSE true para isInitialSession
    }).catch(error => {
      console.error("AuthContext useEffect: Erro em getSession:", error);
      if (isMounted) {
        console.log("AuthContext useEffect: Erro em getSession, definindo loading como false e resetando estado.");
        setSession(null);
        setUser(null);
        setIsInstructor(false);
        setLoading(false);
      }
    });

    // Ouve mudanças futuras
    console.log("AuthContext useEffect: Configurando listener onAuthStateChange...");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (_event === 'INITIAL_SESSION' && isMounted) {
          // A sessão inicial já foi (ou está sendo) tratada por getSession.
          // No entanto, é bom garantir que loading vire false se por algum motivo
          // onAuthStateChange com INITIAL_SESSION dispare antes de getSession().then().
          console.log("AuthContext onAuthStateChange: Evento INITIAL_SESSION recebido, garantindo que loading finalize se ainda não o fez.");
          if (loading) setLoading(false);
          return;
        }
        
        // Trata eventos de login ou logout para redirecionamento
        if ((_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') && isMounted) {
          console.log("AuthContext onAuthStateChange: Evento de Autenticação recebido:", _event);
          handleAuthSession(currentSession, false); // 6. PASSE false para isInitialSession
        } else if (isMounted) {
          // Para outros eventos (ex: TOKEN_REFRESHED, USER_UPDATED),
          // apenas atualize a sessão/usuário sem causar redirecionamentos desnecessários.
          console.log("AuthContext onAuthStateChange: Evento:", _event, "(não é login/logout), apenas atualizando sessão/usuário.");
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          // Não chama checkIsInstructor aqui para evitar chamadas excessivas em refresh de token,
          // a menos que você tenha um caso de uso onde o status de instrutor possa mudar durante uma sessão ativa.
        }
      }
    );

    // Limpeza ao desmontar
    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
      console.log("AuthContext: Listener removido (desmontagem).");
    };
  // 7. ADICIONE navigate às dependências. Removi 'loading' para evitar loops potenciais.
  }, [checkIsInstructor, navigate]);

  // Valor do contexto
  const value = { session, user, isInstructor, loading, logout: () => supabase.auth.signOut() };

  // Log antes de renderizar
  console.log("AuthProvider: Renderizando com:", { loading, userId: user?.id, isInstructor: !!isInstructor });

  // Renderiza filhos apenas quando o carregamento inicial terminar
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook customizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};