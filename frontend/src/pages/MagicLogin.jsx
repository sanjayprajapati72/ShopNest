import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../config/api";

const MagicLogin = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [message, setMessage] = useState("Verifying Magic Link...");

    useEffect(() => {

        const verifyMagicLink = async () => {

            try {

                const res = await fetch(
                    `${API_URL}/api/auth/magic-login/${token}`
                );

                const data = await res.json();

                if (res.ok) {

                    login(data);

                    setMessage("Login Successful. Redirecting...");

                    setTimeout(() => {

                        navigate("/");

                    }, 1500);

                } else {

                    setMessage(data.message);

                }

            } catch (error) {

                console.log(error);

                setMessage("Something went wrong.");

            }

        };

        verifyMagicLink();

    }, [token, login, navigate]);

    return (

        <div className="auth-container">

            <div className="auth-form">

                <h2>Magic Link Login</h2>

                <p
                    className="auth-subtitle"
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                    }}
                >

                    {message}

                </p>

            </div>

        </div>

    );

};

export default MagicLogin;