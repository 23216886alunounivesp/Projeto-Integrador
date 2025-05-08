// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log('AuthProvider: Montado ou Renderizado');

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

      if (error && status !== 406) {
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

  useEffect(() => {
    let isMounted = true;
    console.log("AuthContext useEffect: Registrando listeners e buscando sessão inicial...");

    const handleAuthSession = async (currentSession, isInitialSession = false) => {
      if (!isMounted) {
        console.log("handleAuthSession: Componente desmontado, abortando atualização de estado.");
        return;
      }

      console.log("handleAuthSession: Processando sessão. É inicial?", isInitialSession, "Sessão:", currentSession ? "Existe" : "Nula");
      const currentUser = currentSession?.user ?? null;
      let currentIsInstructor = false;

      // Log detalhado do currentUser ANTES de chamar checkIsInstructor
      console.log("handleAuthSession: currentUser ANTES da verificação de instrutor:", JSON.stringify(currentUser, null, 2));


      if (currentUser) {
        console.log(`handleAuthSession: Usuário encontrado (${currentUser.id}). Chamando checkIsInstructor...`);
        currentIsInstructor = await checkIsInstructor(currentUser.id);
        console.log(`handleAuthSession: checkIsInstructor retornou ${currentIsInstructor} para usuário ${currentUser.id}`);
      } else {
        console.log("handleAuthSession: Nenhum usuário na sessão, isInstructor será false.");
      }

      if (isMounted) {
        console.log("handleAuthSession: Atualizando estados:", { userId: currentUser?.id, isInstructor: currentIsInstructor, sessionExists: !!currentSession, loading: false });
        setSession(currentSession);
        setUser(currentUser); // <<< Ponto crucial: setUser está sendo chamado com o usuário correto?
        setIsInstructor(currentIsInstructor);
        setLoading(false);

        // Lógica de redirecionamento
        if (!isInitialSession && currentUser && currentIsInstructor) {
          console.log("handleAuthSession: Usuário instrutor logado (não é sessão inicial), redirecionando para /dashboard");
          navigate('/dashboard', { replace: true });
        } else if (!isInitialSession && currentUser && !currentIsInstructor) {
          console.log("handleAuthSession: Usuário não-instrutor logado (não é sessão inicial), redirecionando para /");
          navigate('/', { replace: true });
        }
      }
    };

    // Verifica sessão inicial
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("AuthContext useEffect: getSession concluído.");
       // Log detalhado da sessão inicial OBTIDA
       console.log("AuthContext useEffect (getSession): Objeto initialSession:", JSON.stringify(initialSession, null, 2));
      handleAuthSession(initialSession, true);
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
        if (isMounted) { // Verifica se montado antes de processar
            console.log("AuthContext onAuthStateChange: Evento recebido:", _event);
             // Log detalhado da sessão recebida no EVENTO:
             console.log("AuthContext onAuthStateChange: Objeto currentSession:", JSON.stringify(currentSession, null, 2));

            // Simplificado: Processa qualquer mudança relevante, incluindo refresh de token
            if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED' || (_event === 'INITIAL_SESSION' && currentSession)) {
                 handleAuthSession(currentSession, _event === 'INITIAL_SESSION'); // Só redireciona se não for INITIAL_SESSION
            } else if (_event === 'SIGNED_OUT') {
                 handleAuthSession(null, false); // Trata logout
            } else if (_event === 'USER_UPDATED' && currentSession) {
                 // Apenas atualiza o usuário se ele mudou, sem redirecionar
                 console.log("AuthContext onAuthStateChange: Evento USER_UPDATED, atualizando usuário localmente.");
                 setUser(currentSession.user ?? null);
            } else {
                 console.log("AuthContext onAuthStateChange: Evento não tratado para redirecionamento:", _event);
                 // Garante que loading vire false se ainda não o fez
                 if (loading) setLoading(false);
            }
        } else {
            console.log("AuthContext onAuthStateChange: Componente desmontado, ignorando evento:", _event);
        }
      }
    );

    // Limpeza
    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
      console.log("AuthContext: Listener removido (desmontagem).");
    };
  }, [checkIsInstructor, navigate, loading]); // Readicionei loading aqui para garantir que a lógica de setLoading funcione corretamente

  const value = { session, user, isInstructor, loading, logout: () => supabase.auth.signOut() };

  console.log("AuthProvider: Renderizando com:", { loading, userId: user?.id, isInstructor: !!isInstructor });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};