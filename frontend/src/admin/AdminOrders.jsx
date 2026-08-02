

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../config/api";

const AdminOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // const res = await fetch("/api/orders", {
                    const res = await fetch(`${API_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setOrders(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, [user]);

    const updateStatus = async (id, status) => {
        try {
            // const res = await fetch(`/api/orders/${id}/status`, {
                const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (res.ok) {
                setOrders(
                    orders.map((order) =>
                        order._id === id ? { ...order, status } : order
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: "#f97316", marginBottom: "20px" }}>
                Manage Orders
            </h2>

            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={rowStyle}>
                            <th style={thStyle}>ORDER ID</th>
                            <th style={thStyle}>USER</th>
                            <th style={thStyle}>TOTAL</th>
                            <th style={thStyle}>DATE</th>
                            <th style={thStyle}>STATUS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} style={rowStyle}>
                                <td style={tdStyle}>
                                    {order._id.substring(0, 8)}...
                                </td>

                                <td style={tdStyle}>
                                    {order.user?.name || "Deleted User"}
                                </td>

                                <td style={tdStyle}>
                                    ₹{order.totalAmount.toFixed(2)}
                                </td>

                                <td style={tdStyle}>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td style={tdStyle}>
                                    <div style={statusBadge(order.status)}>
                                        {order.status}
                                    </div>

                                    <br />

                                    <select
                                        value={order.status}
                                        disabled={order.status === "cancelled"}
                                        onChange={(e) =>
                                            updateStatus(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            background: "#09090b",
                                            color: "#fff",
                                            padding: "6px",
                                            border: "1px solid #27272a",
                                            borderRadius: "4px",
                                            outline: "none",
                                            cursor:
                                                order.status === "cancelled"
                                                    ? "not-allowed"
                                                    : "pointer",
                                            opacity:
                                                order.status === "cancelled"
                                                    ? 0.6
                                                    : 1,
                                        }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">
                                            Confirmed
                                        </option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">
                                            Delivered
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const containerStyle = {
    maxWidth: "1200px",
    margin:'100px auto 40px',
    // margin: "40px auto",
    padding: "30px",
    background: "#18181b",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    color: "#fafafa",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const rowStyle = {
    borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const thStyle = {
    padding: "15px",
    textAlign: "left",
    color: "#a1a1aa",
    fontSize: "0.9rem",
};

const tdStyle = {
    padding: "15px",
    textAlign: "left",
};

const statusBadge = (status) => ({
    background:
        status === "cancelled"
            ? "rgba(239,68,68,.15)"
            : status === "confirmed"
            ? "rgba(34,197,94,.15)"
            : status === "delivered"
            ? "rgba(16,185,129,.15)"
            : status === "shipped"
            ? "rgba(59,130,246,.15)"
            : "rgba(245,158,11,.15)",

    color:
        status === "cancelled"
            ? "#ef4444"
            : status === "confirmed"
            ? "#22c55e"
            : status === "delivered"
            ? "#10b981"
            : status === "shipped"
            ? "#3b82f6"
            : "#f59e0b",

    padding: "6px 12px",
    borderRadius: "20px",
    display: "inline-block",
    fontWeight: "bold",
    textTransform: "capitalize",
});

export default AdminOrders;