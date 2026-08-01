import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import "../styles/auth.css";

const MagicLink = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleMagicLink = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await fetch(`${API_URL}/api/auth/magic-link`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await res.json();

            if (res.ok) {

                alert(data.message);

                setEmail("");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error("Magic Link Error:", error);

            alert("Something went wrong");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleMagicLink}
            >

                <h2>Magic Link Login</h2>

                <p className="auth-subtitle">
                    Enter your registered email.
                    <br />
                    We'll send you a secure login link.
                </p>

                <div className="input-group">

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Magic Link"}
                </button>

                <p className="register-text">

                    Remember your password?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

};

export default MagicLink;