import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileHero from '../components/traderProfile/ProfileHero';
import AboutSection from '../components/traderProfile/AboutSection';
import ServicesList from '../components/traderProfile/ServicesList';
import BookingForm from '../components/traderProfile/BookingForm';
import RatingForm from '../components/traderProfile/RatingForm';
import ReviewsList from '../components/traderProfile/ReviewsList';

const TraderProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // state variables
  const [trader, setTrader] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [services, setServices] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    client_name: '',
    client_email: '',
    service_id: '',
    job_location: '',
    requested_date: '',
    requested_time: '',
    job_description: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [ratingForm, setRatingForm] = useState({
    reviewer_name: '',
    rating: ''
  });
  const [ratingSuccess, setRatingSuccess] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3002/traders/${id}`),
      axios.get(`http://localhost:3002/ratings/trader/${id}/average`),
      axios.get(`http://localhost:3002/services/trader/${id}`),
      axios.get(`http://localhost:3002/ratings/trader/${id}`)
    ])
      .then(([traderRes, avgRatingRes, servicesRes, reviewsRes]) => {
        setTrader(traderRes.data.result);
        setAvgRating(avgRatingRes.data.result);
        setServices(servicesRes.data.result);
        setReviews(reviewsRes.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching trader profile:', err);
        setError(`Failed to load trader profile with ID: ${id}`);
        setLoading(false);
      });
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3002/bookings', {
        ...bookingForm,
        trader_id: id
      })
      .then(() => {
        setBookingSuccess(true);
        setBookingError(false);
        setBookingForm({
          client_name: '',
          client_email: '',
          service_id: '',
          job_location: '',
          requested_date: '',
          requested_time: '',
          job_description: ''
        });
      })
      .catch(() => {
        setBookingError(true);
        setBookingSuccess(false);
      });
  };

  // handlers
  const handleRatingChange = (e) => {
    setRatingForm({ ...ratingForm, [e.target.name]: e.target.value });
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3002/ratings', {
        trader_id: id,
        reviewer_name: ratingForm.reviewer_name,
        rating: ratingForm.rating
      })
      .then(() => {
        setRatingSuccess(true);
        setRatingError(false);
        setRatingForm({ reviewer_name: '', rating: '' });
      })
      .catch(() => {
        setRatingError(true);
        setRatingSuccess(false);
      });
  };

  // early returns
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!trader) return <p>Trader not found</p>;

  // main jsx return
  return (
    <>
      {/* back link */}
      <div className="back-link-container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
      </div>

      {/* profile hero */}
      <ProfileHero trader={trader} avgRating={avgRating} />
      {/* main content */}
      <div className="main-content-container">
        <div className="main-content">
          {/* about section */}
          <AboutSection traderBio={trader.bio} />

          {/* services section */}
          <ServicesList services={services} />

          {/* booking request form */}
          <BookingForm
            bookingForm={bookingForm}
            handleBookingChange={handleBookingChange}
            handleBookingSubmit={handleBookingSubmit}
            bookingSuccess={bookingSuccess}
            bookingError={bookingError}
            services={services}
          />

          {/* star rating form */}
          <RatingForm
            ratingSuccess={ratingSuccess}
            ratingError={ratingError}
            handleRatingSubmit={handleRatingSubmit}
            ratingForm={ratingForm}
            handleRatingChange={handleRatingChange}
          />
          {/* collapsible reviews section */}
          <ReviewsList reviews={reviews} />
        </div>
      </div>
    </>
  );
};

export default TraderProfilePage;
