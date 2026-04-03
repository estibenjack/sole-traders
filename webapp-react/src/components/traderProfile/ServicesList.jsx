const ServicesList = ({services}) => {
  return (
    <>
      <h2 className="profile-section-title">Services</h2>
      {services.length > 0 ? (
        <div className="columns is-multiline mb-5">
          {services.map((service) => (
            <div key={service.id} className="column is-6-desktop">
              <div className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-card-footer">
                  <span className="price">
                    £{parseFloat(service.base_price).toFixed(2)}
                  </span>
                  <span className="pricing-type">{service.pricing_type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-services-card">
          <p className="no-services">
            This trader hasn't listed any services yet.
          </p>
        </div>
      )}
    </>
  );
};

export default ServicesList;
