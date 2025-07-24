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
  Image
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';




const expedientes = [
  { id: '1', title: 'Expediente 1', description: 'Descripción del expediente 1', fechaLimite: '2025-07-03' },
  { id: '2', title: 'Expediente 2', description: 'Descripción del expediente 2', fechaLimite: '2025-07-05' },
  { id: '3', title: 'Expediente 3', description: 'Descripción del expediente 3', fechaLimite: '2025-07-10' },
  { id: '4', title: 'Expediente 4', description: 'Descripción del expediente 4', fechaLimite: '2025-07-10' },
  { id: '5', title: 'Expediente 5', description: 'Descripción del expediente 5', fechaLimite: '2025-07-15' },
  { id: '6', title: 'Expediente 6', description: 'Descripción del expediente 6', fechaLimite: '2025-07-08' },
  { id: '7', title: 'Expediente 7', description: 'Descripción del expediente 7', fechaLimite: '2025-07-01' },
  { id: '8', title: 'Expediente 8', description: 'Descripción del expediente 8', fechaLimite: '2025-07-17' },
  { id: '9', title: 'Expediente 9', description: 'Descripción del expediente 9', fechaLimite: '2025-07-02' },
  { id: '10', title: 'Expediente 10', description: 'Descripción del expediente 10', fechaLimite: '2025-07-03' },
  { id: '11', title: 'Expediente 11', description: 'Descripción del expediente 11', fechaLimite: '2025-07-04' },
  { id: '12', title: 'Expediente 12', description: 'Descripción del expediente 12', fechaLimite: '2025-07-06' },
  { id: '13', title: 'Expediente 13', description: 'Descripción del expediente 13', fechaLimite: '2025-07-09' },
  { id: '14', title: 'Expediente 14', description: 'Descripción del expediente 14', fechaLimite: '2025-07-09' },
  { id: '15', title: 'Expediente 15', description: 'Descripción del expediente 15', fechaLimite: '2025-07-07' },
  { id: '16', title: 'Expediente 16', description: 'Descripción del expediente 16', fechaLimite: '2025-07-08' },
  { id: '17', title: 'Expediente 17', description: 'Descripción del expediente 17', fechaLimite: '2025-07-11' },
  { id: '18', title: 'Expediente 18', description: 'Descripción del expediente 18', fechaLimite: '2025-07-12' },
  { id: '19', title: 'Expediente 19', description: 'Descripción del expediente 19', fechaLimite: '2025-07-13' },
  { id: '20', title: 'Expediente 20', description: 'Descripción del expediente 20', fechaLimite: '2025-07-13' },
  { id: '21', title: 'Expediente 21', description: 'Descripción del expediente 21', fechaLimite: '2025-07-15' },
  { id: '22', title: 'Expediente 22', description: 'Descripción del expediente 22', fechaLimite: '2025-07-16' },
  { id: '23', title: 'Expediente 23', description: 'Descripción del expediente 23', fechaLimite: '2025-07-18' },
  { id: '24', title: 'Expediente 24', description: 'Descripción del expediente 24', fechaLimite: '2025-07-19' },
  { id: '25', title: 'Expediente 25', description: 'Descripción del expediente 25', fechaLimite: '2025-07-20' },
  { id: '26', title: 'Expediente 26', description: 'Descripción del expediente 26', fechaLimite: '2025-07-21' },
  { id: '27', title: 'Expediente 27', description: 'Descripción del expediente 27', fechaLimite: '2025-07-22' },
  { id: '28', title: 'Expediente 28', description: 'Descripción del expediente 28', fechaLimite: '2025-07-23' },
  { id: '29', title: 'Expediente 29', description: 'Descripción del expediente 29', fechaLimite: '2025-07-24' },
  { id: '30', title: 'Expediente 30', description: 'Descripción del expediente 30', fechaLimite: '2025-07-25' },
  { id: '31', title: 'Expediente 31', description: 'Descripción del expediente 31', fechaLimite: '2025-07-26' },
  { id: '32', title: 'Expediente 32', description: 'Descripción del expediente 32', fechaLimite: '2025-07-27' },
  { id: '33', title: 'Expediente 33', description: 'Descripción del expediente 33', fechaLimite: '2025-07-28' },
  { id: '34', title: 'Expediente 34', description: 'Descripción del expediente 34', fechaLimite: '2025-07-29' },
  { id: '35', title: 'Expediente 35', description: 'Descripción del expediente 35', fechaLimite: '2025-07-30' },
  { id: '36', title: 'Expediente 36', description: 'Descripción del expediente 36', fechaLimite: '2025-07-31' },
  { id: '37', title: 'Expediente 37', description: 'Descripción del expediente 37', fechaLimite: '2025-07-03' },
  { id: '38', title: 'Expediente 38', description: 'Descripción del expediente 38', fechaLimite: '2025-07-05' },
  { id: '39', title: 'Expediente 39', description: 'Descripción del expediente 39', fechaLimite: '2025-07-07' },
  { id: '40', title: 'Expediente 40', description: 'Descripción del expediente 40', fechaLimite: '2025-07-12' },
  { id: '41', title: 'Expediente 41', description: 'Descripción del expediente 41', fechaLimite: '2025-07-14' },
  { id: '42', title: 'Expediente 42', description: 'Descripción del expediente 42', fechaLimite: '2025-07-16' },
  { id: '43', title: 'Expediente 43', description: 'Descripción del expediente 43', fechaLimite: '2025-07-18' },
  { id: '44', title: 'Expediente 44', description: 'Descripción del expediente 44', fechaLimite: '2025-07-20' },
  { id: '45', title: 'Expediente 45', description: 'Descripción del expediente 45', fechaLimite: '2025-07-22' },
  { id: '46', title: 'Expediente 46', description: 'Descripción del expediente 46', fechaLimite: '2025-07-24' },
  { id: '47', title: 'Expediente 47', description: 'Descripción del expediente 47', fechaLimite: '2025-07-26' },
  { id: '48', title: 'Expediente 48', description: 'Descripción del expediente 48', fechaLimite: '2025-07-28' },
  { id: '49', title: 'Expediente 49', description: 'Descripción del expediente 49', fechaLimite: '2025-07-30' },
  { id: '50', title: 'Expediente 50', description: 'Descripción del expediente 50', fechaLimite: '2025-07-31' }
];





export default function HomeScreen() {

  const [activeScreen, setActiveScreen] = useState('main');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [focusedExpediente, setFocusedExpediente] = useState(null);
  const [expedientesNotas, setExpedientesNotas] = useState({});
  const scaleAnim = useRef(new Animated.Value(0)).current;


// Cargar la fuente solo una vez
 const [fontsLoaded] = useFonts({
    Ionicons: require('../../assets/fonts/vector-icons/Ionicons.ttf'),
  });


// Animar al cambiar activeScreen
useEffect(() => {
  fadeAnim.setValue(0);
  scaleAnim.setValue(0);

  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
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


  
const getMarkedDates = (expedientes) => {
  const marked = {};
  expedientes.forEach((exp) => {
    if (!marked[exp.fechaLimite]) {
      marked[exp.fechaLimite] = {
        marked: true,
        dotColor: 'red',
      };
    }
  });
  return marked;
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



  const filteredExpedientes = expedientes.filter(
    (exp) => exp.fechaLimite === selectedDate
  );

  



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
            <Text style={styles.cardDescription}>{item.description}</Text>
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

const renderNoteScreen = () => (
  <View>
    <Text style={{ fontSize: 20, marginVertical: 10, textAlign: 'center' }}>
      Añadir nota
    </Text>

    {focusedExpediente ? (
      <>
        <Text style={{ textAlign: 'center' }}>
          Añadiendo nota a: {focusedExpediente.title}
        </Text>
        <TextInput
          placeholder="Escribe una nota..."
          value={noteText}
          onChangeText={setNoteText}
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            margin: 10,
            borderRadius: 8,
            height: 100,
            textAlign: 'center'
          }}
        />
        <Pressable
          style={styles.boton}
          onPress={() => {
            setExpedientesNotas({ ...expedientesNotas, [focusedExpediente.id]: noteText });
            setNoteText('');
            setActiveScreen('main');
          }}
        >
          <Text>Guardar nota</Text>
        </Pressable>
      </>
    ) : (
      <Text style={{ textAlign: 'center', marginVertical: 20 }}>
        Debes seleccionar un expediente primero
      </Text>
    )}

    <Pressable style={styles.boton} onPress={() => setActiveScreen('main')} >
      <Text>Volver</Text>
    </Pressable>
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
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...getMarkedDates(expedientes),
          [selectedDate]: {
            selected: true,
            selectedColor: '#00adf5',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          dotColor: 'red',
          arrowColor: '#00adf5',
        }}
      />

      {selectedDate ? (
        <View style={styles.listContainer}>
          <Text style={styles.title}>Expedientes para {selectedDate}</Text>
          <FlatList
            data={filteredExpedientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Selecciona una fecha</Text>
      )}
      <Pressable style={styles.boton} onPress={() => setActiveScreen('main')} ><Text>Volver</Text></Pressable>
    </View>
  );



  const renderScreen = () => {
    switch (activeScreen) {
      case 'search':
        return renderSearchScreen();
      case 'note':
        return renderNoteScreen();
      case 'form':
        return renderFormScreen();
      case 'calendar':
        return renderCalendarScreen();
      default:
        return renderMainContent();
    }
  };
  return (
    <Animated.View
          style={{
        opacity: fadeAnim,
            height:'100%',
            width:'100%',
            transform: [{ scale: scaleAnim }],
          }}
        >
      <ImageBackground
      source={{uri:'https://wallpapers.com/images/hd/business-background-vkyltmd1r47q5c2z.jpg'
}} // Usa tu base64 largo aquí
        style={{ flex: 1 }}
      > 
        <View style={styles.titleContainer}>
          {/*
          <Image style={{zIndex:2,top:30,left:'30vw',position:'absolute', width:'13%', height:'30vh'}} source={{uri:'data:image/jpeg;base64,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'}}></Image>
           */}
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>¡Hola Carlos!</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>Gestor Expedientes</Text>
        </View>  
     <ScrollView 
        contentContainerStyle={{
          paddingTop: 20,
          width:'80%',
          height:'100%',
            alignSelf: 'center',
          borderRadius:25,
          backgroundColor: '#fff',
          flexGrow: 1,
        }}
          keyboardShouldPersistTaps="handled"
          
      >
        <View
        >
          {renderScreen()}
        </View>
      </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}




const styles = StyleSheet.create({
  label:{
    color: 'black',
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
  boton:{
    backgroundColor: '#33c7ff',
    padding: 10,
    width:'30%',
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
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  cardDate: {
    fontSize: 12,
    marginTop: 8,
    color: '#999',
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
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
   backgroundColor: 'rgba(0,0,0,0.4)',    borderWidth: 1,
    borderColor: '#a0cfff',
  },
  bubbleText: {
    fontSize: 16,
       backgroundColor: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  iconButton:{
    display: 'flex',
    minWidth:'10%',
    justifyContent: 'center',
    alignItems: 'center',
    },
      container: { flex: 1, paddingTop: 40, backgroundColor: '#fff' },
  listContainer: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontWeight: 'bold', marginBottom: 4 },
});
