import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import LogoBreakAnimation from '@/components/LogoBreakAnimation';
import { useAuth } from '@/context/auth';

const screenWidth = Dimensions.get('window').width;
const width = Dimensions.get('screen').width
const screenHeight = Dimensions.get('window').height;
const logoSize = 200;

export default function LoginComponent() {
  const logoRef = useRef(null);
  const [breaking, setBreaking] = useState(false);

  const { login, setAnimationFinished } = useAuth();

  const breath = useSharedValue(1);
  const deltaX = useSharedValue(0);
  const deltaY = useSharedValue(0);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [layoutMeasured, setLayoutMeasured] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formOpacity = useSharedValue(1);
  const formTranslateY = useSharedValue(0);

  const centerX = screenWidth / 2 - logoSize / 2;
  const centerY = screenHeight / 2 - logoSize / 2;

  const animatedLogoStyle = useAnimatedStyle(() => ({
    width: logoSize,
    height: logoSize,
    position: 'absolute',
    transform: [
      { translateX: deltaX.value },
      { translateY: deltaY.value },
      { scale: breath.value },
    ],
    borderRadius: 25 * breath.value,
  }));

  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  useEffect(() => {
    breath.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  useEffect(() => {
    if (logoRef.current && !layoutMeasured) {
      logoRef.current.measure((x, y, width, height, pageX, pageY) => {
        setLogoPosition({ x: pageX, y: pageY });
        deltaX.value = 0;
        deltaY.value = 0;
        setLayoutMeasured(true);
      });
    }
  }, [layoutMeasured]);

const handleBreakFinish = useCallback(() => {
  setAnimationFinished(true);
  console.timeEnd('aqui');
}, [setAnimationFinished]);


  const startMoveToCenter = useCallback(() => {
    const moveX = centerX - logoPosition.x;
    const moveY = centerY - logoPosition.y;

    deltaX.value = withTiming(moveX, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });
    deltaY.value = withTiming(moveY, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });

    formOpacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    formTranslateY.value = withTiming(-100, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });

    setTimeout(() => {
      setBreaking(true);
    }, 700);
  }, [centerX, centerY, logoPosition]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    try {
      await login(email, password);
      setAnimationFinished(false);
      console.time('aqui')
      startMoveToCenter();
         
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  }, [email, password, login, setAnimationFinished, startMoveToCenter]);

  if (breaking) {
    return (
      <View style={styles.general}>
        <View style={styles.contenedorexterno}>
                  <View
          style={styles.logocontenedor}
          ref={logoRef}
          onLayout={() => {
            logoRef.current?.measure((x, y, width, height, pageX, pageY) => {
              setLogoPosition({ x: pageX, y: pageY });
            });
          }}
        >
        <LogoBreakAnimation
          imageUri={require('../assets/images/promede.png')}
          onFinish={handleBreakFinish}
            />
            </View>
        </View>
        </View>
    );
  }

  return (
    <View style={styles.general}>
      <View style={styles.contenedorexterno}>
        {width >600 && (
        <View
          style={styles.logocontenedor}
          ref={logoRef}
          onLayout={() => {
            logoRef.current?.measure((x, y, width, height, pageX, pageY) => {
              setLogoPosition({ x: pageX, y: pageY });
            });
          }}
        >
          <Animated.Image
            source={require('../assets/images/promede.png')}
            style={[styles.logo, animatedLogoStyle]}
            resizeMode="contain"
          />
        </View>
         )}
        <Animated.View style={[styles.formContainer, styles.shadowBox, animatedFormStyle,{width: width > 600 ? '50%' : '80vw'}]}>
          <View style={styles.form}>
            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!breaking}
            />
            <TextInput
              placeholder="Contraseña"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
              autoComplete="password"
              editable={!breaking}
            />
            <Pressable
              onPress={handleLogin}
              style={[styles.button]}
              disabled={breaking}
            >
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  general: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7e9adbff',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  contenedorexterno: {
    width: '90vw',
    height: '90vh',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
    padding: 20,
  },
  logocontenedor: {
    width: logoSize,
    height: logoSize,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: logoSize,
    height: logoSize,
    borderRadius: 25,
    zIndex: 100
  },
  formContainer: {
    width: '80vw',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 25,
    zIndex: 1,
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7e9adbff',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#627d09ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});