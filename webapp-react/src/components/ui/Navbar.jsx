import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Sole<span>Traders</span>
      </Link>

      <button
        className="nav-hamburger"
        id="navToggle"
        aria-label="Toggle navigation"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className="nav-right" id="navMenu">
        <Link to="/">Home</Link>
        <Link to="/traders">Browse Traders</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
