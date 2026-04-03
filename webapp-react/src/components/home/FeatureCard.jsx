const FeatureCard = ({ icon, iconClass, title, description }) => {
  return (
    <div className="column">
      <div className="feature-card">
        <div className={`feature-icon ${iconClass}`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
