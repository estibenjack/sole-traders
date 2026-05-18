import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../utils/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/login`, form)
      .then((res) => {
        if (res.data.status === 'success') {
          login(res.data.result, res.data.token);
          navigate('/dashboard');
        }
      })
      .catch(() => {
        setError('Invalid username or password. Please try again.');
      });
  };

  return (
    <div className="register-login-section">
      <div className="register-login-card">
        <h1 className="register-login-heading">Log in</h1>
        <p className="register-login-subheading">
          Log in below to access your account.
        </p>

        {error && (
          <div className="toast toast-error">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
                value={form.username}
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
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary register-login-btn">
            Log in
          </button>
        </form>

        <p className="register-login-link">
          Haven't signed up yet? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
