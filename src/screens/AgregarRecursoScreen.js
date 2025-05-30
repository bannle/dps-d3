import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function AgregarRecursoScreen({ navigation }) {
  const [recurso, setRecurso] = useState({
    titulo: '',
    descripcion: '',
    tipo: '',
    categoria: '',
    enlace: '',
    imagen: '',
  });

  const handleChange = (name, value) => {
    setRecurso({ ...recurso, [name]: value });
  };

  const imagenPorDefecto = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'libro':
        return 'https://cdn-icons-png.flaticon.com/512/29/29302.png';
      case 'video':
        return 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png';
      case 'tutorial':
        return 'https://cdn-icons-png.flaticon.com/512/1183/1183756.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/565/565547.png';
    }
  };

  const handleSubmit = async () => {
    const { titulo, descripcion, tipo, categoria, enlace } = recurso;

    if (!titulo || !descripcion || !tipo || !categoria || !enlace) {
      Alert.alert('Campos requeridos', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    const recursoFinal = {
      ...recurso,
      imagen: recurso.imagen.trim() === '' ? imagenPorDefecto(tipo) : recurso.imagen,
    };

    try {
      await axios.post('https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos', recursoFinal);
      Alert.alert('Éxito', 'Recurso agregado correctamente');
      setRecurso({ titulo: '', descripcion: '', tipo:'', categoria: '', enlace: '', imagen: '' });
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar recurso:', error.response?.data || error.message);

      Alert.alert('Error', 'No se pudo agregar el recurso');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput style={styles.input} value={recurso.titulo} onChangeText={(value) => handleChange('titulo', value)} />

      <Text style={styles.label}>Descripción *</Text>
      <TextInput style={styles.input} value={recurso.descripcion} onChangeText={(value) => handleChange('descripcion', value)} />

      <Text style={styles.label}>Enlace *</Text>
      <TextInput style={styles.input} value={recurso.enlace} onChangeText={(value) => handleChange('enlace', value)} />

      <Text style={styles.label}>Tipo *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={recurso.tipo}
          onValueChange={(value) => handleChange('tipo', value)}
        >
          <Picker.Item label="Selecciona un tipo..." value="" />
          <Picker.Item label="📘 Libro" value="libro" />
          <Picker.Item label="🎥 Video" value="video" />
          <Picker.Item label="📚 Articulo" value="articulo" />
        </Picker>
      </View>

      <Text style={styles.label}>Categoría *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={recurso.categoria}
          onValueChange={(value) => handleChange('categoria', value)}
        >
          <Picker.Item label="Selecciona una categoría..." value="" />
          <Picker.Item label="Frontend" value="frontend" />
          <Picker.Item label="Backend" value="backend" />
          <Picker.Item label="Bases de Datos" value="bd" />
          <Picker.Item label="Ingeniería de Software" value="software" />
        </Picker>
      </View>

      <Text style={styles.label}>URL de la Imagen (opcional)</Text>
      <TextInput style={styles.input} value={recurso.imagen} onChangeText={(value) => handleChange('imagen', value)} />

      <View style={styles.buttonContainer}>
        <Button title="Agregar Recurso" onPress={handleSubmit} color="#4caf50" />
        <View style={{ height: 10 }} />
        <Button title="Cancelar" onPress={() => navigation.goBack()} color="#f44336" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 14,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 14,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
