import React from "react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  const containerStyle = {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "40px",
    background: "#18181b",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    color: "#fff",
  };

  const cardStyle = {
    background: "#27272a",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "all .35s ease",
    cursor: "pointer",
  };

  const titleStyle = {
    color: "#f97316",
    marginBottom: "12px",
    fontSize: "22px",
  };

  const textStyle = {
    color: "#d4d4d8",
    lineHeight: "1.8",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(249,115,22,0.35)";
    e.currentTarget.style.borderColor = "#f97316";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
  };

  return (
    <>
      {/* Breadcrumb */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "20px 35px",
          padding:"0 20px",
          fontSize: "16px",
          fontWeight: "500",
          color: "#a1a1aa",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#f97316",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <span style={{ margin: "0 8px" }}>/</span>

        <span style={{ color: "#f97316" }}>
          Disclaimer
        </span>
      </div>

      {/* Main Container */}

      <div style={containerStyle}>
        <h1
          style={{
            textAlign: "center",
            color: "#f97316",
            marginBottom: "10px",
            fontSize: "42px",
          }}
        >
          Disclaimer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#a1a1aa",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Please read this disclaimer carefully before using ShopNest.
        </p>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 style={titleStyle}>📌 General Information</h2>

          <p style={textStyle}>
            The information available on ShopNest is provided for general
            informational purposes only. We try our best to keep all product
            information accurate, but we cannot guarantee that every detail is
            always complete or error-free.
          </p>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 style={titleStyle}>💰 Product Pricing</h2>

          <p style={textStyle}>
            Product prices and availability may change at any time without
            prior notice. We reserve the right to correct pricing errors
            whenever discovered.
          </p>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 style={titleStyle}>🖼 Product Images</h2>

          <p style={textStyle}>
            Product images are for illustration purposes only. The actual
            product may vary slightly in appearance, color, or packaging.
          </p>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 style={titleStyle}>⚠ Limitation of Liability</h2>

          <p style={textStyle}>
            ShopNest will not be responsible for any direct, indirect,
            incidental, or consequential damages arising from the use of this
            website or its products.
          </p>
        </div>

        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 style={titleStyle}>📞 Contact Us</h2>

          <p style={textStyle}>
            If you have any questions regarding this disclaimer, please contact
            us through the Contact page or email support@shopnest.com.
          </p>
        </div>

        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#71717a",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "20px",
          }}
        >
          © 2026 <span style={{ color: "#f97316" }}>ShopNest</span>. All Rights
          Reserved.
        </div>
      </div>
    </>
  );
};

export default Disclaimer;