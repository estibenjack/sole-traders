import { Link, useSearchParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  '#7dd3fc',
  '#86efac',
  '#fca5a5',
  '#d8b4fe',
  '#fdba74',
  '#6ee7b7',
  '#f9a8d4',
  '#a5b4fc',
  '#fde68a',
  '#94a3b8'
];

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { padding: 16, font: { size: 13 } }
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const pct = ((context.parsed / total) * 100).toFixed(1);
          return ` ${context.label}: ${context.parsed} bookings (${pct}%)`;
        }
      }
    }
  }
};

const OverviewTab = ({ services, bookings, avgRating, stats }) => {
  const [, setSearchParams] = useSearchParams();

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const recentBookings = bookings.slice(0, 4);

  const chartData = {
    labels: stats?.bookingsPerService?.map((s) => s.title) ?? [],
    datasets: [
      {
        data: stats?.bookingsPerService?.map((s) => s.booking_count) ?? [],
        backgroundColor: CHART_COLORS,
        borderWidth: 2,
        borderColor: '#f7f5f0'
      }
    ]
  };

  return (
    <>
      <div className="columns is-variable is-4 mb-5">
        {/* stat cards */}
        <div className="column is-4-desktop is-12-tablet stats-left">
          <div className="stat-card mb-3">
            <div className="stat-icon teal">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {stats?.bookingsPerService?.[0]?.title ?? '-'}
              </div>
              <div className="stat-label">Most booked service</div>
            </div>
          </div>

          <div className="stat-card mb-3">
            <div className="stat-icon purple">
              <i className="fa-solid fa-calendar"></i>
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {stats?.avgBookingsPerMonth ?? 0}
              </div>
              <div className="stat-label">Monthly average bookings</div>
            </div>
          </div>

          <div className="stat-card mb-3">
            <div className="stat-icon orange">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div className="stat-info">
              <div className="stat-value">{pendingCount}</div>
              <div className="stat-label">Pending bookings</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon gold">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {avgRating?.avg_rating ?? '-'}
              </div>
              <div className="stat-label">Average rating</div>
            </div>
          </div>
        </div>

        {/* doughnut chart */}
        <div className="column is-8-desktop is-12-tablet">
          <div className="dash-card dash-card-full-height">
            <div className="dash-card-header">
              <h3>
                <i
                  className="fa-solid fa-chart-pie chart-icon"
                  style={{ color: 'var(--accent)' }}
                ></i>{' '}
                Bookings by Service
              </h3>
            </div>
            {stats?.bookingsPerService?.length > 0 ? (
              <div className="chart-container">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="no-chart-container">
                <div className="empty-msg">
                  <i className="fa-solid fa-chart-pie"></i>
                  <p>No booking data yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* recent bookings preview */}
      <div className="dash-card">
        <div className="dash-card-header bookings-preview">
          <h3>
            <i className="fa-solid fa-clock"></i> Recent Bookings
          </h3>
          <button
            className="dash-link-btn"
            onClick={() => setSearchParams({ tab: 'bookings' })}
          >
            View all <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        {recentBookings.length > 0 ? (
          <div className="table-scroll-x">
            <table className="table is-fullwidth dash-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th className="hide-mobile">Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.client_name}</strong>
                      <br />
                      <small>{booking.client_email}</small>
                    </td>
                    <td className="hide-mobile">
                      {booking.service_title || '-'}
                    </td>
                    <td>
                      {new Date(booking.requested_date).toLocaleDateString(
                        'en-GB'
                      )}{' '}
                      at{' '}
                      {booking.requested_time
                        ? booking.requested_time.substring(0, 5)
                        : '-'}
                    </td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status[0].toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-msg">
            <i className="fa-solid fa-calendar-xmark"></i>
            <p>No bookings yet.</p>
          </div>
        )}
      </div>

      {/* services preview */}
      <div className="dash-card">
        <div className="dash-card-header services-preview">
          <h3>
            <i className="fa-solid fa-briefcase"></i> Your Services
          </h3>
          <button
            className="dash-link-btn"
            onClick={() => setSearchParams({ tab: 'services' })}
          >
            Manage <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        {services.length > 0 ? (
          <>
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="mini-service-card">
                <div>
                  <h4>{service.title}</h4>
                  <p>
                    {service.pricing_type === 'hourly'
                      ? 'Hourly rate'
                      : 'Fixed price'}
                  </p>
                </div>
                <span className="price">
                  £{parseFloat(service.base_price).toFixed(2)}
                </span>
              </div>
            ))}
            {services.length > 3 && (
              <p className="services-overflow-link">
                + {services.length - 3} more —{' '}
                <button
                  className="dash-link-btn"
                  onClick={() => setSearchParams({ tab: 'services' })}
                >
                  view all
                </button>
              </p>
            )}
          </>
        ) : (
          <div className="empty-msg">
            <i className="fa-solid fa-plus-circle"></i>
            <p>No services listed yet.</p>
            <button
              className="btn-primary btn-sm"
              onClick={() => setSearchParams({ tab: 'services' })}
            >
              Add your first service
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OverviewTab;
