import { Link } from 'react-router-dom';

const AuthNavbar = ({ variant }) => {
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
        {variant === 'login' && <Link to="/register">Create an account</Link>}
        {variant === 'register' && <Link to="/login">Log in</Link>}
      </div>
    </nav>
  );
};

export default AuthNavbar;
