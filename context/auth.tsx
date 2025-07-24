import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  animationFinished: boolean;
  setAnimationFinished: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseReady, setFirebaseReady] = useState(false);
  // Inicializamos en true para no bloquear carga inicial
  const [animationFinished, setAnimationFinished] = useState(false);

  const isLoading = !firebaseReady;

  const initialCheckDone = useRef(false); // Persistente entre renders

  // Forzar logout al iniciar la app (solo una vez)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('📡 Firebase auth state changed:', firebaseUser);

      if (!initialCheckDone.current) {
        initialCheckDone.current = true;

        if (firebaseUser) {
          console.log('🔐 Cerrando sesión automáticamente por seguridad...');
          await signOut(auth);
          setUser(null);
          setFirebaseReady(true);
          return;
        }
      }

      setUser(firebaseUser);
      setFirebaseReady(true);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setAnimationFinished(false); // <-- Aquí avisamos que inicia animación de salida
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      // No seteamos animationFinished true aquí porque lo hará la animación
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        animationFinished,
        setAnimationFinished,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
