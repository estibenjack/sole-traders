import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="error-404-container">
      <div className="error-404">
        <p className="error-code">404</p>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
