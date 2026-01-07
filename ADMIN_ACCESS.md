# 🔐 Cómo Acceder al Panel de Administración

## Opción 1: Crear Usuario Admin desde Supabase (Recomendado)

### Pasos:

1. **Registrarte en la aplicación**
   - Ve a http://localhost:3000/register
   - Completa el formulario de registro
   - Anota tu email registrado

2. **Acceder a Supabase**
   - Ve a https://supabase.com
   - Inicia sesión en tu cuenta
   - Selecciona tu proyecto del videoclub

3. **Modificar el rol del usuario**
   - En el menú lateral, ve a **Table Editor**
   - Selecciona la tabla **`perfiles`**
   - Busca tu usuario por el email
   - Haz click en el campo **`role`**
   - Cámbialo de `user` a `admin`
   - Guarda los cambios

4. **Acceder al panel**
   - Vuelve a la aplicación
   - Refresca la página (F5)
   - Verás la opción "Administración" en el navbar
   - Haz click y accederás al panel de admin

---

## Opción 2: SQL Script Directo

Si prefieres hacerlo con SQL directamente en Supabase:

1. Ve a **SQL Editor** en Supabase
2. Ejecuta el siguiente script (reemplaza el email):

```sql
UPDATE perfiles
SET role = 'admin'
WHERE email = 'tu-email@example.com';
```

3. Refresca la aplicación y tendrás acceso al panel

---

## Opción 3: Crear Usuario Admin Automáticamente (Para Desarrollo)

### Modificar el backend temporalmente:

En el archivo `auth.service.js` del backend, puedes agregar lógica para hacer admin al primer usuario:

```javascript
// En la función de registro
if (!existingUsers.length) {
  // Primer usuario = admin
  role = 'admin';
}
```

**IMPORTANTE**: Esta opción solo debe usarse en desarrollo, nunca en producción.

---

## Verificar si eres Admin

### Desde el Frontend:

1. **Visualmente**: Si eres admin, verás:
   - Un badge "Admin" al lado de tu nombre en el navbar
   - La opción "Administración" en el menú de navegación

2. **En consola del navegador**:
   ```javascript
   // Abre DevTools (F12) y ejecuta:
   JSON.parse(localStorage.getItem('user'))
   // Deberías ver: { ..., role: 'admin' }
   ```

---

## ¿Qué puedes hacer como Admin?

Una vez dentro del panel de administración (`/admin`), podrás:

### ✅ Crear Películas
- Click en "+ Nueva Película"
- Completar todos los campos:
  - **Título**: Nombre de la película
  - **Género**: Categoría (Acción, Drama, etc.)
  - **Director**: Director de la película
  - **Año**: Año de estreno
  - **Duración**: En minutos
  - **URL del Póster**: Link a la imagen (ver sugerencias abajo)
  - **Descripción**: Sinopsis de la película
  - **Stock Total**: Cantidad total de copias
  - **Stock Disponible**: Copias disponibles para alquilar
  - **Precio**: Precio de alquiler

### ✅ Editar Películas
- Click en "Editar" en cualquier película
- Modifica los campos necesarios
- Guarda los cambios

### ✅ Eliminar Películas
- Click en "Eliminar"
- Confirma la acción

---

## 🖼️ Cómo obtener URLs de Pósters

### Opción 1: The Movie Database (TMDB) - Gratis
1. Ve a https://www.themoviedb.org/
2. Busca la película
3. Click derecho en el póster → "Copiar dirección de imagen"
4. Usa esa URL en el formulario

### Opción 2: IMDb
1. Ve a https://www.imdb.com/
2. Busca la película
3. Click derecho en el póster → "Copiar dirección de imagen"
4. Usa esa URL

### Opción 3: Placeholder temporal
Si no tienes una imagen, el sistema mostrará un placeholder automáticamente.

### Opción 4: Subir a un servicio
- **Imgur**: https://imgur.com (gratis)
- **Cloudinary**: https://cloudinary.com (gratis con límites)
- Sube la imagen y copia la URL

---

## Ejemplo de Película Completa

```json
{
  "titulo": "The Matrix",
  "genero": "Ciencia Ficción",
  "director": "Lana Wachowski, Lilly Wachowski",
  "anio": 1999,
  "duracion": 136,
  "poster_url": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  "descripcion": "Un hacker descubre que la realidad en la que vive es una simulación creada por máquinas inteligentes.",
  "stock_total": 5,
  "stock_disponible": 5,
  "precio_alquiler": 3.99
}
```

---

## Problemas Comunes

### ❌ "No veo la opción Administración"
**Solución**: Verifica que tu rol sea 'admin' en Supabase. Cierra sesión y vuelve a iniciar.

### ❌ "Me redirige a la home cuando intento acceder a /admin"
**Solución**: Tu usuario no tiene permisos de admin. Revisa los pasos anteriores.

### ❌ "La imagen no se muestra"
**Solución**:
- Verifica que la URL sea correcta
- Asegúrate que la URL termine en .jpg, .png, etc.
- Prueba abriendo la URL directamente en el navegador

### ❌ "Error al crear película"
**Solución**:
- Verifica que el backend esté corriendo
- Revisa que todos los campos requeridos estén completos
- Mira la consola del navegador para más detalles

---

## Seguridad

### Producción:
- **NUNCA** compartas las credenciales de admin
- El backend ya valida el rol antes de permitir operaciones
- Aunque modifiques el localStorage, el backend rechazará las peticiones si no eres admin real

### Verificación de Backend:
El backend tiene middleware que verifica:
```javascript
// Middleware que protege las rutas de admin
requireRole('admin')
```

Esto significa que incluso si alguien modifica el frontend, no podrá hacer operaciones de admin sin el rol correcto en la base de datos.

---

## Comandos Útiles

```bash
# Ver todos los usuarios y sus roles en Supabase (SQL Editor)
SELECT email, nombre, role, created_at
FROM perfiles
ORDER BY created_at;

# Hacer admin a un usuario específico
UPDATE perfiles
SET role = 'admin'
WHERE email = 'usuario@ejemplo.com';

# Ver todos los admins
SELECT email, nombre
FROM perfiles
WHERE role = 'admin';
```

---

## Próximos Pasos

Una vez que tengas acceso al panel:

1. ✅ Crea algunas películas de prueba
2. ✅ Prueba editar y eliminar
3. ✅ Verifica que los usuarios normales NO vean el panel
4. ✅ Prueba alquilar películas como usuario normal
5. ✅ Gestiona el stock desde el panel

---

**¿Necesitas ayuda?** Revisa la documentación completa en [README.md](./README.md)
