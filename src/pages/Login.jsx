import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email: email,
        password: password
      });

      console.log("Login response:", response.data);

      // Store JWT token
      localStorage.setItem(
        "healthToken",
        response.data.token
      );

      // Store logged-in user
      localStorage.setItem(
        "healthUser",
        JSON.stringify(response.data.user)
      );

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
          "Login failed."
        );
      } else {
        alert(
          "Cannot connect to backend. Make sure the backend server is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🩺
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          AI Personal Health Assistant
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;