import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="page-header dark-section">
      <h1>Welcome back, {user?.name}</h1>
      <p>Your dashboard is coming soon.</p>
    </div>
  );
};

export default DashboardPage;
