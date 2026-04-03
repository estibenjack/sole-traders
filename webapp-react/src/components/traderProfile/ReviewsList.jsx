const ReviewsList = ({ reviews }) => {
  return (
    <>
      {reviews.length > 0 && (
        <details className="reviews-section profile-form-card">
          <summary className="reviews-summary">
            <span>
              <i className="fa-solid fa-star"></i> Reviews ({reviews.length})
            </span>
            <i className="fa-solid fa-chevron-down chevron-icon"></i>
          </summary>
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-row">
                <div className="review-left">
                  <div className="reviewer-avatar">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-info">
                    <span className="reviewer-name">
                      {review.reviewer_name}
                    </span>
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star ${i <= review.rating ? 'star-filled' : 'star-empty'}`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </>
  );
};

export default ReviewsList;
