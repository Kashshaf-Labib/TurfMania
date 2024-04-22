import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../LoginSignup.css';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

function AdminLogin() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Sending request:', { username, password });
      const res = await axios.post('http://localhost:3001/owner/auth/login', {
        username,
        password,
      });
      setLoading(false);
      console.log('Response:', res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/admin/dashboard/upload');
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="bodyContainer">
      <div className="loginSignupcontainer">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={email_icon} alt="email_icon" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="password_icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="submit-container">
              <button type="submit" className="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              {error && <div className="error-message">{error}</div>}
              <div className="signup-link  text-red-900">
                Donot have an account?{' '}
                <Link to="/owner/auth/register">Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
