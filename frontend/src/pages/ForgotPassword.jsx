import React, { useState } from "react";
import API_URL from "../config/api";
// import { backendURL } from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // const res = await fetch("/api/auth/forgot-password", {
        const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#09090b",
    padding: "20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "#18181b",
    padding: "35px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    textAlign: "center",
  };

  const headingStyle = {
    color: "#f97316",
    marginBottom: "15px",
    fontSize: "2rem",
  };

  const textStyle = {
    color: "#a1a1aa",
    marginBottom: "25px",
    lineHeight: "1.6",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    background: "#27272a",
    color: "#fff",
    border: "1px solid #3f3f46",
    borderRadius: "8px",
    outline: "none",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <form style={cardStyle} onSubmit={submitHandler}>
        <h2 style={headingStyle}>Forgot Password</h2>

        <p style={textStyle}>
          Enter your registered email address. We'll send you a password reset
          link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;