
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
// import { backendURL } from "../config";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        // const res = await fetch("/api/orders/myOrders", {
          const res = await fetch(`${ API_URL}/api/orders/myOrders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        console.log("Status:", res.status);
        console.log("Orders:", data);

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // ==========================================================

  const cancelOrder = async (orderId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {

      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {

        alert(data.message);

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: "cancelled" }
              : order
          )
        );

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // ==========================================================
  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>My Profile</h2>

          <p style={textStyle}>
            <strong>Name:</strong> {user.name}
          </p>

          <p style={textStyle}>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <span style={badgeStyle}>
          Account Type: {user.role.toUpperCase()}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="btn"
        style={{
          background: "#ef4444",
          marginBottom: "30px",
        }}
      >
        Logout
      </button>

      <h3
        style={{
          color: "#f97316",
          marginBottom: "20px",
        }}
      >
        Order History
      </h3>

      {loading ? (
        <p style={{ color: "#a1a1aa" }}>Loading...</p>
      ) : orders.length === 0 ? (
        <div style={emptyBox}>
          <p style={{ color: "#a1a1aa" }}>
            You haven't placed any orders yet.
          </p>

          <Link to="/shop" className="btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={orderCard}>
            <div>
              <p style={textStyle}>
                Order ID: {order._id}
              </p>

              <p style={{ textStyle, wordBreak: 'break-all' }}>
                Placed On:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p style={textStyle}>
                Total:{" "}
                <strong style={{ color: "#10b981" }}>
                  ₹{order.totalAmount}
                </strong>
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={statusStyle(order.status)}>
                {order.status}
              </span>
              {(order.status === "pending" || order.status === "confirmed") && (

                <button
                  onClick={() => cancelOrder(order._id)}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "100%"
                  }}
                >
                  Cancel Order
                </button>

              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: "1000px",
  margin: "100px auto 40px", // 👈 Top se 100px gap
  // margin: "40px auto",
  padding: "30px",
  background: "#18181b",
  borderRadius: "12px",
  color: "#fff",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  borderBottom: "1px solid rgba(255,255,255,.1)",
  paddingBottom: "30px",
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "2.2rem",
  marginBottom: "10px",
  marginLeft: "-20px",
  color: "#f97316",
};

const textStyle = {
  color: "#a1a1aa",
  marginBottom: "8px",
};

const badgeStyle = {
  background: "rgba(249,115,22,.15)",
  color: "#f97316",
  padding: "8px 16px",
  borderRadius: "20px",
  fontWeight: "bold",
};

const emptyBox = {
  background: "#09090b",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
};

const orderCard = {
  background: "#09090b",
  border: "1px solid #27272a",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  // alignItems: "center",

  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: "12px",
};

const statusStyle = (status) => ({
  background:
    status === "cancelled"
      ? "rgba(239,68,68,.15)"
      : status === "delivered"
        ? "rgba(16,185,129,.15)"
        : status === "shipped"
          ? "rgba(59,130,246,.15)"
          : status === "confirmed"
            ? "rgba(34,197,94,.15)"
            : "rgba(245,158,11,.15)",

  color:
    status === "cancelled"
      ? "#ef4444"
      : status === "delivered"
        ? "#10b981"
        : status === "shipped"
          ? "#3b82f6"
          : status === "confirmed"
            ? "#22c55e"
            : "#f59e0b",

  padding: "8px 18px",
  borderRadius: "20px",
  fontWeight: "bold",
  textTransform: "capitalize",
  whiteSpace: "nowrap",
  marginTop: "10px",
});
export default Profile;