import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

// Componente reutilizable con hover
const EspecialidadIcon = ({ IconComponent, nombre }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <View

      style={styles.iconContainer}
    >
      <IconComponent />
      {hovered && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{nombre}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '80%',
    height: 100,
    aspectRatio: 1,
    zIndex:-100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
  },
});


export default EspecialidadIcon;