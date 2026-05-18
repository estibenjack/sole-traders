import { Link } from 'react-router-dom';
import FeatureCard from '../components/home/FeatureCard';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* hero */}
      <section className="hero-section">
        <span className="slogan">Trusted by thousands</span>
        <h1>Find skilled traders in your area</h1>
        <p>
          Browse thousands of verified tradespeople and get the job done right.
        </p>
        <div className="hero-actions">
          <Link to="/traders" className="btn-primary">
            Browse Traders
          </Link>
          <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn-outline">
            {isAuthenticated ? 'Go to Dashboard' : 'Join as a Trader'}
          </Link>
        </div>
      </section>

      {/* stats bar */}
      <div className="stats">
        <p>
          <i className="fa-solid fa-location-dot"></i> <span>453,461</span>{' '}
          searches made in the last 30 days
        </p>
      </div>

      {/* features */}
      <section className="features">
        <p className="features-question">Why Sole Traders?</p>
        <h2>Everything you need, done right</h2>
        <div className="columns is-multiline is-centered">
          <FeatureCard
            icon="fa-magnifying-glass"
            iconClass="home-mg"
            title="Find the right trader"
            description="Find plumbers, electricians, carpenters and more — filter by trade type and region to find the right person for the job."
          />
          <FeatureCard
            icon="fa-calendar-days"
            iconClass="home-cal"
            title="Book instantly"
            description="Submit a booking request directly to a trader in seconds. No account needed — just fill in your details and go."
          />
          <FeatureCard
            icon="fa-star"
            iconClass="home-star"
            title="Rated traders"
            description="See star ratings from real customers before you book. Only hire traders you can trust."
          />
        </div>
      </section>

      {/* cta */}
      <section className="dark-section">
        <h2>Are you a tradesperson?</h2>
        <p>
          Join thousands of tradespeople already using Sole Traders to manage
          bookings and grow their business.
        </p>
        <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn-primary">
          {isAuthenticated ? 'Go to Dashboard' : 'Create a free account'}
        </Link>
      </section>
    </>
  );
};

export default HomePage;
