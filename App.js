import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import LibrosScreen from './src/screens/LibrosScreen';
import AgregarRecursoScreen from './src/screens/AgregarRecursoScreen';
import EditarRecursoScreen from './src/screens/EditarRecursoScreen';
import VideosScreen from './src/screens/VideosScreen';
import ArticulosScreen from './src/screens/ArticulosScreen';
import TodosScreen from './src/screens/TodosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menú de Recursos' }} />
        <Stack.Screen name="Libros" component={LibrosScreen} options={ {title: 'Libros' }}/>
        <Stack.Screen name="AgregarRecurso" component={AgregarRecursoScreen} options={{ title: 'Agregar Recurso' }} />
        <Stack.Screen name="EditarRecurso" component={EditarRecursoScreen}/>
        <Stack.Screen name="Videos" component={VideosScreen} options={{ title:'Videos' }}/>
        <Stack.Screen name="Articulos" component={ArticulosScreen} options={{ title:'Articulos' }}/>
        <Stack.Screen name="Todos" component={TodosScreen} options={{ title: 'Todos' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
