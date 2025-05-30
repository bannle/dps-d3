import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function EditarRecursoScreen({ route, navigation }) {
  const { recurso } = route.params;

  const [titulo, setTitulo] = useState(recurso.titulo);
  const [descripcion, setDescripcion] = useState(recurso.descripcion);
  const [imagen, setImagen] = useState(recurso.imagen);
  const [enlace, setEnlace] = useState(recurso.enlace);
  const [categoria, setCategoria] = useState(recurso.categoria || 'General');
  const [tipo, setTipo] = useState(recurso.tipo || 'articulo');

  const actualizarRecurso = async () => {
    if (!titulo || !descripcion || !enlace || !categoria || !tipo) {
      Alert.alert('Campos requeridos', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

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

    const recursoFinal = {
      ...recurso,
      imagen: recurso.imagen.trim() === '' ? imagenPorDefecto(tipo) : recurso.imagen,
    };


    try {
      await axios.put(`https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos/${recurso.id}`, {
        titulo,
        descripcion,
        imagen,
        enlace,
        categoria,
        tipo,
      });

      Alert.alert('Éxito', 'Recurso actualizado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al actualizar el recurso.');
    }
  };

  const cancelarEdicion = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título del recurso"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del recurso"
      />

      <Text style={styles.label}>URL de la Imagen</Text>
      <TextInput
        style={styles.input}
        value={imagen}
        onChangeText={setImagen}
        placeholder="https://..."
      />

      <Text style={styles.label}>Enlace del Recurso</Text>
      <TextInput
        style={styles.input}
        value={enlace}
        onChangeText={setEnlace}
        placeholder="https://..."
      />

      <Text style={styles.label}>Categoría</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Frontend" value="Frontend" />
        <Picker.Item label="Backend" value="Backend" />
        <Picker.Item label="Bases de Datos" value="Bases de Datos" />
        <Picker.Item label="Ingeniería de Software" value="Ingeniería de Software" />
      </Picker>

      <Text style={styles.label}>Tipo</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Artículo" value="articulo" />
        <Picker.Item label="Video" value="video" />
        <Picker.Item label="Libro" value="libro" />
        <Picker.Item label="Tutorial" value="tutorial" />
      </Picker>

      <TouchableOpacity style={styles.boton} onPress={actualizarRecurso}>
        <Text style={styles.botonTexto}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonCancelar} onPress={cancelarEdicion}>
        <Text style={styles.botonTextoCancelar}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
  },
  boton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonCancelar: {
    backgroundColor: '#6c757d',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botonTextoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
