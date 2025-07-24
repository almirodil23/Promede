import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/auth';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

function ProtectedLayout() {
  const { user, animationFinished } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const inLogin = segments[0] === 'login';


  useEffect(() => {
    setTimeout(() => {
      if (!user && !inLogin) {
        router.replace('/login');
      }

      if (user && inLogin && animationFinished) {
        router.replace('/(tabs)');
      }
    }, 300)
  }, [user, animationFinished, inLogin]);
  


  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
