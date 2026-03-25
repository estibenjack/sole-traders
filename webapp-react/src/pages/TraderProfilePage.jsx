import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TraderProfilePage = () => {
  const { id } = useParams();

  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/traders/${id}`)
      .then((traderRes) => {
        setTrader(traderRes.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching trader profile:', err);
        setError(`Failed to load trader profile with ID: ${id}`);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!trader) return <p>Trader not found</p>;

  return (
    <div className="error-404-container">
      <div className="error-404">
        <h1>Trader profile for {trader.name} coming soon...</h1>
        <p>Check back in a bit</p>
      </div>
    </div>
  );
};

export default TraderProfilePage;
