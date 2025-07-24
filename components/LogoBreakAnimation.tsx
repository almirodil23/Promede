import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {
  Defs,
  ClipPath,
  Polygon,
  Image as SvgImage,
  G,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

const size = 200;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const AnimatedG = Animated.createAnimatedComponent(G);

export default function LogoBreakAnimation({ 
  imageUri, 
  onFinish,
  duration = 3000 
}: {
  imageUri: any;
  onFinish?: () => void;
  duration?: number;
}) {  // Centrado del logo
  const originX = screenWidth / 2 - size / 2;
  const originY = screenHeight / 2 - size / 2;

  // Valores compartidos para cada triángulo (sin map)
  const tx0 = useSharedValue(0);
  const ty0 = useSharedValue(0);
  const rot0 = useSharedValue(0);
  const op0 = useSharedValue(1);
  const scale0 = useSharedValue(1);

  const tx1 = useSharedValue(0);
  const ty1 = useSharedValue(0);
  const rot1 = useSharedValue(0);
  const op1 = useSharedValue(1);
  const scale1 = useSharedValue(1);

  const tx2 = useSharedValue(0);
  const ty2 = useSharedValue(0);
  const rot2 = useSharedValue(0);
  const op2 = useSharedValue(1);
  const scale2 = useSharedValue(1);

  const tx3 = useSharedValue(0);
  const ty3 = useSharedValue(0);
  const rot3 = useSharedValue(0);
  const op3 = useSharedValue(1);
  const scale3 = useSharedValue(1);

  // Props animados para cada triángulo
  const animatedProps0 = useAnimatedProps(() => ({
    opacity: op0.value,
    transform: `translate(${tx0.value + originX},${ty0.value + originY}) rotate(${rot0.value} ${size / 2} ${size / 2}) scale(${scale0.value})`,
  }));
  const animatedProps1 = useAnimatedProps(() => ({
    opacity: op1.value,
    transform: `translate(${tx1.value + originX},${ty1.value + originY}) rotate(${rot1.value} ${size / 2} ${size / 2}) scale(${scale1.value})`,
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    opacity: op2.value,
    transform: `translate(${tx2.value + originX},${ty2.value + originY}) rotate(${rot2.value} ${size / 2} ${size / 2}) scale(${scale2.value})`,
  }));
  const animatedProps3 = useAnimatedProps(() => ({
    opacity: op3.value,
    transform: `translate(${tx3.value + originX},${ty3.value + originY}) rotate(${rot3.value} ${size / 2} ${size / 2}) scale(${scale3.value})`,
  }));

React.useEffect(() => {
  const waitBeforeExplode = 7;
  const explodeDuration = 3000;
  const easing = Easing.bezier(0.22, 1, 0.36, 1);
  let animationComplete = false;

  const timeout = setTimeout(() => {
    // Contador para rastrear animaciones completadas
    let completedAnimations = 0;
    const totalAnimations = 4; // Una por cada triángulo

    const checkCompletion = () => {
      completedAnimations++;
      if (completedAnimations === totalAnimations && !animationComplete) {
        animationComplete = true;
        onFinish?.();
      }
    };

    // Función para animar con callback
 const animateWithCompletion = (value, toValue, callback) => {
  value.value = withTiming(
    toValue,
    { duration: explodeDuration, easing },
    (isFinished) => {
      if (isFinished) {
        runOnJS(callback)();
      }
    }
  );
};


    // Animación triángulo 0 (superior izquierdo)
    animateWithCompletion(tx0, -screenWidth * 1.5, checkCompletion);
    animateWithCompletion(ty0, -screenHeight * 1.5, checkCompletion);
    animateWithCompletion(rot0, -720, checkCompletion);
    animateWithCompletion(scale0, 3, checkCompletion);
    animateWithCompletion(op0, 0, checkCompletion);

    // Animación triángulo 1 (superior derecho)
    animateWithCompletion(tx1, screenWidth * 1.5, checkCompletion);
    animateWithCompletion(ty1, -screenHeight * 1.5, checkCompletion);
    animateWithCompletion(rot1, 720, checkCompletion);
    animateWithCompletion(scale1, 3, checkCompletion);
    animateWithCompletion(op1, 0, checkCompletion);

    // Animación triángulo 2 (inferior izquierdo)
    animateWithCompletion(tx2, -screenWidth * 1.5, checkCompletion);
    animateWithCompletion(ty2, screenHeight * 1.5, checkCompletion);
    animateWithCompletion(rot2, -540, checkCompletion);
    animateWithCompletion(scale2, 3, checkCompletion);
    animateWithCompletion(op2, 0, checkCompletion);

    // Animación triángulo 3 (inferior derecho)
    animateWithCompletion(tx3, screenWidth * 1.5, checkCompletion);
    animateWithCompletion(ty3, screenHeight * 1.5, checkCompletion);
    animateWithCompletion(rot3, 540, checkCompletion);
    animateWithCompletion(scale3, 3, checkCompletion);
    animateWithCompletion(op3, 0, checkCompletion);

  }, waitBeforeExplode);

  return () => {
    clearTimeout(timeout);
    animationComplete = true;
  };
}, []);


  return (
    <View
      style={{
        position: 'relative',
        width: screenWidth,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <Svg width={screenWidth} height={screenHeight}>
        <Defs>
          <ClipPath id="clip1">
            <Polygon points={`0,0 ${size},0 0,${size}`} />
          </ClipPath>
          
          {/* Triángulo superior derecho */}
          <ClipPath id="clip2">
            <Polygon points={`${size},0 ${size},${size} 0,${size}`} />
          </ClipPath>
          
          {/* Triángulo inferior izquierdo */}
          <ClipPath id="clip3">
            <Polygon points={`0,0 0,${size} ${size},${size}`} />
          </ClipPath>
          
          {/* Triángulo inferior derecho */}
          <ClipPath id="clip4">
            <Polygon points={`${size},0 0,0 ${size},${size}`} />
          </ClipPath>
        </Defs>

        <AnimatedG animatedProps={animatedProps0}>
          <SvgImage
            href={imageUri}
            clipPath="url(#clip1)"
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        </AnimatedG>
        <AnimatedG animatedProps={animatedProps1}>
          <SvgImage
            href={imageUri}
            clipPath="url(#clip2)"
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        </AnimatedG>
        <AnimatedG animatedProps={animatedProps2}>
          <SvgImage
            href={imageUri}
            clipPath="url(#clip3)"
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        </AnimatedG>
        <AnimatedG animatedProps={animatedProps3}>
          <SvgImage
            href={imageUri}
            clipPath="url(#clip4)"
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        </AnimatedG>
      </Svg>
    </View>
  );
}