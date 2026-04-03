const ProfileHero = ({ trader, avgRating }) => {
  return (
    <div className="profile-hero">
      <div className="profile-content">
        <div className="profile-hero-content">
          <div className="profile-avatar">
            {trader.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-hero-info">
            <h1>{trader.name}</h1>
            <div className="profile-hero-meta">
              {trader.trade_type && (
                <span className="trade-type-badge">{trader.trade_type}</span>
              )}
              {trader.region && (
                <span className="region">
                  <i className="fa-solid fa-location-dot"></i> {trader.region}
                </span>
              )}
              {avgRating && avgRating.avg_rating ? (
                <span className="rating-badge">
                  <i className="fa-solid fa-star"></i> {avgRating.avg_rating} (
                  {avgRating.total_ratings} review
                  {avgRating.total_ratings !== 1 ? 's' : ''})
                </span>
              ) : (
                <span className="region">No reviews yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
