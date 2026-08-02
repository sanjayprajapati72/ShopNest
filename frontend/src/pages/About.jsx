
import React from "react";
// import { Link } from "react-router-dom";

const About = () => {
    const containerStyle = {
        maxWidth: "900px",
        margin: "125px auto 10px",
        // margin: "40px auto",
        padding: "40px",
        background: "#18181b",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        textAlign: "center"
    };

    const socialBtnStyle = {
        display: "inline-block",
        margin: "10px",
        padding: "10px 20px",
        background: "#27272a",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "all 0.3s ease",
        border: "1px solid rgba(255,255,255,0.1)"
    };

    return (
        <div style={containerStyle}>
            <img
                src="https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg"
                alt="Sanjay"
                style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #f97316",
                    marginBottom: "20px",
                    boxShadow: "0 4px 20px rgba(249,115,22,0.4)"
                }}
            />

            <h2 style={{
                fontSize: "2.5rem",
                marginBottom: "10px",
                color: "#fff"
            }}>
                About Me
            </h2>

            <h3 style={{
                fontSize: "1.5rem",
                marginBottom: "15px",
                color: "#f97316"
            }}>
                Sanjay Prajapati | Full Stack MERN Developer | Creator of ShopNest
            </h3>

            <p style={{
                color: "#a1a1aa",
                fontSize: "1.2rem",
                lineHeight: "1.8",
                maxWidth: "600px",
                margin: "0 auto 30px auto"
            }}>
                <strong>Join the community and grow together!</strong>
                <br /><br />
                Welcome to my platform where we build, deploy, and scale
                highly engineered systems.
            </p>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "15px",
                marginTop: "25px",
            }}>
                {/* Website */}
                <a
                    href="https://thesanjayshopnest.com"
                    target="_blank"
                    rel="noreferrer"
                    style={socialBtnStyle}
                >
                    <i className="fas fa-globe"></i> Website
                </a>

                {/* YouTube */}
                <a
                    href="https://youtube.com/@YOUR_CHANNEL"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(239,68,68,0.2)",
                        borderColor: "#ef4444",
                        color: "#ef4444",
                    }}
                >
                    <i className="fab fa-youtube"></i> YouTube
                </a>

                {/* Instagram */}
                <a
                    href="https://instagram.com/YOUR_USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(236,72,153,0.2)",
                        borderColor: "#ec4899",
                        color: "#ec4899",
                    }}
                >
                    <i className="fab fa-instagram"></i> Instagram
                </a>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/916266858217?text=Hi%20Sanjay,%20I%20visited%20your%20portfolio!"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(34,197,94,0.2)",
                        borderColor: "#22c55e",
                        color: "#22c55e",
                    }}
                >
                    <i className="fab fa-whatsapp"></i> WhatsApp
                </a>

                {/* LinkedIn */}
                <a
                    href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(37,99,235,0.2)",
                        borderColor: "#2563eb",
                        color: "#2563eb",
                    }}
                >
                    <i className="fab fa-linkedin"></i> LinkedIn
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/YOUR_GITHUB_USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(255,255,255,0.1)",
                        borderColor: "#fff",
                        color: "#fff",
                    }}
                >
                    <i className="fab fa-github"></i> GitHub
                </a>

                {/* X (Twitter) */}
                <a
                    href="https://x.com/YOUR_USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(29,161,242,0.2)",
                        borderColor: "#1DA1F2",
                        color: "#1DA1F2",
                    }}
                >
                    <i className="fab fa-x-twitter"></i> X (Twitter)
                </a>

                {/* LeetCode */}
                <a
                    href="https://leetcode.com/u/YOUR_LEETCODE_USERNAME"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(255,161,22,0.2)",
                        borderColor: "#FFA116",
                        color: "#FFA116",
                    }}
                >
                    <i className="fas fa-code"></i> LeetCode
                </a>

                {/* Email */}
                <a
                    href="mailto:youremail@example.com"
                    style={{
                        ...socialBtnStyle,
                        background: "rgba(168,85,247,0.2)",
                        borderColor: "#a855f7",
                        color: "#a855f7",
                    }}
                >
                    <i className="fas fa-envelope"></i> Email
                </a>
            </div>
        </div>
    );
};

export default About;