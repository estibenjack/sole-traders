import { Link, useSearchParams } from 'react-router-dom';

const DashboardHeader = ({ trader, services, bookings }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  const setTab = (tab) => setSearchParams({ tab });

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-top">
        <div>
          <div className="title-badge-container">
            <h1>{trader.name}</h1>
            <p className="dashboard-username">{trader.username}</p>
          </div>
          <div className="region-username-container">
            <p>
              <i className="fa-solid fa-location-dot"></i>{' '}
              {trader.region || 'No region added'}
            </p>
            {trader.trade_type && (
              <span className="trade-badge">{trader.trade_type}</span>
            )}
          </div>
        </div>
        <Link
          to={`/traders/${trader.id}`}
          className="btn-outline btn-view-public-profile"
        >
          <i className="fa-solid fa-eye"></i> View public profile
        </Link>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setTab('overview')}
        >
          <i className="fa-solid fa-gauge"></i> Overview
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setTab('profile')}
        >
          <i className="fa-solid fa-user"></i> Profile
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setTab('services')}
        >
          <i className="fa-solid fa-briefcase"></i> Services
          {services.length > 0 && <span>{services.length}</span>}
        </button>
        <button
          className={`dashboard-tab ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setTab('bookings')}
        >
          <i className="fa-solid fa-calendar-check"></i> Bookings
          {pendingCount > 0 && <span>{pendingCount}</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
