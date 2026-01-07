import { useState, useEffect } from 'react';
import { rentalsService } from '../services/rentals.service';
import toast from 'react-hot-toast';

export const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState({});

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await rentalsService.getActiveRentals();
      setRentals(response.data);
    } catch (error) {
      toast.error('Error al cargar los alquileres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleReturn = async (rentalId, titulo) => {
    setReturning({ ...returning, [rentalId]: true });
    try {
      await rentalsService.returnRental(rentalId);
      toast.success(`"${titulo}" devuelta exitosamente`);
      fetchRentals();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al devolver la película';
      toast.error(message);
    } finally {
      setReturning({ ...returning, [rentalId]: false });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Alquileres</h1>
        <p className="text-gray-600">Gestiona tus películas alquiladas</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Películas activas</h3>
            <p className="text-sm text-gray-600">Puedes tener hasta 3 películas alquiladas simultáneamente</p>
          </div>
          <div className="text-right">
            <span className={`text-3xl font-bold ${rentals.length >= 3 ? 'text-red-600' : 'text-primary-600'}`}>
              {rentals.length} / 3
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando alquileres...</p>
        </div>
      ) : rentals.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-6xl mb-4 block">📽️</span>
          <p className="text-xl text-gray-600 mb-2">No tienes películas alquiladas</p>
          <p className="text-gray-500">Ve al catálogo y alquila tu primera película</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map(rental => (
            <div key={rental.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {rental.pelicula.titulo}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Género:</span> {rental.pelicula.genero}
                    </p>
                    <p>
                      <span className="font-medium">Fecha de alquiler:</span>{' '}
                      {formatDate(rental.fecha_alquiler)}
                    </p>
                    <p>
                      <span className="font-medium">Precio:</span>{' '}
                      <span className="text-primary-600 font-semibold">
                        ${rental.pelicula.precio_alquiler}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleReturn(rental.id, rental.pelicula.titulo)}
                  disabled={returning[rental.id]}
                  className="btn-primary"
                >
                  {returning[rental.id] ? 'Devolviendo...' : 'Devolver'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
