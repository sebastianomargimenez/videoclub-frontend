# 🚀 Inicio Rápido - Videoclub Frontend

## Comandos Esenciales

```bash
# 1. Instalar dependencias (ya ejecutado)
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000
```

## ✅ Lo que ya está listo

- ✅ Proyecto React + Vite inicializado
- ✅ Tailwind CSS configurado
- ✅ Dependencias instaladas (338 packages)
- ✅ Sistema de autenticación completo
- ✅ Catálogo de películas con pósters e imágenes
- ✅ Modal de detalles de película (click en póster)
- ✅ Búsqueda y filtros en tiempo real
- ✅ Sistema de alquileres con límite de 3
- ✅ Panel de administración completo con imágenes
- ✅ Git inicializado
- ✅ Variables de entorno configuradas

## 📂 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación
│   ├── MovieCard.jsx   # Tarjeta de película
│   ├── MovieForm.jsx   # Formulario CRUD
│   └── ProtectedRoute.jsx
│
├── contexts/           # Context API
│   └── AuthContext.jsx # Autenticación global
│
├── pages/              # Páginas principales
│   ├── Login.jsx       # Iniciar sesión
│   ├── Register.jsx    # Registrarse
│   ├── Home.jsx        # Catálogo
│   ├── MyRentals.jsx   # Mis alquileres
│   └── Admin.jsx       # Panel admin
│
├── services/           # Servicios API
│   ├── api.js          # Axios config
│   ├── auth.service.js
│   ├── movies.service.js
│   └── rentals.service.js
│
├── App.jsx             # Router principal
├── main.jsx            # Entry point
└── index.css           # Tailwind + estilos
```

## 🎯 Funcionalidades Implementadas

### Autenticación
- [x] Login
- [x] Registro
- [x] Logout
- [x] Persistencia de sesión
- [x] Rutas protegidas
- [x] Control de roles (admin/user)

### Catálogo de Películas
- [x] Listado completo con pósters
- [x] Búsqueda por título en tiempo real
- [x] Filtro por género
- [x] Vista de stock disponible
- [x] Click en póster para ver detalles completos
- [x] Modal con información extendida
- [x] Alquilar película desde catálogo o modal

### Sistema de Alquileres
- [x] Alquilar película
- [x] Ver alquileres activos
- [x] Devolver película
- [x] Límite de 3 películas
- [x] Indicador visual de límite

### Panel de Administración
- [x] Crear película con todos los campos (póster, descripción, director, etc.)
- [x] Editar película con preview de imagen
- [x] Eliminar película con confirmación
- [x] Vista de tabla con miniaturas de pósters
- [x] Gestión completa de stock y precios
- [x] Campos adicionales: año, duración, director, descripción

## 🔐 Primeros Pasos

1. **Iniciar el servidor**:
   ```bash
   npm run dev
   ```

2. **Registrarse**:
   - Ir a http://localhost:3000/register
   - Crear una cuenta nueva

3. **Explorar el catálogo**:
   - Ver películas disponibles
   - Usar búsqueda y filtros
   - Alquilar una película

4. **Ver alquileres**:
   - Click en "Mis Alquileres"
   - Ver películas activas
   - Devolver una película

## 👨‍💼 Para probar como Admin

1. Registrarte normalmente
2. En Supabase (backend):
   - Ir a tabla `perfiles`
   - Cambiar tu `role` de `'user'` a `'admin'`
3. Recargar la página
4. Acceder a "Administración"

## 🌐 API Backend

El frontend está configurado para conectarse a:
```
https://videoclub-api.onrender.com/api/v1
```

Para cambiar a backend local, editar `.env`:
```env
VITE_API_URL=http://localhost:3001/api/v1
```

## 📦 Dependencias Principales

- **react**: 18.3.1
- **react-router-dom**: 6.28.0
- **axios**: 1.7.9
- **react-hot-toast**: 2.4.1
- **tailwindcss**: 3.4.17
- **vite**: 6.0.5

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Desarrollo (puerto 3000)
npm run build    # Build producción
npm run preview  # Preview build
npm run lint     # Linter
```

## 🐛 Si algo no funciona

```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar variables de entorno
cat .env

# Reiniciar servidor
npm run dev
```

## 📚 Documentación Completa

Ver [README.md](./README.md) para documentación completa.

---

**Listo para usar! 🎬🍿**
