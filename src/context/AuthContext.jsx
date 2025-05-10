// src/context/AuthContext.jsx (Removendo Redirecionamento Temporariamente)
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';
// Mantenha a importação, mas não usaremos navigate dentro do handleAuthSession agora
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Mantenha a inicialização

  console.log('AuthProvider: Montado ou Renderizado');

  const checkIsInstructor = useCallback(async (userId) => {
    // ... (código da função checkIsInstructor como está) ...
  }, []);

  useEffect(() => {
    let isMounted = true;
    console.log("AuthContext useEffect: Registrando listeners e buscando sessão inicial...");

    const handleAuthSession = async (currentSession, isInitialSession = false) => { // Mantém isInitialSession
      if (!isMounted) return;
      console.log("handleAuthSession: Processando sessão. É inicial?", isInitialSession, "Sessão:", currentSession ? "Existe" : "Nula");
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
        console.log("handleAuthSession: Atualizando estados:", { userId: currentUser?.id, isInstructor: currentIsInstructor, sessionExists: !!currentSession, loading: false });
        setSession(currentSession);
        setUser(currentUser);
        setIsInstructor(currentIsInstructor);
        if(loading) setLoading(false);

        // <<<< LÓGICA DE REDIRECIONAMENTO TEMPORARIAMENTE REMOVIDA/COMENTADA <<<<
        /*
        if (!isInitialSession && currentUser && currentIsInstructor) {
          console.log("handleAuthSession: Usuário instrutor logado (não é sessão inicial), redirecionando para /dashboard");
          // navigate('/dashboard', { replace: true }); // Comentado
        } else if (!isInitialSession && currentUser && !currentIsInstructor) {
          console.log("handleAuthSession: Usuário não-instrutor logado (não é sessão inicial), redirecionando para /");
          // navigate('/', { replace: true }); // Comentado
        }
        */
      }
    };

    // Verifica sessão inicial
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("AuthContext useEffect: getSession concluído.");
      handleAuthSession(initialSession, true); // Passa true
    }).catch(error => { /* ... (tratamento de erro) ... */ });

    // Ouve mudanças futuras
    console.log("AuthContext useEffect: Configurando listener onAuthStateChange...");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
         if (isMounted) {
              console.log("AuthContext onAuthStateChange: Evento recebido:", _event);
              // Processa SEMPRE para atualizar estado, mas sem redirecionar daqui
              handleAuthSession(currentSession, _event === 'INITIAL_SESSION'); // Passa false para SIGNED_IN/OUT
              // Removida a lógica de redirecionamento daqui também
              /*
              if (_event === 'SIGNED_OUT'){
                  console.log("AuthContext onAuthStateChange: SIGNED_OUT, redirecionando para /login");
                  // navigate('/login', { replace: true }); // Comentado
              }
              */
         }
      }
    );

    return () => { /* ... (limpeza) ... */ };
  // Mantenha as dependências como estavam antes de remover navigate
  }, [checkIsInstructor, navigate, loading]); // Mantenha navigate aqui por enquanto

  const value = { session, user, isInstructor, loading, logout: () => supabase.auth.signOut() };
  console.log("AuthProvider: Renderizando com:", value);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { /* ... hook ... */ };