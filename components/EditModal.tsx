import React from 'react';
import {
  Modal,
  Animated,
  Easing,
  TextInput,
  Button,
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import CustomPicker from './CustomPicker';

const { width, height } = Dimensions.get('window');

function EditModal({ visible, item, onClose, onSave }) {
  const [title, setTitle] = React.useState(item?.title || '');
  const [estado, setEstado] = React.useState(item?.estado || '');
  const [especialidad, setEspecialidad] = React.useState(item?.especialidad || '');
  const [observaciones, setObservaciones] = React.useState(
    item?.observaciones?.join('\n') || '',
  );

  // Animación de opacidad
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible && item) {
      setTitle(item.title || '');
      setEstado(item.estado || '');
      setEspecialidad(item.especialidad || '');
      setObservaciones(item.observaciones?.join('\n') || '');
    }
  }, [visible]);

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      easing: visible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleSave = () => {
    onSave({
      ...item,
      title,
      estado,
      especialidad,
      observaciones: observaciones.split('\n').filter(line => line.trim() !== ''),
    });
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.wrapper}>
        
        {/* Fondo translúcido y clickable para cerrar */}

        <Animated.View
          
            style={[
              styles.overlay,
              
              { opacity }
            ]}
          />

        {/* Contenedor modal */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity,
              width: width * 0.9,
              height: height * 0.9
            }
          ]}
        >
          <View style={{justifyContent:'space-around',paddingBottom:40, height:'90vh'}}
          >
            <Text style={styles.modalTitle}>Editar Expediente</Text>
            <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
              <View style={{fontSize: 20,fontWeight: 'bold',}}>{item?.title}</View> 
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',alignSelf:'flex-end',minWidth:'12%', backgroundColor:'red', borderRadius:6, paddingHorizontal:5, paddingVertical:5}}>
            <Text style={{color:'white'}}>Fecha Límite</Text>
                <View style={{color:'white', textAling:'center'}}>{item?.fechaLimite}</View>
                </View>
              </View>

            <Text>Estado</Text>
            <CustomPicker
              selectedValue={estado}
              onValueChange={setEstado}
              style={modalInputStyle}
            >
              <option value="" disabled>Seleccione...</option>
              <option value="Asignar">Asignar</option>
              <option value="Reclamar">Reclamar</option>
              <option value="Corregir">Corregir</option>
              <option value="Letrados">Letrados</option>
              <option value="Aseguradora">Aseguradora</option>
              <option value="Documentacion">Documentación</option>
              <option value="Otros">Otros</option>
            </CustomPicker>

            <Text>Especialidad</Text>
            <CustomPicker
              selectedValue={especialidad}
              onValueChange={setEspecialidad}
              style={modalInputStyle}
            >
              <option value="" disabled>Seleccione...</option>
              <option value="Trauma">Trauma</option>
              <option value="Rehabilitacion">Rehabilitación</option>
              <option value="Neurología">Neurología</option>
              <option value="Neurofisiologia">Neurofisiología</option>
              <option value="Neurocirugia">Neurocirugía</option>
              <option value="Psiquiatria">Psiquiatría</option>
              <option value="Oftalmologia">Oftalmología</option>
              <option value="ORL">Otorrinolaringología</option>
              <option value="Ginecologia">Ginecología</option>
              <option value="Med. Legal">Medicina Legal</option>
              <option value="Med. Trabajo">Medicina del Trabajo</option>
              <option value="Odontologia">Odontología</option>
              <option value="Maxilo Facial">Maxilofacial</option>
            </CustomPicker>

            <Text>Observaciones</Text>
            <TextInput
              value={observaciones}
              onChangeText={setObservaciones}
              multiline
              style={[modalInputStyle, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Observaciones"
            />

            <View style={styles.modalButtons}>
              <Pressable style={{borderRadius:5,minWidth:'20%',height:'50%',backgroundColor:'red',justifyContent:'center',alignItems:'center',flexDirection:'row',zIndex:999}}  onPress={onClose}><Text style={{color:'white',justifyContent:'center'}}>Cancelar</Text></Pressable>
              <Pressable style={{borderRadius:5,minWidth:'20%',height:'50%', backgroundColor:'green',justifyContent:'center',alignItems:'center',flexDirection:'row',zIndex:999}}  onPress={onClose}><Text style={{color:'white',justifyContent:'center'}}>Guardar</Text></Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.2)', // Fondo oscurecido
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalTitle: {

    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 5,
    minWidth: '30vw',
    height:'10%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
});

const modalInputStyle = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 6,
  marginBottom: 15,
};

export default EditModal;
