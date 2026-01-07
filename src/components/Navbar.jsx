import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎬</span>
              <span className="text-xl font-bold text-primary-600">Videoclub</span>
            </Link>

            {isAuthenticated() && (
              <div className="hidden md:flex ml-10 space-x-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Películas
                </Link>
                <Link
                  to="/my-rentals"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Mis Alquileres
                </Link>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Administración
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Hola, <span className="font-semibold">{user?.nombre}</span>
                  </span>
                  {isAdmin() && (
                    <span className="badge-info">Admin</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="btn-secondary text-sm">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
