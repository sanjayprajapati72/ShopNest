
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const containerStyle = {
    maxWidth: "600px",
    // margin: "50px auto",
    margin: "140px auto 50px",
    padding: "50px 30px",
    background: "#18181b",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1
        style={{
          color: "#00ff00",
          fontSize: "2.5rem",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        ✅ Payment Successful!
      </h1>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.2rem",
          marginBottom: "40px",
        }}
      >
        Thank you for your order. We have securely received your payment and
        will process your shipment shortly.
      </p>

      <Link to="/shop" className="btn">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;