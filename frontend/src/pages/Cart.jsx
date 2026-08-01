
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateQty, removefromCart } from "../redux/cartSlice";
import "../styles/cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stockMessage, setStockMessage] = React.useState("");

  // Remove Item
  const handleRemove = (_id) => {
    dispatch(removefromCart(_id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty < 1) return;

    // Stock Check
    if (qty > item.stock) {
      setStockMessage(
        `Out of Stock! Only ${item.stock} item(s) available.`
      );

      setTimeout(() => {
        setStockMessage("");
      }, 3000);

      return;
    }

    dispatch(
      updateQty({
        _id: item._id,
        qty,
      })
    );
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

  return (
    <>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "25px auto 10px",
          padding: "0 20px",
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
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#fb923c")}
          onMouseLeave={(e) => (e.target.style.color = "#f97316")}
        >
          Home
        </Link>

        <span style={{ margin: "0 8px", color: "#71717a" }}>/</span>

        <span style={{ color: "#f97316" }}>Cart</span>
      </div>

      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {/* 🔴 Out of Stock Message */}
        {stockMessage && (
          <div
            style={{
              background: "#dc2626",
              color: "#fff",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {stockMessage}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="shop-btn">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left Side */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={
                      item.imageUrl ||
                      item.ImageUrl ||
                      item.image ||
                      "https://placehold.co/200x200?text=No+Image"
                    }
                    alt={item.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/200x200?text=No+Image";
                    }}
                  />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>

                    <p className="price">
                      ₹{Number(item.price).toLocaleString()}
                    </p>

                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p>
                      <strong>Subtotal :</strong> ₹
                      {(item.price * item.qty).toLocaleString()}
                    </p>

                    <button
                      className="btn-remove"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="cart-summary">
              <h3>Order Summary</h3>

              <p>
                <strong>Total Products :</strong> {cartItems.length}
              </p>

              <p>
                <strong>Total Amount :</strong>
              </p>

              <h2>₹{totalPrice.toLocaleString()}</h2>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <button
                className="continue-btn"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;