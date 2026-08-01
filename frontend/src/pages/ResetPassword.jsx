import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../config/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/login");
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
    background: "#09090b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const boxStyle = {
    width: "100%",
    maxWidth: "450px",
    background: "#18181b",
    padding: "35px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,.5)",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #3f3f46",
    background: "#27272a",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#f97316",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <form style={boxStyle} onSubmit={handleSubmit}>
        <h2
          style={{
            color: "#f97316",
            marginBottom: "15px",
          }}
        >
          Reset Password
        </h2>

        <p
          style={{
            color: "#a1a1aa",
            marginBottom: "25px",
          }}
        >
          Enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          style={inputStyle}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" style={buttonStyle}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;