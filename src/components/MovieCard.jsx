import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { rentalsService } from '../services/rentals.service';
import toast from 'react-hot-toast';

export const MovieCard = ({ movie, onRentSuccess }) => {
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

  return (
    <div className="card hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{movie.titulo}</h3>
          <p className="text-sm text-gray-600 mb-2">{movie.genero}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            ${movie.precio_alquiler}
          </p>
        </div>
      </div>

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
  );
};
