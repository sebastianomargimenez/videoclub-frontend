-- ============================================
-- Script de Actualización para Videoclub API
-- Agrega los nuevos campos de películas
-- ============================================

-- INSTRUCCIONES:
-- 1. Ve a tu proyecto en Supabase (https://supabase.com)
-- 2. Abre el SQL Editor (icono de código en el menú lateral)
-- 3. Copia y pega este script completo
-- 4. Click en "Run" para ejecutar
-- 5. ¡Listo! Tu backend ahora soporta imágenes y campos adicionales

-- ============================================
-- Agregar nuevos campos a la tabla peliculas
-- ============================================

-- Campo para URL del póster de la película
ALTER TABLE peliculas
ADD COLUMN IF NOT EXISTS poster_url TEXT;

-- Campo para el director de la película
ALTER TABLE peliculas
ADD COLUMN IF NOT EXISTS director TEXT;

-- Campo para el año de estreno
ALTER TABLE peliculas
ADD COLUMN IF NOT EXISTS anio INTEGER;

-- Campo para la duración en minutos
ALTER TABLE peliculas
ADD COLUMN IF NOT EXISTS duracion INTEGER;

-- Campo para la descripción/sinopsis
ALTER TABLE peliculas
ADD COLUMN IF NOT EXISTS descripcion TEXT;

-- ============================================
-- Comentarios en las columnas (opcional)
-- ============================================

COMMENT ON COLUMN peliculas.poster_url IS 'URL de la imagen/póster de la película';
COMMENT ON COLUMN peliculas.director IS 'Director(es) de la película';
COMMENT ON COLUMN peliculas.anio IS 'Año de estreno de la película';
COMMENT ON COLUMN peliculas.duracion IS 'Duración de la película en minutos';
COMMENT ON COLUMN peliculas.descripcion IS 'Sinopsis o descripción de la película';

-- ============================================
-- Verificar que todo esté correcto
-- ============================================

-- Este query te mostrará todas las columnas de la tabla peliculas
-- para verificar que los campos se agregaron correctamente
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'peliculas'
ORDER BY ordinal_position;

-- ============================================
-- (OPCIONAL) Datos de prueba
-- ============================================

-- Si quieres probar con una película de ejemplo, descomenta y ejecuta esto:

/*
INSERT INTO peliculas (
    titulo,
    genero,
    director,
    anio,
    duracion,
    descripcion,
    poster_url,
    stock_total,
    stock_disponible,
    precio_alquiler
) VALUES (
    'The Matrix',
    'Ciencia Ficción',
    'Lana Wachowski, Lilly Wachowski',
    1999,
    136,
    'Un hacker descubre que la realidad en la que vive es una simulación creada por máquinas inteligentes. Con la ayuda de misteriosos rebeldes, debe enfrentarse a los agentes del sistema para liberar a la humanidad.',
    'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    5,
    5,
    3.99
);
*/

-- ============================================
-- Notas importantes
-- ============================================

-- ✅ Estos campos son OPCIONALES - tu API seguirá funcionando sin ellos
-- ✅ Las películas existentes NO se verán afectadas
-- ✅ Puedes agregar pósters gradualmente
-- ✅ Si no especificas poster_url, el frontend mostrará un placeholder

-- ============================================
-- Rollback (si algo sale mal)
-- ============================================

-- Si necesitas revertir los cambios, ejecuta esto:

/*
ALTER TABLE peliculas DROP COLUMN IF EXISTS poster_url;
ALTER TABLE peliculas DROP COLUMN IF EXISTS director;
ALTER TABLE peliculas DROP COLUMN IF EXISTS anio;
ALTER TABLE peliculas DROP COLUMN IF EXISTS duracion;
ALTER TABLE peliculas DROP COLUMN IF EXISTS descripcion;
*/

-- ============================================
-- ¡Todo listo!
-- ============================================

-- Tu backend ahora soporta:
-- ✅ Pósters de películas
-- ✅ Director
-- ✅ Año de estreno
-- ✅ Duración
-- ✅ Descripción/sinopsis

-- Ahora puedes usar el panel de administración del frontend
-- para agregar películas con toda esta información.
