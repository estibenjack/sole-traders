import { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthNavbar = ({ variant }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Sole<span>Traders</span>
      </Link>

      <button
        className="nav-hamburger"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      <div className={`nav-right${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
        <Link to="/">Home</Link>
        {variant === 'login' && <Link to="/register">Create an account</Link>}
        {variant === 'register' && <Link to="/login">Log in</Link>}
      </div>
    </nav>
  );
};

export default AuthNavbar;
