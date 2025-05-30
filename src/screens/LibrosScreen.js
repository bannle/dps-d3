import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Modal, Alert, ActivityIndicator, FlatList, StyleSheet, Image, Linking, TouchableOpacity, View, Text, TextInput } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function LibrosScreen() {
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [recursoSeleccionado, setRecursoSeleccionado] = useState(null);
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');
  const [librosFiltrados, setLibrosFiltrados] = useState([]);


  // refrescar despues de edicion
  useFocusEffect(
    useCallback(() => {
      obtenerRecursos();
    }, [])
  );

  useEffect(() => {
    setLibrosFiltrados(recursos);
  }, [recursos]);

  useEffect(() => {
    obtenerRecursos();
  }, []);

  const filtrarLibros = (texto) => {
    setBusqueda(texto);
    const textoMinuscula = texto.toLowerCase();

    const filtrados = recursos.filter(item =>
      item.titulo?.toLowerCase().includes(textoMinuscula) ||
      item.id?.toString().includes(textoMinuscula) ||
      item.categoria?.toString().includes(textoMinuscula)
    );

    setLibrosFiltrados(filtrados);
  };

  const obtenerRecursos = async () => {
    try {
      const response = await axios.get('https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos');
      const libros = response.data.filter((item) => item.tipo?.toLowerCase() === 'libro');
      setRecursos(libros);
    } catch (error) {
      console.error('Error al obtener recursos:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const abrirEnlace = (url) => {
    Linking.openURL(url).catch((err) => console.error('No se pudo abrir el enlace:', err));
  };

  const confirmarEliminacion = (recurso) => {
    setRecursoSeleccionado(recurso);
    setModalVisible(true);
  };

  const eliminarRecurso = async () => {
    try {
      await axios.delete(`https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos/${recursoSeleccionado.id}`);
      setRecursos((prev) => prev.filter(item => item.id !== recursoSeleccionado.id));
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el recurso.');
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imagen?.url || item.imagen || 'https://cdn-icons-png.flaticon.com/512/565/565547.png' }}
        style={styles.image}
      />
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.descripcion}>Categoría: {item.categoria}</Text>
      <Text style={styles.descripcion}>ID: {item.id}</Text>

      <TouchableOpacity onPress={() => abrirEnlace(item.enlace?.url || item.enlace)} style={styles.boton}>
        <Text style={styles.botonTexto}>Ver Recurso</Text>
      </TouchableOpacity>

      <View style={styles.botonesAccion}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditarRecurso', { recurso: item })}
          style={[styles.boton, styles.botonEditar]}
        >
          <Text style={styles.botonTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => confirmarEliminacion(item)}
          style={[styles.boton, styles.botonEliminar]}
        >
          <Text style={styles.botonTexto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando libros...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Buscar por título o ID"
        value={busqueda}
        onChangeText={filtrarLibros}
        style={styles.barraBusqueda}
      />

      {librosFiltrados.length === 0 ? (
        <View style={styles.sinRecursosContainer}>
          <Text style={styles.sinRecursosTexto}>No hay recursos por el momento</Text>
        </View>
      ) : (
        <FlatList
        data={librosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Estás seguro de eliminar este recurso?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={eliminarRecurso} style={[styles.boton, styles.botonSi]}>
                <Text style={styles.botonTexto}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.boton, styles.botonNo]}>
                <Text style={styles.botonTexto}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  barraBusqueda: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 16,
    elevation: 2,
    fontSize: 16,
  },

  lista: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 270,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonesAccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botonEditar: {
    backgroundColor: '#28a745',
    flex: 1,
    marginRight: 5,
  },
  botonEliminar: {
    backgroundColor: '#dc3545',
    flex: 1,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  botonSi: {
    backgroundColor: '#dc3545',
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
  },
  botonNo: {
    backgroundColor: '#6c757d',
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
  },
  sinRecursosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  sinRecursosTexto: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },

});
