import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { rentalsService } from '../services/rentals.service';
import toast from 'react-hot-toast';

export const MovieCard = ({ movie, onRentSuccess, onViewDetails }) => {
  const { isAuthenticated } = useAuth();
  const [renting, setRenting] = useState(false);

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
    } catch (error) {
      const message = error.response?.data?.message || 'Error al alquilar la película';
      toast.error(message);
    } finally {
      setRenting(false);
    }
  };

  const isAvailable = movie.stock_disponible > 0;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card hover:shadow-xl transition-all duration-200 overflow-hidden p-0">
      {/* Póster de la película */}
      <div
        className="relative h-64 bg-gradient-to-br from-primary-500 to-primary-700 cursor-pointer group"
        onClick={() => onViewDetails && onViewDetails(movie)}
      >
        {movie.poster_url && !imageError ? (
          <img
            src={movie.poster_url}
            alt={movie.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl">🎬</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary-600 px-4 py-2 rounded-lg font-medium">
            Ver detalles
          </span>
        </div>
        {/* Precio en esquina superior derecha */}
        <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
          ${movie.precio_alquiler}
        </div>
      </div>

      {/* Información de la película */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{movie.titulo}</h3>
        <p className="text-sm text-gray-600 mb-3">{movie.genero}</p>

        {movie.anio && (
          <p className="text-xs text-gray-500 mb-2">Año: {movie.anio}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Stock:</span>
            <span className={`badge ${isAvailable ? 'badge-success' : 'badge-danger'}`}>
              {movie.stock_disponible} / {movie.stock_total}
            </span>
          </div>
        </div>

        <button
          onClick={handleRent}
          disabled={!isAvailable || renting}
          className={`w-full ${isAvailable ? 'btn-primary' : 'btn-secondary'}`}
        >
          {renting ? 'Alquilando...' : isAvailable ? 'Alquilar' : 'No disponible'}
        </button>
      </div>
    </div>
  );
};
