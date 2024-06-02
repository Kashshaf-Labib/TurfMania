import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginSignup.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

function SystemAdminLogin() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      if (username === "Admin" && password === "Admin") {
        setLoading(false); 
        localStorage.setItem("systemAdmin", JSON.stringify({ username }));
        navigate("/systemadmindashboard");
      } else {
        setLoading(false); 
        setError("Invalid credentials");
      }
    } catch (err) {
      setLoading(false); 
      setError("Something went wrong");
    }
  };

  return (
    <div className="bodyContainer">
      <div className="loginSignupcontainer">
        <div className="header">
          <div className="text">System Admin Login</div>
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
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="password_icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="submit-container">
              <button type="submit" className="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SystemAdminLogin;
