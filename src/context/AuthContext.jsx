// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Mantenha session e user como null inicialmente
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  // Começa loading como true OBRIGATORIAMENTE
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log('AuthProvider: Montado ou Renderizado');

  const checkIsInstructor = useCallback(async (userId) => { /* ... como antes ... */ }, []);

  useEffect(() => {
    let isMounted = true;
    console.log("AuthContext useEffect: Registrando listeners e buscando sessão inicial...");

    // Tenta pegar a sessão armazenada imediatamente
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!isMounted) return;
      console.log("AuthContext useEffect (getSession): Sessão inicial obtida:", initialSession);

      const currentUser = initialSession?.user ?? null;
      let currentIsInstructor = false;

      if (currentUser) {
        console.log(`AuthContext useEffect (getSession): Usuário ${currentUser.id} encontrado na sessão inicial. Verificando status de instrutor...`);
        currentIsInstructor = await checkIsInstructor(currentUser.id);
      } else {
        console.log("AuthContext useEffect (getSession): Nenhum usuário na sessão inicial.");
      }

      // ATUALIZA O ESTADO APENAS APÓS PEGAR A SESSÃO E CHECAR INSTRUTOR
      if (isMounted) {
         console.log("AuthContext useEffect (getSession): Atualizando estados e finalizando loading inicial.");
         setSession(initialSession);
         setUser(currentUser);
         setIsInstructor(currentIsInstructor);
         setLoading(false); // <-- Ponto chave: setLoading(false) SÓ AQUI na lógica inicial
      }

    }).catch(error => {
      console.error("AuthContext useEffect (getSession): Erro:", error);
      if (isMounted) {
        setSession(null); setUser(null); setIsInstructor(false); setLoading(false);
      }
    });

    // Configura o listener para MUDANÇAS FUTURAS
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        // Ignora INITIAL_SESSION pois já foi tratado por getSession
        if (_event === 'INITIAL_SESSION' || !isMounted) return;

        console.log("AuthContext onAuthStateChange: Evento recebido:", _event);
        const currentUser = currentSession?.user ?? null;
        let currentIsInstructor = false;

        if (currentUser) {
          console.log(`AuthContext onAuthStateChange: Usuário ${currentUser.id} presente na nova sessão. Verificando status de instrutor...`);
          currentIsInstructor = await checkIsInstructor(currentUser.id);
        } else {
          console.log("AuthContext onAuthStateChange: Nenhum usuário na nova sessão.");
        }

        if (isMounted) {
            console.log("AuthContext onAuthStateChange: Atualizando estados:", { userId: currentUser?.id, isInstructor: currentIsInstructor });
            setSession(currentSession);
            setUser(currentUser);
            setIsInstructor(currentIsInstructor);
            // Loading já deve ser false aqui, mas garantir não custa
            if (loading) setLoading(false);

            // Lógica de redirecionamento para SIGNED_IN/SIGNED_OUT
            if (_event === 'SIGNED_IN' && currentUser && currentIsInstructor) {
               console.log("AuthContext onAuthStateChange: SIGNED_IN instrutor, redirecionando para /dashboard");
               navigate('/dashboard', { replace: true });
            } else if (_event === 'SIGNED_IN' && currentUser && !currentIsInstructor) {
                console.log("AuthContext onAuthStateChange: SIGNED_IN não-instrutor, redirecionando para /");
                navigate('/', { replace: true });
            } else if (_event === 'SIGNED_OUT'){
                console.log("AuthContext onAuthStateChange: SIGNED_OUT, redirecionando para /login");
                // Pode redirecionar para home ou login após logout
                navigate('/login', { replace: true });
            }
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
      console.log("AuthContext: Listener removido (desmontagem).");
    };
  // Removi loading das dependências
  }, [checkIsInstructor, navigate]);

  const value = { session, user, isInstructor, loading, logout: () => supabase.auth.signOut() };
  console.log("AuthProvider: Renderizando com:", { loading, userId: user?.id, isInstructor: !!isInstructor });

  // Só renderiza children quando loading for false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { /* ... hook ... */ };