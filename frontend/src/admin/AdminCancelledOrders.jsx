import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../config/api";

const AdminCancelledOrders = () => {
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCancelledOrders();
    }, []);

    const getCancelledOrders = async () => {
        try {
            const res = await fetch(
                // `${backendURL}/api/orders/admin/cancelled-orders`,
                // "http://localhost:5000/api/orders/admin/cancelled-orders",
                `${API_URL}/api/orders/admin/cancelled-orders`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const data = await res.json();

            if (res.ok) {
                setOrders(data);
            } else {
                alert(data.message || "Failed to load cancelled orders");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <h2 style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
                Loading...
            </h2>
        );
    }

    return (
        <div style={container}>
            <h1 style={heading}>Cancelled Orders</h1>

            {orders.length === 0 ? (
                <h2 style={{ textAlign: "center", color: "#fff" }}>
                    No Cancelled Orders Found
                </h2>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={table}>
                        <thead>
                            <tr>
                                <th style={th}>User Name</th>
                                <th style={th}>User ID</th>
                                <th style={th}>Order ID</th>
                                <th style={th}>Product Name</th>
                                <th style={th}>Price</th>
                                <th style={th}>Quantity</th>
                                <th style={th}>Order Date</th>
                                <th style={th}>Cancel Date</th>
                                <th style={th}>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td style={td}>
                                        {order.user?.name || "N/A"}
                                    </td>

                                    <td style={td}>
                                        {order.user?._id || "N/A"}
                                    </td>

                                    <td style={td}>
                                        {order._id}
                                    </td>

                                    <td style={td}>
                                        {order.items
                                            ?.map((item) => item.productId?.name)
                                            .join(", ")}
                                    </td>

                                    <td style={td}>
                                        ₹
                                        {order.items?.reduce(
                                            (total, item) =>
                                                total +
                                                item.price * item.quantity,
                                            0
                                        )}
                                    </td>

                                    <td style={td}>
                                        {order.items?.reduce(
                                            (total, item) =>
                                                total + item.quantity,
                                            0
                                        )}
                                    </td>

                                    <td style={td}>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td style={td}>
                                        {order.cancelledAt
                                            ? new Date(
                                                  order.cancelledAt
                                              ).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td style={td}>
                                        <span style={badge}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminCancelledOrders;

const container = {
    minHeight: "100vh",
    background: "#111",
    color: "#fff",
    padding: "30px",
};

const heading = {
    fontSize: "35px",
    marginBottom: "25px",
    color: "#ff7b00",
    textAlign: "center",
};

const table = {
    width: "100%",
    borderCollapse: "collapse",
    background: "#1f1f1f",
};

const th = {
    padding: "15px",
    background: "#ff7b00",
    color: "#fff",
    border: "1px solid #444",
};

const td = {
    padding: "12px",
    border: "1px solid #444",
    textAlign: "center",
};

const badge = {
    background: "#dc3545",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "5px",
    fontWeight: "bold",
};