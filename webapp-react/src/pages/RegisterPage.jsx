import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // normalise input before sending to api
    const normalisedForm = {
      name: form.name.trim().replace(/\b\w/g, (c) => c.toUpperCase()),
      username: form.username.trim().toLowerCase(),
      email: form.email.trim().toLowerCase(),
      password: form.password
    };

    axios
      .post('http://localhost:3002/register', normalisedForm)
      .then((res) => {
        if (res.data.status === 'success') {
          navigate('/login');
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setError('Username or email already exists. Please try again.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      });
  };

  return (
    <div className="register-login-section">
      <div className="register-login-card">
        <h1 className="register-login-heading">Create an account</h1>
        <p className="register-login-subheading">
          Join Sole Traders and start managing your bookings today.
        </p>

        {error && (
          <div className="toast toast-error">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">
              Full name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="name"
                name="name"
                placeholder="Joe Bloggs"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="username"
                name="username"
                placeholder="joebloggs7"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <div className="control">
              <input
                type="email"
                className="input"
                id="email"
                name="email"
                placeholder="joe@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                type="password"
                className="input"
                id="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary register-login-btn">
            Create account
          </button>
        </form>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
