const BookingForm = ({
  bookingForm,
  handleBookingChange,
  services,
  handleBookingSubmit,
  bookingSuccess,
  bookingError
}) => {
  return (
    <>
      <h2 className="profile-section-title">Request a Booking</h2>
      <div className="profile-form-card">
        <form onSubmit={handleBookingSubmit}>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="client_name">
                  Your name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="client_name"
                    name="client_name"
                    placeholder="John Smith"
                    value={bookingForm.client_name}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="client_email">
                  Your email
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    id="client_email"
                    name="client_email"
                    placeholder="john@example.com"
                    value={bookingForm.client_email}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="service_id">
              Service
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  name="service_id"
                  id="service_id"
                  value={bookingForm.service_id}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} — £
                      {parseFloat(service.base_price).toFixed(2)} (
                      {service.pricing_type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="job_location">
              Job location
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="job_location"
                name="job_location"
                placeholder="12 Main Street, Belfast"
                value={bookingForm.job_location}
                onChange={handleBookingChange}
                required
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="requested_date">
                  Requested date
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    id="requested_date"
                    name="requested_date"
                    value={bookingForm.requested_date}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="requested_time">
                  Requested time
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="time"
                    id="requested_time"
                    name="requested_time"
                    value={bookingForm.requested_time}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="job_description">
              Job description
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id="job_description"
                name="job_description"
                placeholder="Briefly describe the work you need done..."
                rows="4"
                value={bookingForm.job_description}
                onChange={handleBookingChange}
                required
              />
            </div>
          </div>

          {bookingSuccess && (
            <div className="toast toast-success">
              <i className="fa-solid fa-circle-check"></i> Your booking request
              has been submitted successfully!
            </div>
          )}
          {bookingError && (
            <div className="toast toast-error">
              <i className="fa-solid fa-circle-exclamation"></i> Something went
              wrong. Please try again.
            </div>
          )}

          <button type="submit" className="btn-primary">
            <i className="fa-solid fa-paper-plane"></i> Submit Booking Request
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
