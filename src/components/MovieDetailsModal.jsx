import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { rentalsService } from '../services/rentals.service';
import toast from 'react-hot-toast';

export const MovieDetailsModal = ({ movie, onClose, onRentSuccess }) => {
  const { isAuthenticated } = useAuth();
  const [renting, setRenting] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!movie) return null;

  const handleRent = async () => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para alquilar películas');
      return;
    }

    setRenting(true);
    try {
      await rentalsService.createRental(movie.id);
      toast.success(`"${movie.titulo}" alquilada exitosamente`);
      if (onRentSuccess) {
        onRentSuccess();
      }
      onClose();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al alquilar la película';
      toast.error(message);
    } finally {
      setRenting(false);
    }
  };

  const isAvailable = movie.stock_disponible > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:flex">
          {/* Póster */}
          <div className="md:w-1/3 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            {movie.poster_url && !imageError ? (
              <img
                src={movie.poster_url}
                alt={movie.titulo}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-9xl">🎬</span>
            )}
          </div>

          {/* Detalles */}
          <div className="md:w-2/3 p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{movie.titulo}</h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="badge badge-info">{movie.genero}</span>
                  {movie.anio && (
                    <span className="text-gray-600 text-sm">{movie.anio}</span>
                  )}
                  {movie.duracion && (
                    <span className="text-gray-600 text-sm">{movie.duracion} min</span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold ml-4"
              >
                ✕
              </button>
            </div>

            {/* Director */}
            {movie.director && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Director:</span> {movie.director}
                </p>
              </div>
            )}

            {/* Descripción */}
            {movie.descripcion && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sinopsis</h3>
                <p className="text-gray-700 leading-relaxed">{movie.descripcion}</p>
              </div>
            )}

            {/* Información de alquiler */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Precio de alquiler</p>
                  <p className="text-2xl font-bold text-primary-600">${movie.precio_alquiler}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Disponibilidad</p>
                  <span className={`badge text-base ${isAvailable ? 'badge-success' : 'badge-danger'}`}>
                    {movie.stock_disponible} / {movie.stock_total} disponibles
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={handleRent}
                disabled={!isAvailable || renting}
                className={`flex-1 ${isAvailable ? 'btn-primary' : 'btn-secondary'}`}
              >
                {renting ? 'Alquilando...' : isAvailable ? '🎬 Alquilar ahora' : 'No disponible'}
              </button>
              <button onClick={onClose} className="btn-secondary px-8">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
