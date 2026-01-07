# Videoclub Frontend

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Frontend moderno para sistema de gestión de videoclub, construido con React, Vite y Tailwind CSS.

## 🔗 Backend API

Este frontend consume la API REST disponible en:
- **Repositorio**: [videoclub-api](https://github.com/sebastianomargimenez/videoclub-api)
- **API en producción**: https://videoclub-api.onrender.com

## ✨ Características

- **Autenticación completa**: Login, registro y gestión de sesiones con JWT
- **Catálogo de películas con imágenes**:
  - Pósters de películas con efecto hover
  - Búsqueda en tiempo real por título
  - Filtros dinámicos por género
  - Vista detallada en modal con toda la información
- **Sistema de alquileres**:
  - Alquilar películas con límite de 3 activas por usuario
  - Devolver películas
  - Ver historial de alquileres activos
- **Panel de administración** (solo admins):
  - CRUD completo de películas con formularios avanzados
  - Gestión de pósters, descripción, director, año, duración
  - Gestión de stock y precios
  - Vista de tabla con miniaturas
- **UI moderna y responsive**: Diseño adaptable a móviles, tablets y desktop
- **Notificaciones toast**: Feedback visual para todas las acciones
- **Control de roles**: Rutas protegidas según autenticación y permisos

## 🚀 Stack Tecnológico

- **Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Estilos**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios 1.7
- **Notificaciones**: React Hot Toast 2.4

## 📦 Instalación

### Prerrequisitos

- Node.js >= 18.x
- npm >= 9.x

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/videoclub-frontend.git
   cd videoclub-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear archivo `.env` basado en `.env.example`:
   ```bash
   VITE_API_URL=https://videoclub-api.onrender.com/api/v1
   ```

   Para desarrollo local (si tienes el backend corriendo localmente):
   ```bash
   VITE_API_URL=http://localhost:3001/api/v1
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
videoclub-frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── MovieCard.jsx    # Tarjeta de película
│   │   ├── MovieForm.jsx    # Formulario CRUD películas
│   │   └── ProtectedRoute.jsx # HOC para rutas protegidas
│   ├── contexts/            # Contextos de React
│   │   └── AuthContext.jsx  # Contexto de autenticación
│   ├── pages/               # Páginas/Vistas
│   │   ├── Login.jsx        # Página de login
│   │   ├── Register.jsx     # Página de registro
│   │   ├── Home.jsx         # Catálogo de películas
│   │   ├── MyRentals.jsx    # Alquileres del usuario
│   │   └── Admin.jsx        # Panel de administración
│   ├── services/            # Servicios de API
│   │   ├── api.js           # Configuración de Axios
│   │   ├── auth.service.js  # Servicio de autenticación
│   │   ├── movies.service.js # Servicio de películas
│   │   └── rentals.service.js # Servicio de alquileres
│   ├── App.jsx              # Componente principal con rutas
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales + Tailwind
├── public/                  # Archivos estáticos
├── index.html               # HTML base
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
├── package.json
└── README.md
```

## 🎯 Funcionalidades Principales

### 1. Autenticación

#### Registro de Usuario
- Formulario con validación
- Campos: nombre, email, password
- Confirmación de contraseña
- Almacenamiento automático de token JWT

#### Login
- Autenticación con email y password
- Persistencia de sesión con localStorage
- Redirección automática después del login

### 2. Catálogo de Películas

- Visualización de todas las películas disponibles
- **Búsqueda por título** (tiempo real)
- **Filtros por género** dinámicos
- Indicador de stock disponible
- Botón de alquiler (solo usuarios autenticados)

### 3. Sistema de Alquileres

#### Para Usuarios
- Alquilar películas (máximo 3 simultáneas)
- Ver películas activas alquiladas
- Devolver películas
- Indicador visual de límite (3/3)

#### Validaciones
- No se puede alquilar sin stock disponible
- Límite de 3 películas activas por usuario
- No se puede alquilar película ya alquilada

### 4. Panel de Administración

Solo accesible para usuarios con rol `admin`:

- **Crear película**: Formulario completo con validaciones
- **Editar película**: Actualizar datos existentes
- **Eliminar película**: Con confirmación
- **Vista de tabla**: Listado completo con stock y precios
- Gestión de stock total y disponible

## 🛣️ Rutas de la Aplicación

| Ruta | Componente | Acceso | Descripción |
|------|-----------|--------|-------------|
| `/` | Home | Público | Catálogo de películas |
| `/login` | Login | Público | Iniciar sesión |
| `/register` | Register | Público | Crear cuenta |
| `/my-rentals` | MyRentals | Autenticado | Mis alquileres |
| `/admin` | Admin | Solo Admin | Panel de administración |

## 🔐 Sistema de Autenticación

### Almacenamiento
- **Token JWT**: localStorage (`token`)
- **Datos de usuario**: localStorage (`user`)

### Flujo de Autenticación
1. Usuario hace login/registro
2. Backend devuelve token JWT + datos de usuario
3. Frontend almacena token y user en localStorage
4. Axios interceptor agrega token a todas las requests
5. Si token es inválido (401), logout automático

### Protección de Rutas
```jsx
<ProtectedRoute requireAdmin>
  <Admin />
</ProtectedRoute>
```

## 🎨 Estilos y UI

### Clases Personalizadas (Tailwind)

- **Botones**:
  - `.btn-primary`: Botón principal (azul)
  - `.btn-secondary`: Botón secundario (gris)
  - `.btn-danger`: Botón de peligro (rojo)

- **Inputs**:
  - `.input-field`: Input estilizado con focus

- **Componentes**:
  - `.card`: Tarjeta con sombra
  - `.badge`: Badge pequeño
  - `.badge-success`: Badge verde
  - `.badge-danger`: Badge rojo
  - `.badge-info`: Badge azul

### Tema de Colores

```js
primary: {
  500: '#0ea5e9',  // Sky blue
  600: '#0284c7',
  700: '#0369a1',
}
```

## 📡 Servicios de API

### Auth Service
```javascript
authService.register(userData)
authService.login(credentials)
authService.logout()
authService.getCurrentUser()
authService.isAuthenticated()
authService.isAdmin()
```

### Movies Service
```javascript
moviesService.getAllMovies()
moviesService.getMovieById(id)
moviesService.createMovie(data)      // Admin
moviesService.updateMovie(id, data)  // Admin
moviesService.deleteMovie(id)        // Admin
```

### Rentals Service
```javascript
rentalsService.createRental(peliculaId)
rentalsService.returnRental(rentalId)
rentalsService.getActiveRentals()
rentalsService.getAllRentals()       // Admin
```

## 🚦 Manejo de Errores

### Interceptor de Axios
- **401 Unauthorized**: Logout automático y redirección a `/login`
- **Otros errores**: Mostrados con react-hot-toast

### Notificaciones
```javascript
toast.success('Operación exitosa')
toast.error('Error al realizar la operación')
```

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**:
  - `sm`: >= 640px
  - `md`: >= 768px
  - `lg`: >= 1024px
  - `xl`: >= 1280px

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 3000)
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter de código
```

## 🔄 Flujo de Uso Completo

1. **Usuario nuevo**:
   - Visita la página → Ve catálogo público
   - Hace clic en "Registrarse"
   - Completa formulario → Crea cuenta
   - Automáticamente autenticado → Redirigido a home

2. **Alquilar película**:
   - Navega por catálogo
   - Usa búsqueda/filtros si desea
   - Click en "Alquilar" en película deseada
   - Sistema verifica límite y stock
   - Película agregada a "Mis Alquileres"

3. **Ver y devolver alquileres**:
   - Click en "Mis Alquileres" en navbar
   - Ve sus 3 películas activas
   - Click en "Devolver" cuando termine
   - Stock se actualiza automáticamente

4. **Administrador**:
   - Login con cuenta admin
   - Click en "Administración" en navbar
   - CRUD completo de películas
   - Gestión de stock y precios

## 🔗 Integración con Backend

### Configuración
```javascript
// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;
```

### Headers Automáticos
```javascript
// Token agregado automáticamente
Authorization: Bearer {token}
```

### Endpoints Consumidos
- `POST /auth/register`
- `POST /auth/login`
- `GET /movies`
- `GET /movies/:id`
- `POST /movies` (admin)
- `PUT /movies/:id` (admin)
- `DELETE /movies/:id` (admin)
- `POST /rentals`
- `POST /rentals/:id/return`
- `GET /rentals/active`
- `GET /rentals` (admin)

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

Genera carpeta `dist/` lista para deploy.

### Opciones de Deploy
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop de `dist/`
- **GitHub Pages**: Con `gh-pages` package
- **Render**: Conectar repo y configurar build

### Variables de Entorno en Producción
```bash
VITE_API_URL=https://videoclub-api.onrender.com/api/v1
```

## 🐛 Troubleshooting

### Problema: CORS Error
**Solución**: Verificar que el backend tenga configurado CORS para el frontend URL.

### Problema: 401 Unauthorized constante
**Solución**:
1. Verificar que el token se esté guardando en localStorage
2. Revisar interceptor de Axios
3. Confirmar que backend acepte el token

### Problema: Estilos no se cargan
**Solución**:
1. Verificar que `index.css` importe Tailwind
2. Ejecutar `npm run dev` de nuevo
3. Limpiar caché del navegador

## 🔐 Acceso al Panel de Administración

### ¿Cómo ser Administrador?

Por defecto, los usuarios se registran con rol `user`. Para acceder al panel de administración:

1. **Regístrate en la aplicación** normalmente
2. **Accede a Supabase** (backend)
   - Ve a Table Editor → tabla `perfiles`
   - Busca tu usuario por email
   - Cambia el campo `role` de `'user'` a `'admin'`
3. **Refresca la aplicación** y verás:
   - Badge "Admin" en el navbar
   - Opción "Administración" en el menú

**📖 Guía completa**: Ver [ADMIN_ACCESS.md](./ADMIN_ACCESS.md) para instrucciones detalladas.

### Funcionalidades del Panel Admin

- ✅ Crear películas con toda la información (póster, descripción, director, etc.)
- ✅ Editar cualquier película existente
- ✅ Eliminar películas
- ✅ Gestionar stock y precios
- ✅ Vista de tabla con miniaturas de pósters

### URLs de Pósters Sugeridas

Para agregar imágenes de películas:
- **The Movie Database**: https://www.themoviedb.org/ (gratis, sin cuenta)
- **IMDb**: https://www.imdb.com/
- **Imgur**: https://imgur.com (para subir tus propias imágenes)

## 📝 Próximas Mejoras

- [ ] Paginación en catálogo de películas
- [ ] Sistema de favoritos
- [ ] Historial completo de alquileres
- [ ] Búsqueda avanzada con múltiples filtros
- [ ] Sistema de calificaciones y reseñas
- [ ] Notificaciones de películas próximas a vencer
- [ ] Modo oscuro (dark mode)
- [ ] PWA (Progressive Web App)
- [ ] Tests con Vitest + React Testing Library

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## 👤 Autor

**Sebastián Omar Giménez**

- GitHub: [@sebastianomargimenez](https://github.com/sebastianomargimenez)
- Proyecto Backend: [videoclub-api](https://github.com/sebastianomargimenez/videoclub-api)

---

**Desarrollado con React ⚛️ + Vite ⚡ + Tailwind CSS 💨**
