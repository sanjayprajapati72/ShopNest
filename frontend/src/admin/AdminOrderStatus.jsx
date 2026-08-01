import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import API_URL from "../config/api";

const AdminOrderStatus = () => {

    const { user } = useContext(AuthContext);
    const { status } = useParams();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, [status]);

    const fetchOrders = async () => {

        try {

            const res = await fetch(
                `${API_URL}/api/orders/status/${status}`,
                // `/api/orders/status/${status}`,
                // `http://localhost:5000/api/orders/status/${status}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            const data = await res.json();

            if (res.ok) {
                setOrders(data);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                Loading...
            </h2>
        );
    }

    return (

        <div style={container}>

            <h1 style={heading}>
                {status.toUpperCase()} ORDERS
            </h1>

            {
                orders.length === 0 ? (

                    <h2 style={{ textAlign: "center" }}>
                        No Orders Found
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

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    orders.map((order) => (

                                        <tr key={order._id}>

                                            <td style={td}>
                                                {order.user?.name}
                                            </td>

                                            <td style={td}>
                                                {order.user?._id}
                                            </td>

                                            <td style={td}>
                                                {order._id}
                                            </td>

                                            <td style={td}>
                                                {
                                                    order.items
                                                        .map(item => item.productId?.name)
                                                        .join(", ")
                                                }
                                            </td>

                                            <td style={td}>
                                                ₹
                                                {
                                                    order.items.reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            item.price *
                                                            item.quantity,
                                                        0
                                                    )
                                                }
                                            </td>

                                            <td style={td}>
                                                {
                                                    order.items.reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            item.quantity,
                                                        0
                                                    )
                                                }
                                            </td>

                                            <td style={td}>
                                                {
                                                    new Date(order.createdAt)
                                                        .toLocaleDateString()
                                                }
                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                )
            }

        </div>

    );

};

export default AdminOrderStatus;

const container = {
    padding: "30px",
    background: "#111",
    minHeight: "100vh",
    color: "#fff"
};

const heading = {
    marginBottom: "25px",
    color: "#ff7b00"
};

const table = {
    width: "100%",
    borderCollapse: "collapse",
    background: "#1f1f1f"
};

const th = {
    padding: "15px",
    background: "#ff7b00",
    color: "#fff",
    border: "1px solid #444"
};

const td = {
    padding: "15px",
    border: "1px solid #444",
    textAlign: "center"
};