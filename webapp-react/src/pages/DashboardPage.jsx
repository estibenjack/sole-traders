import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/api';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import ProfileTab from '../components/dashboard/tabs/ProfileTab';
import ServicesTab from '../components/dashboard/tabs/ServicesTab';
import BookingsTab from '../components/dashboard/tabs/BookingsTab';

const DashboardPage = () => {
  const { user, token } = useAuth();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [trader, setTrader] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState(null);

  const refresh = () => setRefreshKey((k) => k + 1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (!user?.id) return;
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
      setLoading(true);
      try {
        const [traderRes, servicesRes, bookingsRes, ratingRes, statsRes] =
          await Promise.all([
            axios.get(`${API_URL}/traders/${user.id}/private`, authHeader),
            axios.get(`${API_URL}/services/trader/${user.id}`),
            axios.get(`${API_URL}/bookings/trader/${user.id}`, authHeader),
            axios.get(`${API_URL}/ratings/trader/${user.id}/average`),
            axios.get(`${API_URL}/bookings/trader/${user.id}/stats`, authHeader)
          ]);
        setTrader(traderRes.data.result);
        setServices(servicesRes.data.result);
        setBookings(bookingsRes.data.result);
        setAvgRating(ratingRes.data.result);
        setStats(statsRes.data.result);
        setLoading(false);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard');
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, token, refreshKey]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">{error}</p>;
  if (!trader) return null;

  return (
    <>
      <DashboardHeader
        trader={trader}
        services={services}
        bookings={bookings}
      />
      <div className="dashboard-body">
        {toast && (
          <div className="toast toast-success">
            <i className="fa-solid fa-circle-check"></i> {toast}
          </div>
        )}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <OverviewTab
              services={services}
              bookings={bookings}
              avgRating={avgRating}
              stats={stats}
            />
          )}
          {activeTab === 'profile' && (
            <ProfileTab
              trader={trader}
              refresh={refresh}
              showToast={showToast}
            />
          )}
          {activeTab === 'services' && (
            <ServicesTab
              trader={trader}
              services={services}
              refresh={refresh}
              showToast={showToast}
            />
          )}
          {activeTab === 'bookings' && (
            <BookingsTab
              bookings={bookings}
              refresh={refresh}
              showToast={showToast}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
