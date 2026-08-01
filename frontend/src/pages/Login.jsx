
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../config/api";
import "../styles/auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-form login-form" onSubmit={handleSubmit}>

        <h2>Welcome Back 👋</h2>

        <p className="auth-subtitle">
          Sign in to continue shopping
        </p>

        {/* Email */}

        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

        {/* Password */}

        <div className="input-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        {/* Forgot Password */}

        <div className="login-options">

          <Link
            to="/forgot-password"
            className="forgot-link"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}

        <button
          className="login-btn"
          type="submit"
        >
          Login
        </button>

        {/* Divider */}

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Magic Link */}

        <Link
          to="/magic-link"
          className="magic-link-btn"
        >
          🔗 Continue with Magic Link
        </Link>

        {/* Register */}

        <p className="register-text">

          Don't have an account?{" "}

          <Link to="/register">

            Register →

          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;