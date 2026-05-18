import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';

const BookingsTab = ({ bookings, refresh, showToast }) => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const filteredBookings =
    statusFilter === 'all'
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const updateStatus = (id, status) => {
    axios
      .put(
        `${API_URL}/bookings/${id}/status`,
        { status },
        authHeader
      )
      .then(() => {
        refresh();
        showToast(
          status === 'confirmed' ? 'Booking confirmed' : 'Booking rejected'
        );
      });
  };

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length
  };

  const setFilter = (val) => {
    const params = { tab: 'bookings' };
    if (val !== 'all') params.status = val;
    setSearchParams(params);
  };

  return (
    <>
      <div className="booking-filter">
        {['all', 'pending', 'confirmed', 'rejected'].map((val) => (
          <button
            key={val}
            className={`filter-tab ${statusFilter === val ? 'active' : ''}`}
            onClick={() => setFilter(val)}
          >
            {val.charAt(0).toUpperCase() + val.slice(1)} ({counts[val]})
          </button>
        ))}
      </div>

      <div className="dash-card">
        {filteredBookings.length > 0 ? (
          <div className="table-scroll-x">
            <table className="table is-fullwidth dash-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th className="hide-mobile">Service</th>
                  <th className="hide-mobile">Location</th>
                  <th>Date &amp; Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.client_name}</strong>
                      <br />
                      <small>{booking.client_email}</small>
                    </td>
                    <td className="hide-mobile">{booking.service_title || '—'}</td>
                    <td className="hide-mobile">{booking.job_location}</td>
                    <td>
                      {new Date(booking.requested_date).toLocaleDateString(
                        'en-GB'
                      )}
                      <br />
                      <small>
                        {booking.requested_time
                          ? booking.requested_time.substring(0, 5)
                          : '—'}
                      </small>
                    </td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status[0].toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'pending' ? (
                        <div className="service-actions">
                          <button
                            className="btn-accept"
                            onClick={() =>
                              updateStatus(booking.id, 'confirmed')
                            }
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() =>
                              updateStatus(booking.id, 'rejected')
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ) : (
                        <span className="no-actions-text">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-msg">
            <i className="fa-solid fa-calendar-xmark"></i>
            <p>
              No {statusFilter !== 'all' ? statusFilter : ''} bookings found.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingsTab;
