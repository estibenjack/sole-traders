import { Link } from 'react-router-dom';

const Navbar = () => {
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

      {/* add logged-in links like dashboard and in/out later */}
      <div className="nav-right" id="navMenu">
        <Link to="/">Home</Link>
        <Link to="/traders">Browse Traders</Link>
      </div>
    </nav>
  );
};

export default Navbar;
