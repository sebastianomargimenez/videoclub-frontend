import { useState, useEffect } from 'react';
import { moviesService } from '../services/movies.service';
import { MovieCard } from '../components/MovieCard';
import toast from 'react-hot-toast';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

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

  // Obtener géneros únicos
  const genres = [...new Set(movies.map(movie => movie.genero))];

  // Filtrar películas
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || movie.genero === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Películas</h1>
        <p className="text-gray-600">Explora nuestra colección de películas disponibles</p>
      </div>

      {/* Filtros */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar por título
            </label>
            <input
              type="text"
              placeholder="Buscar película..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por género
            </label>
            <select
              className="input-field"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Todos los géneros</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de películas */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando películas...</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No se encontraron películas</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Mostrando {filteredMovies.length} de {movies.length} películas
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRentSuccess={fetchMovies}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
