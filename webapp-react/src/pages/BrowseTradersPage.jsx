import { useState, useEffect } from 'react';
import axios from 'axios';
import TraderCard from '../components/traders/TraderCard';

const BrowseTradersPage = () => {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTradeType, setSelectedTradeType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3002/traders')
      .then((res) => {
        setTraders(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching traders:', err);
        setError('Failed to load traders');
        setLoading(false);
      });
  }, []);

  // get unique trade types and regions from traders array
  const tradeTypes = [
    ...new Set(traders.map((t) => t.trade_type).filter(Boolean))
  ].sort();
  const regions = [
    ...new Set(traders.map((t) => t.region).filter(Boolean))
  ].sort();

  // filter traders by selected vals
  const filteredTraders = traders.filter((trader) => {
    const matchesTradeType = selectedTradeType
      ? trader.trade_type === selectedTradeType
      : true;
    const matchesRegion = selectedRegion
      ? trader.region === selectedRegion
      : true;
    return matchesTradeType && matchesRegion;
  });

  const clearFilters = () => {
    setSelectedTradeType('');
    setSelectedRegion('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* page header */}
      <div className="page-header dark-section">
        <h1>Browse Traders</h1>
        <p>Find a trusted tradesperson in your area</p>
      </div>

      {/* filter bar */}
      <section className="section pt-4 pb-4">
        <div className="filter-bar container">
          <div className="filter-form">
            <div className="filter-group">
              <label htmlFor="trade_type" className="label">
                Trade type
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="trade_type"
                    value={selectedTradeType}
                    onChange={(e) => setSelectedTradeType(e.target.value)}
                  >
                    <option value="">All trades</option>
                    {tradeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="filter-group">
              <label className="label" htmlFor="region">
                Region
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="region"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="">All regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="filter-actions">
              {/*
              removing filter button - it's handled already bc of the onChange on the dropdowns
              <button className="btn-primary" onClick={() => {}}>
                <i className="fa-solid fa-filter"></i> Filter
              </button> */}
              <button className="btn-outline-dark" onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* results */}
      <div className="results-section pb-4">
        <section className="section pt-0 pb-2">
          <div className="container">
            <p className="results-count">
              Showing <strong>{filteredTraders.length}</strong> trader
              {filteredTraders.length !== 1 ? 's' : ''}
            </p>
          </div>
        </section>

        <section className="section pt-2 pb-2">
          <div className="container">
            {filteredTraders.length > 0 ? (
              <div className="columns is-multiline">
                {filteredTraders.map((trader) => (
                  <div
                    key={trader.id}
                    className="column is-4-desktop is-6-tablet is-12-mobile"
                  >
                    <TraderCard trader={trader} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-msg browse-traders">
                <p>No traders found matching your search.</p>
                <button className="btn-outline-dark" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BrowseTradersPage;
