



import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src="https://thumbs.dreamstime.com/b/shopping-logo-letter-s-concept-204397380.jpg" alt="ShopNest Logo" className="navbar-logo" />
                    ShopNest
                </Link>
            </div>

            <ul className="navbar-links">
                <li>
                    <Link to="/shop">Shop</Link>
                </li>

                <li>
                    <Link to="/cart">Cart({cartItems?.length || 0})</Link>
                </li>

                {user ? (
                    <>
                        <li>
                            <Link to="/profile">Hi, {user.name}</Link>
                        </li>

                        {user.role === "admin" && (
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                        )}

                        <li>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

