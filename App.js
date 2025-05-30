// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import LibrosScreen from './src/screens/LibrosScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menú de Recursos' }} />
        <Stack.Screen name="Libro" component={LibrosScreen} options={ {title: 'Libros' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
