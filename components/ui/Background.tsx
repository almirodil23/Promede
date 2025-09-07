import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Easing
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const CONFIG = {
  count: 34,
  size: { min: 2, max: 120, pulse: 0.3 },
  speed: {
    x: { min: 0, max: 0.4 },
    y: { min: 0, max: 0.6 }
  },
  colors: {
    particles: ["#f9fae9", "#d7f3fe", "#f8f0e9"]
  },
  opacity: { center: 0.9, edge: 0.05 },
  skew: -2,
  shapes: ["c"]
};

const getBackgroundColorByHour = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 10) return "#FFDBA9";        // Amanecer: cálido suave
  if (hour >= 10 && hour < 17) return "#2badd5ff";       // Día: azul claro brillante
  if (hour >= 17 && hour < 20) return "#F6B26B";        // Atardecer: naranja tenue
  if (hour >= 20 || hour < 6) return "#1A1A40";         // Noche: azul oscuro/frío

  return "#29bce8"; // default fallback
};

function Particle({ particle }) {
  const { xAnim, yAnim, radius, color, initialX, initialY } = particle;

  const translateX = xAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [initialX, initialX + (Math.random() * 40)]
  });

  const translateY = yAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [initialY, initialY - (Math.random() * 60)]
  });

  const scalePulse = xAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1 + CONFIG.size.pulse, 1]
  });

  const opacity = xAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [CONFIG.opacity.edge, CONFIG.opacity.center, CONFIG.opacity.edge]
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: [
          { translateX },
          { translateY },
          { scale: scalePulse },
          { skewX: `${CONFIG.skew}deg` }
        ],
        opacity
      }}
      pointerEvents="none"
    >
      <Svg height={radius * 2} width={radius * 2}>
        <Circle cx={radius} cy={radius} r={radius} fill={color} />
      </Svg>
    </Animated.View>
  );
}

export default function FinisherHeaderRN({ style, children, running=true }) {
  const animationRefs = useRef([]);
  
  const [particles, setParticles] = useState([]);
  const [bgColor, setBgColor] = useState(getBackgroundColorByHour());

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(getBackgroundColorByHour());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: CONFIG.count }).map(() => ({
      initialX: Math.random() * SCREEN_WIDTH,
      initialY: Math.random() * 300,
      radius: Math.random() * (CONFIG.size.max - CONFIG.size.min) + CONFIG.size.min,
      color: CONFIG.colors.particles[
        Math.floor(Math.random() * CONFIG.colors.particles.length)
      ],
      xAnim: new Animated.Value(0),
      yAnim: new Animated.Value(0),
    }));
    setParticles(newParticles);
  }, []);

    useEffect(() => {
    if (particles.length === 0) return;

    animationRefs.current.forEach(anim => anim.stop());
    animationRefs.current = [];

    if (running) {
      particles.forEach(({ xAnim, yAnim }) => {
        const loopAnim = Animated.loop(
          Animated.parallel([
            Animated.timing(xAnim, {
              toValue: 1,
              duration: 20000 + Math.random() * 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(yAnim, {
              toValue: 1,
              duration: 20000 + Math.random() * 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        );
        loopAnim.start();
        animationRefs.current.push(loopAnim);
      });
    }

    return () => {
      // Cleanup animaciones cuando componente se desmonte o running cambie
      animationRefs.current.forEach(anim => anim.stop());
      animationRefs.current = [];
    };
  }, [particles, running]);

  return (
    <View style={[styles.container, style]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]} />
      {particles.map((particle, i) => (
        <Particle key={i} particle={particle} />
      ))}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -10,
  },
  content: {
    flex: 1,
    position: "relative",
    zIndex: 10,
    paddingHorizontal: 16,
    justifyContent: "center"
  }
});
