import { useState, useEffect } from 'react';
import { moviesService } from '../services/movies.service';
import { MovieForm } from '../components/MovieForm';
import toast from 'react-hot-toast';

export const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await moviesService.getAllMovies();
      setMovies(response.data);
    } catch (error) {
      toast.error('Error al cargar las películas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleCreate = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingMovie) {
        await moviesService.updateMovie(editingMovie.id, formData);
        toast.success('Película actualizada exitosamente');
      } else {
        await moviesService.createMovie(formData);
        toast.success('Película creada exitosamente');
      }
      setShowForm(false);
      setEditingMovie(null);
      fetchMovies();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al guardar la película';
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (!confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await moviesService.deleteMovie(id);
      toast.success('Película eliminada exitosamente');
      fetchMovies();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al eliminar la película';
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona el catálogo de películas</p>
        </div>
        {!showForm && (
          <button onClick={handleCreate} className="btn-primary">
            + Nueva Película
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingMovie ? 'Editar Película' : 'Nueva Película'}
          </h2>
          <MovieForm
            movie={editingMovie}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={formLoading}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando películas...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-6xl mb-4 block">🎬</span>
          <p className="text-xl text-gray-600 mb-2">No hay películas en el catálogo</p>
          <p className="text-gray-500">Crea tu primera película</p>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Género
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{movie.titulo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{movie.genero}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${movie.stock_disponible > 0 ? 'badge-success' : 'badge-danger'}`}>
                        {movie.stock_disponible} / {movie.stock_total}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-primary-600">
                        ${movie.precio_alquiler}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(movie)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id, movie.titulo)}
                        disabled={deletingId === movie.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deletingId === movie.id ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
