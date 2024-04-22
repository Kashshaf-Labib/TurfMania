import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const LogOut = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/user/auth/logout');
      // Clear any user data from local storage if needed
      localStorage.clear();
      // Redirect to the login page or any other desired route
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogOut;
