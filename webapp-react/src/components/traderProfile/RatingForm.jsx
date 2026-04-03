import React from 'react';

const RatingForm = ({
  ratingSuccess,
  ratingError,
  handleRatingSubmit,
  ratingForm,
  handleRatingChange
}) => {
  return (
    <>
      <h2 className="profile-section-title">Leave a Rating</h2>
      <div className="profile-form-card rating-form-card">
        {ratingSuccess && (
          <div className="toast toast-success">
            <i className="fa-solid fa-circle-check"></i> Thanks for your rating!
          </div>
        )}
        {ratingError && (
          <div className="toast toast-error">
            <i className="fa-solid fa-circle-exclamation"></i> Something went
            wrong. Please try again.
          </div>
        )}

        <form onSubmit={handleRatingSubmit}>
          <div className="field">
            <label className="label" htmlFor="reviewer_name">
              Your name
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="reviewer_name"
                name="reviewer_name"
                placeholder="John Smith"
                value={ratingForm.reviewer_name}
                onChange={handleRatingChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Rating</label>
            <div className="star-input">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    name="rating"
                    id={`star${star}`}
                    value={star}
                    checked={ratingForm.rating === String(star)}
                    onChange={handleRatingChange}
                    required={star === 5}
                  />
                  <label htmlFor={`star${star}`}>
                    <i className="fa-solid fa-star"></i>
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <i className="fa-solid fa-star"></i> Submit Rating
          </button>
        </form>
      </div>
    </>
  );
};

export default RatingForm;
