import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";


const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        const fetchStats = async () => {


            try {
                // const res = await fetch('/api/analytics', {
                    const res = await fetch(`${API_URL}/api/analytics`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setStats(data);
                } else {
                    if (res.status === 401) {
                        navigate('/login');

                    }
                    setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();

    }, [user, navigate]);

    const cardStyle = {
        padding: '18px',
        background: '#18181b',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px',
        minHeight: "180px",
    };
    const numberStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#f97316',

    };

    const buttonStyle = {
        marginTop: "10px",
        padding: "8px",
        width: "100%",
        background: "#f97316",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "13px"
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>

                <img src="https://play-lh.googleusercontent.com/sgtyEM2UxKDkoPI38sD9Q6BXXbbeYiEDsMUoCmRumaIZKaWfkjTObv4_QVx1MMY7utpRAXkfxWwmNjq4bNVeHA=w600-h300-pc0xffffff-pd" alt=" logo" style={{ height: '40px', width: '40px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 0px 10px rgb(249 115 22 0.3))' }} />
                <h2 style={{ margin: '0', }}> Admin Dashboard</h2>

            </div>
            <p style={{ color: '#a1a1aa', marginBottom: '30px', fontSize: '1.1rem' }}>
                Welcome back, <span style={{ color: '#fff' }}>{user?.name}</span>
            </p>
            {stats ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '20px' }}>



                    {/* ================= UPDATE ================= */}

                    <div style={cardStyle}>
                        <h4
                            style={{
                                color: "#a1a1aa",
                                fontSize: "1rem"
                            }}
                        >
                            📦 Total Stock
                        </h4>

                        <div style={numberStyle}>
                            {stats.totalStock}
                        </div>

                        <p
                            style={{
                                color: "#888",
                                fontSize: "13px"
                            }}
                        >
                            Products Available
                        </p>

                    </div>

                    {/* ================= END UPDATE ================= */}


                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}> Total Orders</h4>
                        <div style={numberStyle}>{stats.totalOrders}</div>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}> Total products</h4>
                        <div style={numberStyle}>{stats.totalProducts}</div>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}> Total Users</h4>
                        <div style={numberStyle}>{stats.totalUsers}</div>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}> Total Revenue</h4>
                        <div style={numberStyle}>₹{stats.totalRevenue.toFixed(2)}</div>
                    </div>



                    {/* ===================== UPDATE START ===================== */}

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>
                            Pending Orders
                        </h4>

                        <div style={numberStyle}>
                            {stats.pendingOrders}
                        </div>
                        <button
                            className="btn"
                            style={buttonStyle}
                            onClick={() => navigate("/admin/orders/pending")}
                        >
                            View Orders
                        </button>
                    </div>


                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>
                            Confirmed Orders
                        </h4>

                        <div style={numberStyle}>
                            {stats.confirmedOrders}
                        </div>
                        <button
                            className="btn"
                            style={buttonStyle}
                            onClick={() => navigate("/admin/orders/confirmed")}
                        >
                            View Orders
                        </button>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>
                            Shipped Orders
                        </h4>

                        <div style={numberStyle}>
                            {stats.shippedOrders}
                        </div>
                        <button
                            className="btn"
                            style={buttonStyle}
                            onClick={() => navigate("/admin/orders/confirmed")}
                        >
                            View Orders
                        </button>

                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>
                            Delivered Orders
                        </h4>

                        <div style={numberStyle}>
                            {stats.deliveredOrders}
                        </div>
                        <button
                            className="btn"
                            style={buttonStyle}
                            onClick={() => navigate("/admin/orders/delivered")}
                        >
                            View Orders
                        </button>
                    </div>

                    <div style={cardStyle}>
                        <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>
                            Cancelled Orders
                        </h4>

                        <div style={numberStyle}>
                            {stats.cancelledOrders}
                        </div>

                        <button
                            className="btn"
                            style={buttonStyle}
                            onClick={() => navigate("/admin/orders/cancelled")}
                        >
                            View Orders
                        </button>
                    </div>

                    {/* ===================== UPDATE END ===================== */}



                </div>


            ) : (
                <div style={{ textAlign: 'center', margin: '50px 0', color: '#f97316' }}>Loading metrics...</div>
            )}

            <div style={{ marginTop: '40px', padding: '30px', background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ marginBottom: '25px', color: '#f97316' }}> Administrative Control</h3>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

                    <button className="btn" onClick={() => navigate('/admin/add-product')} style={{ background: '#3f3f46', width: '180px', height: '50px', borderRadius: '12px', fontSize: '15px', fontWeight: '600' }}> +Add Product</button>

                    <button className="btn" onClick={() => navigate('/admin/products')} style={{ background: '#3f3f46', width: '180px', height: '50px', borderRadius: '12px', fontSize: '15px', fontWeight: '600' }}> Manage Products</button>

                    <button className="btn" onClick={() => navigate('/admin/orders')} style={{ background: '#3f3f46', width: '180px', height: '50px', borderRadius: '12px', fontSize: '15px', fontWeight: '600' }}> Manage Orders</button>

                    <button className="btn" onClick={() => navigate('/admin/users')} style={{ background: '#3f3f46', width: '180px', height: '50px', borderRadius: '12px', fontSize: '15px', fontWeight: '600' }}>Users Directory</button>

                    {/* <button className="btn" onClick={() => navigate('/admin/cancelled-orders')} style={{ background: '#3f3f46', width: '180px', height: '50px', borderRadius: '12px', fontSize: '15px', fontWeight: '600' }}>Cancelled Orders</button> */}

                </div>

            </div>

        </div>


    );

};

export default AdminDashboard;