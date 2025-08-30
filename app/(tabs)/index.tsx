import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Dimensions,
  Easing,
  Modal
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { Calendar } from 'react-native-calendars';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { eachDayOfInterval, format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { expedientes } from '@/constants/Expedientes';
import Trauma from '@/assets/logos/Trauma';
import Rehabilitacion from '@/assets/logos/Rehabilitacion';
import Neurologia from '@/assets/logos/Neurologia';
import Neurofisiologia from '@/assets/logos/Neurofisioligia';
import Neurocirugia from '@/assets/logos/Neurocirugia';
import Psicologia from '@/assets/logos/Psicologia';
import Oftalmologia from '@/assets/logos/Oftalmologia';
import Ginecologia from '@/assets/logos/Ginecologia';
import MedLegal from '@/assets/logos/MedLegal';
import MedTrabajo from '@/assets/logos/MedTrabajo';
import Odontologia from '@/assets/logos/Odontologia';
import MaxiloFacial from '@/assets/logos/MaxiloFacial';
import EspecialidadIcon from '@/components/ui/EspecialidadIcon';
import ORL from '@/assets/logos/ORL';
import EstadoText from '@/components/ui/Estado';
import EditModal from '@/components/EditModal';
import { RFValue } from "react-native-responsive-fontsize";
import { Picker } from '@react-native-picker/picker';



const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_MARGIN = 10;
const NUM_COLUMNS = SCREEN_WIDTH < 400 ? 2 : 4;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * (NUM_COLUMNS * 2)) / NUM_COLUMNS;



export default function HomeScreen() {
  const { width } = Dimensions.get('window');

  const [activeScreen, setActiveScreen] = useState('main');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [focusedExpediente, setFocusedExpediente] = useState(null);
  const [expedientesNotas, setExpedientesNotas] = useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [data, setData] = React.useState(expedientes);
  const NUM_COLUMNS = width < 800 ? 2 : 4; 
  const [openEspecialidad, setOpenEspecialidad] = useState(false);
  const [especialidad, setEspecialidad] = useState(null);
  const [estado, setEstado] = useState(null);
  const [open, setOpen] = useState(false);




  const estadosArray = [
  { label: 'Asignar', value: 'Asignar', render: () => <EstadoText estado="Asignar" long /> },
  { label: 'Reclamar', value: 'Reclamar', render: () => <EstadoText estado="Reclamar" long /> },
  { label: 'Corregir', value: 'Corregir', render: () => <EstadoText estado="Corregir" long /> },
  { label: 'Letrados', value: 'Letrados', render: () => <EstadoText estado="Letrados" long /> },
  { label: 'Aseguradora', value: 'Aseguradora', render: () => <EstadoText estado="Aseguradora" long /> },
  { label: 'Documentacion', value: 'Documentacion', render: () => <EstadoText estado="Documentacion" long /> },
  { label: 'Otros', value: 'Otros', render: () => <EstadoText estado="Otros" long /> },
];

  const [estados, setEstados] = useState(estadosArray);

const [especialidades, setEspecialidades] = useState([
  {
    label: "Trauma",
    value: "trauma",
    icon: () => <EspecialidadIcon IconComponent={Trauma} nombre="Trauma" />
  },
  {
    label: "Rehabilitación",
    value: "rehabilitacion",
    icon: () => <EspecialidadIcon IconComponent={Rehabilitacion} nombre="Rehabilitación" />
  },
  {
    label: "Neurología",
    value: "neurologia",
    icon: () => <EspecialidadIcon IconComponent={Neurologia} nombre="Neurología" />
  },
  {
    label: "Neurofisiología",
    value: "neurofisiologia",
    icon: () => <EspecialidadIcon IconComponent={Neurofisiologia} nombre="Neurofisiología" />
  },
  {
    label: "Neurocirugía",
    value: "neurocirugia",
    icon: () => <EspecialidadIcon IconComponent={Neurocirugia} nombre="Neurocirugía" />
  },
  {
    label: "Psiquiatría",
    value: "psiquiatria",
    icon: () => <EspecialidadIcon IconComponent={Psicologia} nombre="Psiquiatría" />
  },
  {
    label: "Otorrinolaringología",
    value: "orl",
    icon: () => <EspecialidadIcon IconComponent={ORL} nombre="Otorrinolaringología" />
  },
  {
    label: "Oftalmología",
    value: "oftalmologia",
    icon: () => <EspecialidadIcon IconComponent={Oftalmologia} nombre="Oftalmología" />
  },
  {
    label: "Ginecología",
    value: "ginecologia",
    icon: () => <EspecialidadIcon IconComponent={Ginecologia} nombre="Ginecología" />
  },
  {
    label: "Medicina Legal",
    value: "medlegal",
    icon: () => <EspecialidadIcon IconComponent={MedLegal} nombre="Medicina Legal" />
  },
  {
    label: "Medicina del Trabajo",
    value: "medtrabajo",
    icon: () => <EspecialidadIcon IconComponent={MedTrabajo} nombre="Medicina del Trabajo" />
  },
  {
    label: "Odontología",
    value: "odontologia",
    icon: () => <EspecialidadIcon IconComponent={Odontologia} nombre="Odontología" />
  },
  {
    label: "Maxilofacial",
    value: "maxilofacial",
    icon: () => <EspecialidadIcon IconComponent={MaxiloFacial} nombre="Maxilofacial" />
  },
]);


  


    const handleSave = (updatedItem) => {
    //
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setModalVisible(false);
  };

  
  
  const filteredBySearch = expedientes.filter(exp =>
  exp.title.toLowerCase().includes(searchText.toLowerCase())
);

  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);
  const acc = expedientes.reduce((acc, expediente) => {
  const fecha = expediente?.fechaLimite;
    const relevancia = expediente?.relevancia;
    function calcHeatmapColor(value, min, max) {
  if(max === min) return '#00ff00';
  const hue = 120 - 120 * ((value - min) / (max - min));
  return `hsl(${hue}, 100%, 45%)`;
}


const getMarkedDates = (expedientes) => {
  const relevanciaPorFecha = {};
  let min = Infinity, max = -Infinity;

  expedientes.forEach(exp => {
    const fecha = exp.fechaLimite;
    if (!relevanciaPorFecha[fecha]) relevanciaPorFecha[fecha] = 0;
    relevanciaPorFecha[fecha] += exp.relevancia;

    min = Math.min(min, relevanciaPorFecha[fecha]);
    max = Math.max(max, relevanciaPorFecha[fecha]);
  });

  const interpolateColor = (value) => {
    if (max === min) return '#00ff00';
    const ratio = (value - min) / (max - min);
    const red = Math.round(255 * ratio);
    const green = Math.round(255 * (1 - ratio));
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}00`;
  };

  const markedDates = {};
  Object.keys(relevanciaPorFecha).forEach(fecha => {
    markedDates[fecha] = {
      marked: true,
      dotColor: interpolateColor(relevanciaPorFecha[fecha])
    };
  });

  return markedDates;
};


    
  const getRelevanceByDate = () => {
  const result = {};
  let minRelevance = Infinity, maxRelevance = -Infinity;

  expedientes.forEach(exp => {
    const fecha = exp.fechaLimite;
    result[fecha] = (result[fecha] || 0) + exp.relevancia;
    if (result[fecha] < minRelevance) minRelevance = result[fecha];
    if (result[fecha] > maxRelevance) maxRelevance = result[fecha];
  });

  return { result, minRelevance, maxRelevance };
};


    

  if (!fecha || typeof relevancia !== 'number') return acc;

  if (!acc[fecha]) {
    acc[fecha] = { date: fecha, count: 0 };
  }

  acc[fecha].count += relevancia;
  return acc;
}, {} as Record<string, { date: string; count: number }>);


  const startDate = new Date();
  startDate.setDate(today.getDate() - 120); 

const daysInRange = eachDayOfInterval({ start: startDate, end: today });

const values = daysInRange.map((day) => {
  const dateStr = format(day, 'yyyy-MM-dd');
  const match = acc[dateStr];
  return {
    date: dateStr,
    count: (match && typeof match.count === 'number') ? match.count : 0,
  };
});
  
  
  




const scaleAnim = useRef(new Animated.Value(0)).current;
const heatmapValues = expedientes.map(exp => ({
  date: exp.fechaLimite,
  count: exp.relevancia, 
}))






  useEffect(() => {
  setSelectedDate(today.toISOString().split('T')[0]); 
  fadeAnim.setValue(0);
  scaleAnim.setValue(0.02);

  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }),
  ]).start();
}, [activeScreen]);
const selectedExp = expedientes.filter( (exp) => exp.fechaLimite === selectedDate );

  
const getMarkedDates = (expedientes) => {
  const relevanciaPorFecha = {};
  let min = Infinity, max = -Infinity;
  expedientes.forEach(exp => {
    const fecha = exp.fechaLimite;
    relevanciaPorFecha[fecha] = (relevanciaPorFecha[fecha] || 0) + exp.relevancia;
    min = Math.min(min, relevanciaPorFecha[fecha]);
    max = Math.max(max, relevanciaPorFecha[fecha]);
  });
  const interpolateColor = value => {
    if (max === min) return '#00ff00'; 
    const ratio = (value - min) / (max - min);
    const red = Math.round(255 * ratio);
    const green = Math.round(255 * (1 - ratio));
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}00`;
  };
  const markedDates = {};
  Object.keys(relevanciaPorFecha).forEach(fecha => {
    markedDates[fecha] = {
      marked: true,
      dotColor: interpolateColor(relevanciaPorFecha[fecha]),
    };
  });
  return markedDates;
};

  



  
  
const handlePress = (exp) => {
  console.log('Presionaste el expediente:', exp.title);
  setFocusedExpediente(exp);
  setActiveScreen('main');
};

const calcularDiasRestantes = (fechaLimite: string | Date): number => {
  const hoy = new Date();
  const limite = new Date(fechaLimite);
  const diferencia = Math.ceil((limite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  return diferencia;
};







const filteredExpedientes = React.useMemo(() => {
  return expedientes.filter(item => {
    const matchEstado = estado ? item.estado === estado : true;
    console.log(selectedDate)
    
    console.log(matchEstado)
    const matchEspecialidad = especialidad
      ? item.especialidad.toLowerCase() === especialidad.toLowerCase()
      : true;
    return   matchEstado && matchEspecialidad;
  });
}, [expedientes, estado, especialidad]);



const renderMainContent = () => (
  <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', minWidth: '100%' }}>
      <Pressable onPress={() => setActiveScreen('search')} style={styles.iconButton}>
        <Ionicons  name="search-outline" size={24} color="#000" />
      </Pressable>
      <Pressable onPress={() => setActiveScreen('note')} style={styles.iconButton}>
        <Ionicons  name="document-text-outline" size={24} color="#000" />
      </Pressable>
      <Pressable onPress={() => setActiveScreen('form')} style={styles.iconButton}>
        <Ionicons  name="folder-open-outline" size={24} color="#000" />
      </Pressable>
      <Pressable onPress={() => setActiveScreen('calendar')} style={styles.iconButton}>
        <Ionicons  name="calendar" size={24} color="#000" />
      </Pressable>
    </View>

    <ScrollView style={{ backgroundColor: '#FFF' }}>
      {expedientes.map((item) => (
        <Pressable key={item.id} onPress={() => handlePress(item)}>
          <View style={[
            styles.card,
            focusedExpediente?.id === item.id && { borderColor: 'blue', borderWidth: 2 }
          ]}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.observaciones}</Text>
            <Text style={styles.cardDate}>Fecha Límite: {item.fechaLimite}</Text>
            {expedientesNotas[item.id] && (
              <Text style={{ marginTop: 5, fontStyle: 'italic' }}>
                Nota: {expedientesNotas[item.id]}
              </Text>
            )}
          </View>
        </Pressable>
      ))}
    </ScrollView>

        {focusedExpediente && (
      <View style={{
        padding: 10,
        backgroundColor: '#eee',
        borderTopWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center'
      }}>
        <Text>
          Días restantes para {focusedExpediente.title}: {calcularDiasRestantes(focusedExpediente.fechaLimite)} días
        </Text>
      </View>
    )}


  </View>
);




  const renderSearchScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginVertical: 10 ,textAlign:'center'}}>Buscar expediente</Text>
      <TextInput
        placeholder="Número de expediente"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 8,
          textAlign: 'center',
        }}
      />
      <Pressable style={styles.boton}  onPress={() => console.log('Buscar:', searchText)}><Text>Buscar</Text></Pressable>
      <Pressable  style={styles.boton} onPress={() => setActiveScreen('main')} ><Text>Volver</Text></Pressable>
    </View>
  );



  const renderFormScreen = () => (
    <View>
      <Text style={{ fontSize: 20, marginVertical: 10, textAlign:'center' }}>Crear expediente</Text>
      <TextInput
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 8,
          textAlign:'center'
        }}
      />
      <TextInput
        placeholder="Descripción"
        value={formData.descripcion}
        onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 8,
          height: 80,
        }}
      />
      <Pressable style={styles.boton} onPress={() => console.log('Expediente creado:', formData)} ><Text>Crear</Text></Pressable>
      <Pressable style={styles.boton} onPress={() => setActiveScreen('main')} ><Text>Volver</Text></Pressable>

    </View>
  );

  const renderCalendarScreen = () => (
    <View >
<Calendar
  markingType="custom"
  renderArrow={(direction) => (
    <Ionicons
      name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
      size={20}
      color="#00adf5"
    />
  )}
  theme={{
    arrowColor: '#00adf5',
    todayTextColor: '#00adf5',
  }}  
  markedDates={{
    ...getMarkedDates(expedientes),
    ...(selectedDate ? {
      [selectedDate]: {
        ...(getMarkedDates(expedientes)[selectedDate] || {}),
        selected: true,
        selectedColor: '#00adf5',
        customStyles: {
          container: {
            backgroundColor: '#00adf5',
            borderRadius: 5,
            paddingHorizontal:0,
            paddingVertical: 0,
            height:'110%'
          },
        }
      }
    } : {})
  }}
  onDayPress={(day) => setSelectedDate(day.dateString)}
  theme={{
    selectedDayBackgroundColor: '#00adf5',
    todayTextColor: '#00adf5',
    arrowColor: '#00adf5',
  }}
/>



      {selectedDate ? (
        <View style={styles.listContainer}>
          <Text style={styles.title}>Expedientes para {selectedDate}</Text>
          <FlatList
            data={selectedExp}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            numColumns={4}
            
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
            <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.7 : 1 }
                  ]} 
                  onPress={() => {
                          setSelectedItem(item);
                          setModalVisible(true);
                        }}>
                <View style={styles.card}>
                {width > 600 ? (
                <View style={{alignSelf:'space-between',width:'100%', flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={styles.cardTitle}>{item.title}</Text>

                      <EstadoText estado={item.estado} long={true} />
                    </View>
                  ) :
                    (
                <View style={{alignSelf:'space-between',width:'100%', flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={[styles.cardTitle,{width:'30%'}]}>{item.title}</Text>

                        <EstadoText estado={item.estado} long={false}/>
                    </View>
                    )
                  }
                {item.especialidad === 'Trauma' && (
                  <EspecialidadIcon IconComponent={Trauma} nombre="Trauma" />
                )}
                {item.especialidad === 'Rehabilitacion' && (
                  <EspecialidadIcon IconComponent={Rehabilitacion} nombre="Rehabilitación" />
                )}
                {item.especialidad === 'Neurología' && (
                  <EspecialidadIcon IconComponent={Neurologia} nombre="Neurología" />
                )}
                {item.especialidad === 'Neurofisiologia' && (
                  <EspecialidadIcon IconComponent={Neurofisiologia} nombre="Neurofisiología" />
                )}
                {item.especialidad === 'Neurocirugia' && (
                  <EspecialidadIcon IconComponent={Neurocirugia} nombre="Neurocirugía" />
                )}
                {item.especialidad === 'Psiquiatria' && (
                  <EspecialidadIcon IconComponent={Psicologia} nombre="Psiquiatría" />
                )}
                {item.especialidad === 'Oftalmologia' && (
                  <EspecialidadIcon IconComponent={Oftalmologia} nombre="Oftalmología" />
                )}
                {item.especialidad === 'ORL' && (
                 <EspecialidadIcon IconComponent={ORL} nombre="Otorrinolaringología" />
                 )}     
                {item.especialidad === 'Ginecologia' && (
                  <EspecialidadIcon IconComponent={Ginecologia} nombre="Ginecología" />
                )}
                {item.especialidad === 'Med. Legal' && (
                  <EspecialidadIcon IconComponent={MedLegal} nombre="Medicina Legal" />
                )}
                {item.especialidad === 'Med. Trabajo' && (
                  <EspecialidadIcon IconComponent={MedTrabajo} nombre="Medicina del Trabajo" />
                )}
                {item.especialidad === 'Odontologia' && (
                  <EspecialidadIcon IconComponent={Odontologia} nombre="Odontología" />
                )}
                {item.especialidad === 'Maxilo Facial' && (
                  <EspecialidadIcon IconComponent={MaxiloFacial} nombre="Maxilofacial" />
                )}
                   
<View style={{ alignSelf: 'center', marginLeft: 10, marginTop: 10, minWidth: '60%' }}>
  {item.observaciones.slice(0, 1).map((obs, index) => (
    <View
      key={index}
      style={{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        minWidth: '100%',
        backgroundColor: '#f8f9fa', 
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1, 
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '300',
          color: '#333',
          lineHeight: 20,
          textAlign: 'center', 
        }}
      >
        {obs}
      </Text>
    </View>
  ))}
</View>



                </View>
              </Pressable>
              
            )}
          />
           
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}></Text>
      )
      
      }
      <View style={[styles.listContainer, { marginTop: 30 }]}>
        {width > 600 ? (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom:30,alignItems: 'center', minWidth: '100%', height: '3%', zIndex: 10000, overflow: 'visible', position: 'relative' }}>
            <Text style={styles.title}>Todos los expedientes</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '40vw', alignItems: 'center', minWidth: '30%', maxWidth: '60%', height: '100%', zIndex: 10000, overflow: 'visible', position: 'relative' }}>
              <DropDownPicker
                open={openEspecialidad}
                value={especialidad}
                items={especialidades}
                ArrowDownIconComponent={() => (
                    <Ionicons name="chevron-down" size={20} color="#000" />
                  )}
                  ArrowUpIconComponent={() => (
                    <Ionicons name="chevron-up" size={20} color="#000" />
                  )}
                  
                setOpen={setOpenEspecialidad}
                  
                zIndex={30000}
                zIndexInverse={3000}
                dropDownDirection="BOTTOM"
                setValue={setEspecialidad}
                setItems={setEspecialidades}
                placeholder="Especialidad"
                style={{ width: '40%', maxHeight: 40, border: '0px solid #ccc' }}
                containerStyle={{ marginHorizontal: 5, width: '70%', zIndex: 1000, backgroundColor: '#fff', }}
                dropDownContainerStyle={{ minHeight: '1600%' }}
                renderListItem={props => (
                  <Pressable
                    onPress={() => props.onPress(props)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                      <Text style={{ marginLeft: 8 }}>{props.item.label}</Text>
                      {props.item.icon && props.item.icon()}
                    </View>
                  </Pressable>
                )}
              />
 
              <DropDownPicker
                open={open}
                value={estado}
                items={estados}
                setOpen={setOpen}
                setValue={setEstado}
                  ArrowDownIconComponent={() => (
                    <Ionicons name="chevron-down" size={20} color="#000" />
                  )}
                  ArrowUpIconComponent={() => (
                    <Ionicons name="chevron-up" size={20} color="#000" />
                  )}
                setItems={setEstados}
                dropDownDirection="BOTTOM"
                placeholder="Estado"
                style={{ width: '30%', border: '0px solid #ccc' }}
                containerStyle={{ marginHorizontal: 5, width: '30%', zIndex: 10000 }}
                                dropDownContainerStyle={{ minHeight: '900%',minWidth:'150%' }}

                renderListItem={props => (
                  <Pressable
                    onPress={() => props.onPress(props)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                      {"render" in props.item && typeof props.item.render === "function"
                        ? props.item.render()
                        : <Text>{props.item.label}</Text>
                      }
                    </View>
                  </Pressable>
                )}
              />
              {estado && (
                <View style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                  <EstadoText estado={estado} long />
                </View>
              )}


              {/* 
          <Pressable style={styles.filtro} onPress={() => setActiveScreen('main')}><Text>Especialidad</Text><Text>↓</Text></Pressable>
          <Pressable style={styles.filtro} onPress={() => setActiveScreen('main')}><Text>Estado</Text><Text>↓</Text></Pressable>
          */}
            </View>
          </View>
        ) :
          (
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: '100%', height: '3%', zIndex: 10000, overflow: 'visible', position: 'relative' }}>
            <Text style={[styles.title,{alignSelf:'center'}]}>Todos los expedientes</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', minWidth: '100%', maxWidth: '60%', height: '100%', zIndex: 10000, overflow: 'visible', position: 'relative' }}>
              <DropDownPicker
                open={openEspecialidad}
                value={especialidad}
                items={especialidades}
                    ArrowDownIconComponent={() => (
    <Ionicons name="chevron-down" size={20} color="#000" />
  )}
  ArrowUpIconComponent={() => (
    <Ionicons name="chevron-up" size={20} color="#000" />
  )}
                setOpen={setOpenEspecialidad}
                  
                zIndex={30000}
                zIndexInverse={3000}
                dropDownDirection="BOTTOM"
                setValue={setEspecialidad}
                setItems={setEspecialidades}
                placeholder="Especialidad"
                style={{ width: '20%', maxHeight: 20, border: '0px solid #ccc' }}
                containerStyle={{ marginHorizontal: 5, width: '30%', zIndex: 1000, backgroundColor: '#fff', }}
                dropDownContainerStyle={{ height: '1600%',width:'300%' }}
                
                renderListItem={props => (
                  <Pressable
                    onPress={() => props.onPress(props)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                      <Text style={{ marginLeft: 8 }}>{props.item.label}</Text>
                      {props.item.icon && props.item.icon()}
                    </View>
                  </Pressable>
                )}
              />
 
              <DropDownPicker
                open={open}
                value={estado}
                items={estados}
                setOpen={setOpen}
                setValue={setEstado}
                  setItems={setEstados}
                    ArrowDownIconComponent={() => (
    <Ionicons name="chevron-down" size={20} color="#000" />
  )}
  ArrowUpIconComponent={() => (
    <Ionicons name="chevron-up" size={20} color="#000" />
  )}
                dropDownDirection="BOTTOM"
                placeholder="Estado"
                style={{ width: '30%', border: '0px solid #ccc' }}
                containerStyle={{ marginHorizontal: 5, width: '50%', zIndex: 10000,flexDirection:'row-reverse' }}
                dropDownContainerStyle={{width:'150%'}}
                renderListItem={props => (
                  <Pressable
                    onPress={() => props.onPress(props)}>
                    <View style={{ flexDirection: 'row',justifyContent:'center', alignItems: 'center', padding: 5 }}>
                      {"render" in props.item && typeof props.item.render === "function"
                        ? props.item.render()
                        : <Text>{props.item.label}</Text>
                      }
                    </View>
                  </Pressable>
                )}
              />
              {estado && (
                <View style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                  <EstadoText estado={estado} long />
                </View>
              )}


  
                
            </View>
          </View>
        )}
        
  <TextInput
    placeholder="Buscar expediente..."
    value={searchText}
    onChangeText={setSearchText}
    style={{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 10,
    }}
  />

  <FlatList
    data={filteredExpedientes }
          keyExtractor={(item) => item.id}
           showsVerticalScrollIndicator={false}
    numColumns={NUM_COLUMNS}
    columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <>
              <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.7 : 1 }
                  ]}
                onPress={() => {
                        setSelectedItem(item);
                        setModalVisible(true);
                      }}>
                <View style={styles.card}>
                {width > 600 ? (
                <View style={{alignSelf:'space-between',width:'100%', flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={styles.cardTitle}>{item.title}</Text>

                      <EstadoText estado={item.estado} long={true} />
                    </View>
                  ) :
                    (
                <View style={{alignSelf:'space-between',width:'100%', flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={styles.cardTitle}>{item.title}</Text>

                        <EstadoText estado={item.estado} long={false}/>
                    </View>
                    )
                  }

                  {/* Iconos de especialidad */}
                  {item.especialidad === 'Trauma' && (
                    <EspecialidadIcon IconComponent={Trauma} nombre="Trauma" />
                  )}
                  {item.especialidad === 'Rehabilitacion' && (
                    <EspecialidadIcon IconComponent={Rehabilitacion} nombre="Rehabilitación" />
                  )}
                  {item.especialidad === 'Neurología' && (
                    <EspecialidadIcon IconComponent={Neurologia} nombre="Neurología" />
                  )}
                  {item.especialidad === 'Neurofisiologia' && (
                    <EspecialidadIcon IconComponent={Neurofisiologia} nombre="Neurofisiología" />
                  )}
                  {item.especialidad === 'Neurocirugia' && (
                    <EspecialidadIcon IconComponent={Neurocirugia} nombre="Neurocirugía" />
                  )}
                  {item.especialidad === 'Psiquiatria' && (
                    <EspecialidadIcon IconComponent={Psicologia} nombre="Psiquiatría" />
                  )}
                  {item.especialidad === 'ORL' && (
                    <EspecialidadIcon IconComponent={ORL} nombre="Otorrinolaringología" />
                  )}        
                  {item.especialidad === 'Oftalmologia' && (
                    <EspecialidadIcon IconComponent={Oftalmologia} nombre="Oftalmología" />
                  )}
                  {item.especialidad === 'Ginecologia' && (
                    <EspecialidadIcon IconComponent={Ginecologia} nombre="Ginecología" />
                  )}
                  {item.especialidad === 'Med. Legal' && (
                    <EspecialidadIcon IconComponent={MedLegal} nombre="Medicina Legal" />
                  )}
                  {item.especialidad === 'Med. Trabajo' && (
                    <EspecialidadIcon IconComponent={MedTrabajo} nombre="Medicina del Trabajo" />
                  )}
                  {item.especialidad === 'Odontologia' && (
                    <EspecialidadIcon IconComponent={Odontologia} nombre="Odontología" />
                  )}
                  {item.especialidad === 'Maxilo Facial' && (
                    <EspecialidadIcon IconComponent={MaxiloFacial} nombre="Maxilofacial" />
                  )}
                
                <View style={{ alignSelf: 'center', marginLeft: 10, marginTop: 10, minWidth: '60%' }}>
                  {item.observaciones.slice(0, 1).map((obs, index) => (
                    <View
                      key={index}
                      style={{
                        borderRadius: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        minWidth: '100%',
                        backgroundColor: '#f8f9fa',
                        alignSelf: 'center',
                        shadowColor: '#000',
                        shadowOpacity: 0.05,
                        shadowOffset: { width: 0, height: 1 },
                        shadowRadius: 2,
                        elevation: 1, 
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '300',
                          color: '#333',
                          lineHeight: 20,
                          textAlign: 'center', 
                        }}
                      >
                        {obs}
                      </Text>
                    </View>
                  ))}
                </View>

                </View>
              </Pressable>      
              <EditModal
                visible={modalVisible}
                item={selectedItem}
                onClose={() => setModalVisible(false)}
                onSave={(updatedItem) => {
                  handleSave(updatedItem);
                  setModalVisible(false);
                }}
              />
            </>
)}
  />
</View>

    </View>

  );


  const renderScreen = () => {
    switch (activeScreen) {
      case 'search':
        return renderSearchScreen();
      case 'form':
        return renderFormScreen();
      case 'calendar':
        return renderMainContent();
      default:
        return renderCalendarScreen();
    }
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,   
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <Animated.View
          style={{
            opacity: fadeAnim,
            height:'100%',
            width:'100%',
            transform: [{ scale: scaleAnim }],
          }}
        >
      <View
      style={styles.general}
      > 

     <ScrollView 
        contentContainerStyle={{
          paddingTop: 20,
          marginTop:'5vh',
          width:'90vw',
          
          alignSelf: 'center',
          borderRadius:25,
          backgroundColor: '#fff',
            flexGrow: 1,
          
        }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          
      >
        <View
        >
            {renderScreen()}
            
        </View>
      </ScrollView>
      </View>
    </Animated.View>
  );
}




const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontWeight: '300',
  },

  general: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: '300',
    letterSpacing: 0.3,
  },

  gradient: {
    flex: 1,
  },

  subText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '300',
  },

  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 20,
    gap: 8,
    zIndex: 1,
  },
  filtro: {
    maxWidth: '30%',
    height:'30%',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },

  boton: {
    backgroundColor: 'rgb(0,0,0,0)',
    padding: 0,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#fff',
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  cardDescription: {
    fontSize: 13,
    marginTop: 4,
    color: '#666',
    fontWeight: '300',
  },

  cardDate: {
    fontSize: 11,
    marginTop: 8,
    color: '#999',
    fontWeight: '300',
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'column',
    gap: 10,
  },
    picker: {
    height: 50,
    backgroundColor: '#fff',
  },

  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: '#a0cfff',
  },

  bubbleText: {
    fontSize: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
    fontWeight: '300',
    color: '#fff',
  },

  iconButton: {
    display: 'flex',
    minWidth: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },

  listContainer: {
    padding: 20,
    width: '100%',
  },

  title: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    minWidth:180
  },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: '20%',
    width: '100%',   
    
  },
  button: {
    backgroundColor:'rgb(0,0,0,0)',
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 10,
    flex: 1,
    zIndex:2,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cardTitle: {
    fontWeight: '400',
    marginBottom: 4,
    marginRight: 10,
    fontSize: RFValue(8),

  },
    modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});