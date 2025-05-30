// src/screens/LibrosScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function LibrosScreen() {
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerRecursos();
  }, []);

  const obtenerRecursos = async () => {
    try {
      const response = await axios.get('https://tuapi.mockapi.io/recursos'); // reemplaza con tu URL
      const libros = response.data.filter((item) => item.tipo.toLowerCase() === 'libro');
      setRecursos(libros);
    } catch (error) {
      console.error('Error al obtener recursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const abrirEnlace = (url) => {
    Linking.openURL(url).catch((err) => console.error('No se pudo abrir el enlace:', err));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <TouchableOpacity onPress={() => abrirEnlace(item.enlace)} style={styles.boton}>
        <Text style={styles.botonTexto}>Ver Recurso</Text>
      </TouchableOpacity>
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
    <FlatList
      data={recursos}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
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
    height: 180,
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
});
