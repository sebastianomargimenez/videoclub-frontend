import { useState, useEffect } from 'react';

export const MovieForm = ({ movie, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    director: '',
    anio: '',
    duracion: '',
    descripcion: '',
    poster_url: '',
    stock_total: '',
    stock_disponible: '',
    precio_alquiler: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        titulo: movie.titulo || '',
        genero: movie.genero || '',
        director: movie.director || '',
        anio: movie.anio || '',
        duracion: movie.duracion || '',
        descripcion: movie.descripcion || '',
        poster_url: movie.poster_url || '',
        stock_total: movie.stock_total || '',
        stock_disponible: movie.stock_disponible || '',
        precio_alquiler: movie.precio_alquiler || ''
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      anio: formData.anio ? parseInt(formData.anio) : null,
      duracion: formData.duracion ? parseInt(formData.duracion) : null,
      stock_total: parseInt(formData.stock_total),
      stock_disponible: parseInt(formData.stock_disponible),
      precio_alquiler: parseFloat(formData.precio_alquiler)
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          name="titulo"
          required
          className="input-field"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ej: Matrix"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Género
        </label>
        <input
          type="text"
          name="genero"
          required
          className="input-field"
          value={formData.genero}
          onChange={handleChange}
          placeholder="Ej: Ciencia Ficción"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Director
          </label>
          <input
            type="text"
            name="director"
            className="input-field"
            value={formData.director}
            onChange={handleChange}
            placeholder="Ej: Christopher Nolan"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Año
          </label>
          <input
            type="number"
            name="anio"
            min="1900"
            max="2099"
            className="input-field"
            value={formData.anio}
            onChange={handleChange}
            placeholder="2023"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración (minutos)
          </label>
          <input
            type="number"
            name="duracion"
            min="1"
            className="input-field"
            value={formData.duracion}
            onChange={handleChange}
            placeholder="120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio de Alquiler ($)
          </label>
          <input
            type="number"
            name="precio_alquiler"
            required
            min="0"
            step="0.01"
            className="input-field"
            value={formData.precio_alquiler}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL del Póster
        </label>
        <input
          type="url"
          name="poster_url"
          className="input-field"
          value={formData.poster_url}
          onChange={handleChange}
          placeholder="https://example.com/poster.jpg"
        />
        {formData.poster_url && (
          <div className="mt-2">
            <img
              src={formData.poster_url}
              alt="Preview"
              className="h-32 w-auto rounded-lg shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          rows="3"
          className="input-field"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Sinopsis de la película..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Total
          </label>
          <input
            type="number"
            name="stock_total"
            required
            min="0"
            className="input-field"
            value={formData.stock_total}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Disponible
          </label>
          <input
            type="number"
            name="stock_disponible"
            required
            min="0"
            className="input-field"
            value={formData.stock_disponible}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1"
        >
          {loading ? 'Guardando...' : movie ? 'Actualizar' : 'Crear'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn-secondary flex-1"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
