# App de Recursos de Aprendizaje

Aplicación móvil construida con **React Native** y **Expo**, que permite a los usuarios gestionar recursos de aprendizaje como videos y tutoriales. Consume una API REST alojada en [MockAPI.io](https://mockapi.io/) y permite funcionalidades CRUD (crear, leer, actualizar, eliminar).

## Integrantes
María José Rivera Flores - RF231136

## Video demostartivo de funcionamiento
https://drive.google.com/drive/folders/1DuASwsKMvr7Gw7P68xwFtO2JFQuuUE14?usp=drive_link

## Funcionalidades

- 📚 Listado de recursos filtrados por tipo (`video`, `tutorial`, etc.).
- 🔍 Búsqueda por título, ID o categoría.
- 📺 Visualización de recursos con imagen, descripción y enlace externo.
- ✏️ Edición de recursos existentes.
- ❌ Eliminación con confirmación modal.
- 📥 Creación de nuevos recursos desde un formulario.
- 🔄 Recarga automática al entrar a la pantalla.

## Tecnologías Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Axios](https://axios-http.com/)
- [React Navigation](https://reactnavigation.org/)
- [MockAPI.io](https://mockapi.io/) como backend simulado.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/recursos-app.git
   cd recursos-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el proyecto con Expo:
   ```bash
   npx expo start
   ```

## Estructura del Proyecto

```
.
├── App.js
├── screens/
│   ├── VideosScreen.js
│   ├── TutorialesScreen.js
│   ├── CrearRecursoScreen.js
│   └── EditarRecursoScreen.js
├── components/
│   └── RecursoCard.js
├── assets/
└── README.md
```

## API REST

Los datos se consumen desde una API mock creada en MockAPI.io:

```
https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos
```

Cada recurso tiene los siguientes campos:

- `id` (string)
- `titulo` (string)
- `descripcion` (string)
- `imagen` (URL string)
- `enlace` (URL string)
- `categoria` (string)
- `tipo` (string): puede ser `video`, `tutorial`, `documento`, etc.

## Créditos

Proyecto para fines educativos.
