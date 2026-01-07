import { useState, useEffect } from 'react';

export const MovieForm = ({ movie, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    stock_total: '',
    stock_disponible: '',
    precio_alquiler: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        titulo: movie.titulo || '',
        genero: movie.genero || '',
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
