import React, { useEffect,Dispatch, useState } from 'react';
import HomeScreen from '.';
import LoginScreen from '../login';
import { AuthProvider, useAuth } from '@/context/auth';
import FinisherHeaderRN from '@/components/ui/Background';


type AppContentProps = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

function AppContent({ setModalVisible }: AppContentProps) {
  const { user, animationFinished, setAnimationFinished } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);



  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        setIsAppReady(true);
        setAnimationFinished(true); 
      }, 1000); 
      return () => clearTimeout(timeout);
    } else {
      setIsAppReady(false); 
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
