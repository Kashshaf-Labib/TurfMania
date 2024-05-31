import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginSignup.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { UserContext } from "../UserContext";

function Login() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted
    try {
      console.log("Sending request:", { username, password }); // Debugging: Log the request body
      const res = await axios.post("http://localhost:3001/user/auth/login", {
        username,
        password,
      });
      setLoading(false); // Set loading state to false after API call
      console.log("Response:", res.data); // Debugging: Log the response data
      setUser(res.data); // Set user data in context
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setLoading(false); // Set loading state to false if API call fails
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
            <div className="signup-link  text-red-900 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-red-600 font-semibold"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
