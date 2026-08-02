
import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import API_URL from "../config/api";
import "../styles/checkout.css";


const Checkout = () => {
    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState({
        houseNumber: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        setLoading(true);

        // Fake payment loading
        await new Promise((resolve) => setTimeout(resolve, 2500));

        const fakePaymentId =
            "PAY_TEST_" + Date.now() + Math.floor(Math.random() * 1000);

        try {
            console.log("Address Data:", address);
            console.log("User:", user);
            // const saveOrderRes = await fetch("/api/orders", {
            const saveOrderRes = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },

                // body: JSON.stringify({
                //     items: cartItems.map(item => ({
                //         productId: item._id,
                //         quantity: item.qty,
                //         price: item.price
                //     })),
                //     totalAmount: totalPrice,
                //     address,
                //     paymentId: fakePaymentId
                // })


                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        productId: item._id,
                        quantity: item.qty,
                        price: item.price
                    })),
                    totalAmount: totalPrice,

                    address: {
                        ...address,
                        fullName: user.name
                    },

                    paymentId: fakePaymentId
                })






            });

            if (saveOrderRes.ok) {
                dispatch(clearCart());
                alert("Payment Successful");
                navigate("/ordersuccess");
            } else {
                alert("Order Saving Failed");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="Checkout-container">
            <h2>Checkout</h2>

            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="shipping-form">

                    <h3>Shipping Address</h3>

                    {/* <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={address.fullName}
                        onChange={(e) =>
                            setAddress({ ...address, fullName: e.target.value })
                        }
                    /> */}

                    <input
                        type="text"
                        placeholder="House No. / Flat No."
                        required
                        value={address.houseNumber}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                houseNumber: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Street"
                        required
                        value={address.street}
                        onChange={(e) =>
                            setAddress({ ...address, street: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="City"
                        required
                        value={address.city}
                        onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Pin Code"
                        required
                        value={address.postalCode}
                        onChange={(e) =>
                            setAddress({ ...address, postalCode: e.target.value })
                        }
                    />

                    {/* <input
                        type="text"
                        placeholder="Country"
                        required
                        value={address.country}
                        onChange={(e) =>
                            setAddress({ ...address, country: e.target.value })
                        }
                    /> */}
                    <select
                        className="country-select"
                        required
                        value={address.country}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                country: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Country</option>

                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                    </select>

                    <div className="Checkout-summary">
                        <h4>Total To Pay : ₹{totalPrice.toFixed(2)}</h4>

                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing Payment..."
                                : "Pay Now"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
