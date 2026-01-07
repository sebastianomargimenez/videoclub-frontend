# Guía de Configuración Rápida

## Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```bash
VITE_API_URL=https://videoclub-api.onrender.com/api/v1
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Credenciales de Prueba

### Usuario Regular
Para crear un usuario regular, usa el formulario de registro en `/register`

### Usuario Administrador
Para crear un usuario administrador, necesitas:
1. Registrarte normalmente
2. En Supabase (backend), ir a la tabla `perfiles`
3. Cambiar el campo `role` de `'user'` a `'admin'`

Alternativamente, puedes usar las credenciales de admin que hayas creado en el backend.

## Flujo de Prueba Recomendado

### Como Usuario Regular
1. **Registro**:
   - Ir a `/register`
   - Crear cuenta con email y contraseña

2. **Explorar catálogo**:
   - Ver películas disponibles en `/`
   - Usar búsqueda y filtros

3. **Alquilar película**:
   - Click en "Alquilar" en una película
   - Verificar límite de 3 películas

4. **Ver mis alquileres**:
   - Ir a `/my-rentals`
   - Ver películas activas
   - Devolver una película

### Como Administrador
1. **Login como admin**:
   - Usar credenciales de administrador

2. **Acceder al panel**:
   - Click en "Administración" en navbar
   - Ver listado de todas las películas

3. **Crear película**:
   - Click en "+ Nueva Película"
   - Llenar formulario
   - Guardar

4. **Editar película**:
   - Click en "Editar" en cualquier película
   - Modificar datos
   - Actualizar

5. **Eliminar película**:
   - Click en "Eliminar"
   - Confirmar acción

## Estructura de Componentes

```
App.jsx (Router + AuthProvider)
├── Navbar (siempre visible)
│
├── Public Routes
│   ├── Login
│   ├── Register
│   └── Home (catálogo)
│
└── Protected Routes
    ├── MyRentals (requiere auth)
    └── Admin (requiere auth + role admin)
```

## Variables de Entorno

### Desarrollo Local
```env
VITE_API_URL=http://localhost:3001/api/v1
```

### Producción
```env
VITE_API_URL=https://videoclub-api.onrender.com/api/v1
```

## Scripts Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Linter
npm run lint
```

## Solución de Problemas

### Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ocupado
Cambiar en `vite.config.js`:
```js
server: {
  port: 3001, // o cualquier otro puerto
}
```

### CORS Error
Verificar que el backend tenga configurado:
```js
FRONTEND_URL=http://localhost:3000
```

## Tecnologías Utilizadas

- **React 18.3**: UI Library
- **Vite 6.0**: Build tool
- **Tailwind CSS 3.4**: Estilos
- **React Router DOM 6**: Routing
- **Axios**: HTTP Client
- **React Hot Toast**: Notificaciones

## Próximos Pasos

1. Personalizar colores en `tailwind.config.js`
2. Agregar más validaciones en formularios
3. Implementar paginación
4. Agregar tests
5. Deploy a producción
