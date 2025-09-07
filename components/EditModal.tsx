import React, { useState } from 'react';
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
import { getAuth } from 'firebase/auth';


const { width, height } = Dimensions.get('window');

function WebDateTimePicker({  value, onChange }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '98%',
          padding: 8,
          borderRadius: 6,
          border: '1px solid #ccc',
          marginTop: 5,
        }}
      />
    </div>
  );
}


type EditModalProps = {
  visible?: boolean; 
  item?: any;       
  onClose?: () => void; 
  onSave?: (data: any) => void; 
  type?: 'edit' | 'add';
};

function EditModal({ visible, item, onClose, onSave, type}: EditModalProps) {
  const [title, setTitle] = React.useState(item?.title || '');
  const [estado, setEstado] = React.useState(item?.estado || '');
  const [especialidad, setEspecialidad] = React.useState(item?.especialidad || '');
  const [observaciones, setObservaciones] = React.useState(
  Array.isArray(item?.observaciones) 
    ? item.observaciones.join('\n') 
    : item?.observaciones || ''
);
  const [date, setDate] = useState( new Date());
  const [fechaLimite, setFechaLimite] = React.useState(
  item?.fechaLimite ? item.fechaLimite + 'T00:00' : ''
 );
  const [modificacionObs, setModificacionObs] = React.useState("");
  const auth = getAuth();
const user = auth.currentUser;
  const userEmail = user?.email || '';
  


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
  const cambios: string[] = [];

  const safeItem = item || {
    id: Date.now().toString(),   
    title: '',
    estado: '',
    especialidad: '',
    fechaLimite: '',
    relevancia: 1,
    observaciones: [],
    modificaciones: [],
  };

 if (title !== safeItem.title) cambios.push(`title: "${title}"`);
  if (estado !== safeItem.estado) cambios.push(`estado: "${estado}"`);
  if (especialidad !== safeItem.especialidad) cambios.push(`especialidad: "${especialidad}"`);
  if (fechaLimite !== safeItem.fechaLimite) cambios.push(`fechaLimite: "${fechaLimite}"`);

const nuevasObs = observaciones
  ? observaciones.split('\n').filter(line => line.trim() !== '')
  : [];


  if (JSON.stringify(nuevasObs) !== JSON.stringify(safeItem.observaciones)) {
    cambios.push(`observaciones: "${nuevasObs.join('; ')}"`);
  }

  const updatedItem = {
    ...safeItem,
    title,
    estado,
    especialidad,
    fechaLimite,
    relevancia: 5,
    observaciones: nuevasObs,
    modificaciones: [
      ...(item?.modificaciones || []),
      ...(cambios.length > 0
        ? [{
            usuario: userEmail,
            fecha: new Date().toISOString(),
            comentario: nuevasObs.join('; '), 
          }]
        : []),
    ],
  };

  onSave(updatedItem);
};



  return (
    <Modal transparent visible={visible} animationType="fade" >
      <View style={styles.wrapper}>
        

        <Animated.View

            style={[
              styles.overlay,
              
              { opacity }
          ]}
          
          />

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
            <Text style={styles.modalTitle}>{type === 'add' ? "Crear Expediente" : "Editar Expediente"}</Text>
            <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
  {item?.title}
</Text>
              {type !== 'add' &&
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',alignSelf:'flex-end',minWidth:'12%', backgroundColor:'red', borderRadius:6, paddingHorizontal:5, paddingVertical:5}}>
   <Text style={{ color: 'white' }}>Fecha Límite </Text>
  <Text style={{ color: 'white', textAlign: 'center' }}>{item?.fechaLimite}</Text>
                </View>
              }
              </View>
            {type === 'add' && 
             <View style={{marginBottom:15,height:'9%', width:'100%',alignContent:'space-between'}}>
              <Text style={{marginBottom:15}}>Título Expediente</Text>
                <TextInput value={title}
                  style={[modalInputStyle, { textAlignVertical: 'top' }]}
                  placeholder="Título"
                  onChangeText={setTitle}/>
                </View> 
            }
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
            {type === 'add' &&
             <View style={{marginBottom:15,height:'9%', width:'100%',alignContent:'space-between'}}>
                <Text>Fecha Límite</Text>

                
                <WebDateTimePicker
                  value={fechaLimite}
                  onChange={setFechaLimite}
                />
              </View> 
              }

            <Text>Observaciones</Text>
            <TextInput
                value={observaciones}
                onChangeText={setObservaciones}
                multiline
                style={[modalInputStyle, { height: 80, textAlignVertical: 'top',zIndex:3,position:'relative' }]}
                placeholder="Observaciones"

            />
          {(item?.modificaciones || []).map((mod, index) => (
            <ScrollView
              key={index}
              style={{
                flexDirection: 'column', 
                marginBottom: 10,
                padding: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{mod.usuario}</Text>
              <Text style={{ color: '#555' }}>
                {new Date(mod.fecha).toLocaleString()} 
              </Text>
              <Text>{mod.comentario}</Text>
            </ScrollView>
          ))}






            <View style={styles.modalButtons}>
              <Pressable style={{borderRadius:5,minWidth:'20%',height:'50%',backgroundColor:'red',justifyContent:'center',alignItems:'center',flexDirection:'row',zIndex:999}}  onPress={onClose}><Text style={{color:'white',justifyContent:'center'}}>Cancelar</Text></Pressable>
              <Pressable style={{borderRadius:5,minWidth:'20%',height:'50%', backgroundColor:'green',justifyContent:'center',alignItems:'center',flexDirection:'row',zIndex:999}}  onPress={handleSave}><Text style={{color:'white',justifyContent:'center'}}>Guardar</Text></Pressable>
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
