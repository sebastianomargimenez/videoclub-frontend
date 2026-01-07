import api from './api';

export const moviesService = {
  // Obtener todas las películas
  getAllMovies: async () => {
    const response = await api.get('/movies');
    return response.data;
  },

  // Obtener película por ID
  getMovieById: async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  // Crear nueva película (solo admin)
  createMovie: async (movieData) => {
    const response = await api.post('/movies', movieData);
    return response.data;
  },

  // Actualizar película (solo admin)
  updateMovie: async (id, movieData) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  },

  // Eliminar película (solo admin)
  deleteMovie: async (id) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  }
};
