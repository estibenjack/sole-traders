import { Link } from 'react-router-dom';

const HomePage = () => {
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
          <Link to="/register" className="btn-outline">
            Join as a Trader
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
          <div className="column">
            <div className="feature-card">
              <div className="feature-icon home-mg">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3>Find the right trader</h3>
              <p>
                Find plumbers, electricians, carpenters and more — filter by
                trade type and region to find the right person for the job.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="feature-card">
              <div className="feature-icon home-cal">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h3>Book instantly</h3>
              <p>
                Submit a booking request directly to a trader in seconds. No
                account needed — just fill in your details and go.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="feature-card">
              <div className="feature-icon home-star">
                <i className="fa-solid fa-star"></i>
              </div>
              <h3>Rated traders</h3>
              <p>
                See star ratings from real customers before you book. Only hire
                traders you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="dark-section">
        <h2>Are you a tradesperson?</h2>
        <p>
          Join thousands of tradespeople already using Sole Traders to manage
          bookings and grow their business.
        </p>
        <Link to="/register" className="btn-primary">
          Create a free account
        </Link>
      </section>
    </>
  );
};

export default HomePage;