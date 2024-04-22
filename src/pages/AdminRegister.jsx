import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate instead of Redirect
import '../LoginSignup.css';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Using useNavigate hook

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3001/owner/auth/register', {
        username,
        email,
        password,
      })
      .then(result => {
        console.log(result);
        navigate('/ownerlogin'); // Navigate to login page after successful signup
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="bodyContainer">
      <div className="loginSignupcontainer">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="user_icon" />
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={email_icon} alt="email_icon" />
                <input
                  type="text"
                  placeholder="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
              <button type="submit" className="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
