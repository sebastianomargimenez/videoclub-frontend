import api from './api';

export const rentalsService = {
  // Crear nuevo alquiler
  createRental: async (peliculaId) => {
    const response = await api.post('/rentals', { pelicula_id: peliculaId });
    return response.data;
  },

  // Devolver película
  returnRental: async (rentalId) => {
    const response = await api.post(`/rentals/${rentalId}/return`);
    return response.data;
  },

  // Obtener alquileres activos del usuario
  getActiveRentals: async () => {
    const response = await api.get('/rentals/active');
    return response.data;
  },

  // Obtener todos los alquileres (solo admin)
  getAllRentals: async () => {
    const response = await api.get('/rentals');
    return response.data;
  }
};
