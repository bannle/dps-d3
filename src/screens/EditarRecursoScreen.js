import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function EditarRecursoScreen({ route, navigation }) {
  const { recurso } = route.params;

  const [titulo, setTitulo] = useState(recurso.titulo);
  const [descripcion, setDescripcion] = useState(recurso.descripcion);
  const [imagen, setImagen] = useState(recurso.imagen);
  const [enlace, setEnlace] = useState(recurso.enlace);

  const actualizarRecurso = async () => {
    if (!titulo || !descripcion || !imagen || !enlace) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      await axios.put(`https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos/${recurso.id}`, {
        titulo,
        descripcion,
        imagen,
        enlace,
      });
      Alert.alert('Éxito', 'Recurso actualizado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al actualizar el recurso.');
    }
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

      <TouchableOpacity style={styles.boton} onPress={actualizarRecurso}>
        <Text style={styles.botonTexto}>Guardar Cambios</Text>
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
});
