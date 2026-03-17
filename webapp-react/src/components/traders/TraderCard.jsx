import { Link } from 'react-router-dom';

const TraderCard = ({ trader }) => {
  return (
    <div className="trader-card">
      {/* card header */}
      <div className="trader-card-header">
        <div className="trader-avatar">
          {trader.name.charAt(0).toUpperCase()}
        </div>
        <div className="trader-card-title">
          <h2>{trader.name}</h2>
          {/* using {condition && () structure} */}
          {(trader.trade_type || trader.avg_rating) && (
            <div className="trader-badge-and-rating">
              {trader.trade_type && (
                <span className="trade-badge">{trader.trade_type}</span>
              )}
              {trader.avg_rating && (
                <span className="rating-badge">
                  <i className="fa-solid fa-star"></i> {trader.avg_rating}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* card body */}
      <div className="trader-card-body">
        {/* using condition && () : () structure */}
        {trader.region ? (
          <p className="trader-region">
            <i className="fa-solid fa-location-dot"></i> {trader.region}
          </p>
        ) : (
          <p className="trader-region no-region">
            <i className="fa-solid fa-location-dot"></i>{' '}
            <span>No location available</span>
          </p>
        )}
        {trader.bio ? (
          <p className="trader-bio">
            {trader.bio.length > 100
              ? trader.bio.substring(0, 100) + '...'
              : trader.bio}
          </p>
        ) : (
          <p className="no-bio">This trader hasn't added a bio yet.</p>
        )}
      </div>

      {/* card footer */}
      <div className="trader-card-footer">
        <Link to={`/traders/${trader.id}`} className="btn-primary btn-full">
          View Profile <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default TraderCard;
