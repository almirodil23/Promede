import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

// Paleta pastel clara con alto contraste en texto
const estadoBgColors = {
  Asignar: 'rgba(0, 123, 255, 0.12)',
  Reclamar: 'rgba(255, 136, 0, 0.12)',
  Corregir: 'rgba(220, 53, 69, 0.12)',
  Letrados: 'rgba(40, 167, 69, 0.12)',
  Aseguradora: 'rgba(111, 66, 193, 0.12)',
  Documentacion: 'rgba(108, 117, 125, 0.12)',
  Otros: 'rgba(173, 181, 189, 0.12)'
};

const estadoTextColors = {
  Asignar: '#004085',
  Reclamar: '#8a4400',
  Corregir: '#7a1b21',
  Letrados: '#1e5631',
  Aseguradora: '#4a2f80',
  Documentacion: '#3e444a',
  Otros: '#495057'
};

function EstadoText({ estado, long }) {
  const backgroundColor = estadoBgColors[estado] || 'rgba(0,0,0,0.05)';
  const textColor = estadoTextColors[estado] || '#212529';

  return (
    <View style={[styles.chip, { backgroundColor }]}>
      {long ? (
                <Text style = { [styles.text, { color: textColor }] }>{ estado }</Text>
      ): (
            <Text style={[styles.text, { color: textColor }]}>{estado[0]}</Text>

      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)', // sutil delineado opcional
  },
  text: {
    fontWeight: '600',
    fontSize: RFValue(6),
    textTransform: 'capitalize',
  },
});

export default EstadoText;
