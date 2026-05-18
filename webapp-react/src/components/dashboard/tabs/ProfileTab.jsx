import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { TRADE_TYPES, NI_REGIONS } from '../../../utils/constants';

const ProfileTab = ({ trader, refresh, showToast }) => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const editMode = searchParams.get('edit') === 'true';

  const [form, setForm] = useState({
    name: trader.name || '',
    email: trader.email || '',
    trade_type: trader.trade_type || '',
    region: trader.region || '',
    bio: trader.bio || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    axios
      .put(
        `http://localhost:3002/traders/${trader.id}`,
        {
          name: form.name,
          email: form.email,
          trade_type: form.trade_type || null,
          region: form.region || null,
          bio: form.bio || null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setSaving(false);
        setSearchParams({ tab: 'profile' });
        refresh();
        showToast('Profile updated successfully');
      })
      .catch((err) => {
        setSaving(false);
        if (err.response?.status === 409) {
          setError('That email is already in use.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      });
  };

  if (editMode) {
    return (
      <div className="dash-card profile-form-section">
        <div className="dash-card-header">
          <h2 className="profile-section-title">Edit Profile</h2>
          <button
            className="btn-outline-dark btn-sm"
            onClick={() => setSearchParams({ tab: 'profile' })}
          >
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
        </div>

        {error && <div className="toast toast-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label htmlFor="name" className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="trade_type">Trade type</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="trade_type"
                      id="trade_type"
                      value={form.trade_type}
                      onChange={handleChange}
                    >
                      <option value="">Select a trade type</option>
                      {TRADE_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="region">Region</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="region"
                      id="region"
                      value={form.region}
                      onChange={handleChange}
                    >
                      <option value="">Select a region</option>
                      {NI_REGIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="bio" className="label">Bio</label>
            <div className="control">
              <textarea
                name="bio"
                id="bio"
                className="textarea"
                rows="4"
                placeholder="Tell clients about yourself and your work..."
                value={form.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={saving}>
              <i className="fa-solid fa-floppy-disk"></i>{' '}
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <button
              type="button"
              className="btn-outline-dark"
              onClick={() => setSearchParams({ tab: 'profile' })}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="dash-card">
      <div className="dash-card-header profile-tab-header">
        <h2 className="profile-section-title">Your Info</h2>
        <button
          className="btn-primary"
          onClick={() => setSearchParams({ tab: 'profile', edit: 'true' })}
        >
          <i className="fa-solid fa-pen"></i> Edit profile
        </button>
      </div>

      <div className="profile-info-row">
        <span className="profile-info-label">Name</span>
        <span className="profile-info-value">{trader.name}</span>
      </div>
      <div className="profile-info-row">
        <span className="profile-info-label">Username</span>
        <span className="profile-info-value username">{trader.username}</span>
      </div>
      <div className="profile-info-row">
        <span className="profile-info-label">Email</span>
        <span className="profile-info-value">{trader.email}</span>
      </div>
      <div className="profile-info-row">
        <span className="profile-info-label">Trade type</span>
        <span className={`profile-info-value ${trader.trade_type ? '' : 'not-added-yet'}`}>
          {trader.trade_type || 'No trade type added'}
        </span>
      </div>
      <div className="profile-info-row">
        <span className="profile-info-label">Region</span>
        <span className={`profile-info-value ${trader.region ? '' : 'not-added-yet'}`}>
          {trader.region || 'No region added'}
        </span>
      </div>
      <div className="profile-info-row">
        <span className="profile-info-label">Bio</span>
        <span className={`profile-info-value ${trader.bio ? '' : 'not-added-yet'}`}>
          {trader.bio || 'No bio added'}
        </span>
      </div>
    </div>
  );
};

export default ProfileTab;
