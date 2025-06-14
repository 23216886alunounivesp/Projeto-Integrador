// src/context/AuthContext.jsx (Tentativa de Refatoração do useEffect)
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true); // Começa como true

  // Função para checar instrutor (igual a antes)
  const checkIsInstructor = useCallback(async (userId) => {
    console.log(`[checkIsInstructor] Iniciando para userId: ${userId}`);
    if (!userId) return false;
    try {
      const { error, status } = await supabase
        .from('instrutores')
        .select('id', { head: true }) // Usando head:true
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
      console.error('[checkIsInstructor] Erro inesperado no try/catch:', err);
      return false;
    }
  }, []);

  // useEffect Principal para lidar com autenticação
  useEffect(() => {
    let isMounted = true; // Flag para desmontagem

    // Função assíncrona para lidar com uma nova sessão (ou ausência dela)
    const handleAuthSession = async (currentSession) => {
      if (!isMounted) return; // Aborta se desmontado

      console.log("handleAuthSession: Processando sessão:", currentSession);
      const currentUser = currentSession?.user ?? null;
      const currentIsInstructor = currentUser ? await checkIsInstructor(currentUser.id) : false;

      // Atualiza todos os estados relevantes DE UMA VEZ (ou quase)
      // para tentar minimizar re-renderizações intermediárias problemáticas
      if (isMounted) {
           console.log("handleAuthSession: Atualizando estados:", { currentUser, currentSession, currentIsInstructor });
           setSession(currentSession);
           setUser(currentUser);
           setIsInstructor(currentIsInstructor);
           // Garante que loading fique false APÓS processar a sessão inicial ou a primeira mudança
           if(loading) setLoading(false);
      }
    };

    // Verifica a sessão inicial ao montar
    console.log("AuthContext useEffect: Verificando sessão inicial ao montar...");
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
        console.log("AuthContext useEffect: getSession concluído.");
        handleAuthSession(initialSession); // Processa a sessão inicial
    }).catch(error => {
        console.error("AuthContext useEffect: Erro em getSession:", error);
         if(isMounted) {
            setSession(null);
            setUser(null);
            setIsInstructor(false);
            setLoading(false); // Garante que loading fique false no erro também
         }
    });


    // Ouve mudanças futuras
    console.log("AuthContext useEffect: Configurando listener onAuthStateChange...");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
          console.log("AuthContext onAuthStateChange: Evento recebido:", _event);
          handleAuthSession(currentSession); // Processa a nova sessão
      }
    );

    // Limpeza ao desmontar
    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
      console.log("AuthContext: Listener removido (desmontagem).");
    };
  // Removi 'loading' da dependência, mantive checkIsInstructor (devido ao useCallback)
  }, [checkIsInstructor]);

  // Valor do contexto
  const value = { session, user, isInstructor, loading, logout: () => supabase.auth.signOut() };

  // Log antes de renderizar
  console.log("AuthProvider: Renderizando com:", value);

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