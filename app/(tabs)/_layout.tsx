import React, { useEffect,Dispatch, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import HomeScreen from '.';
import LoginScreen from '../login';
import { AuthProvider, useAuth } from '@/context/auth';
import AnimatedBackground from '@/components/ui/Background';
import FinisherHeaderRN from '@/components/ui/Background';


type AppContentProps = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

function AppContent({ setModalVisible }: AppContentProps) {
  const { user, animationFinished, setAnimationFinished } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);



  useEffect(() => {
    if (user) {
      // Simula carga inicial (puede ser para datos o animación)
      const timeout = setTimeout(() => {
        setIsAppReady(true);
        setAnimationFinished(true); // Aseguramos que la animación esté lista
      }, 1000); // ⏳ 600ms de retraso opcional
      return () => clearTimeout(timeout);
    } else {
      setIsAppReady(false); // reset
    }
  }, [user]);



  return user  && animationFinished? <HomeScreen /> : <LoginScreen />;
}

export default function RootLayout() {
      const [modalVisible, setModalVisible] = React.useState(false);

  return (
    
    <FinisherHeaderRN running={!modalVisible} style={{ flex: 1 }}>
    <AuthProvider>
        <AppContent 
           setModalVisible={setModalVisible}
        />
      </AuthProvider>
      </FinisherHeaderRN> 
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

