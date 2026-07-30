const orderSuccessEmail = (userName, order) => {
    return `
    <div style="font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;">
        <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:10px;">

            <h3 style="color:#2563eb;">
                Thank you for your order, ${userName}! 🎉
            </h3>

            <p>Your order has been placed successfully.</p>

            <hr>

            <h3>Order Details</h3>

            <p><strong>Order ID:</strong> ${order._id}</p>

            <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>

            <p><strong>Payment ID:</strong> ${order.paymentId || "Cash On Delivery"}</p>

            <p><strong>Status:</strong> ${order.status}</p>

            <hr>

            <h3>Shipping Address</h3>

            <p>
                ${order.address.street}<br>
                ${order.address.city}<br>
                ${order.address.state}<br>
                ${order.address.country}<br>
                ${order.address.zipCode}
            </p>

            <br>

            <p>
                We will notify you once your order has been shipped.
            </p>

            <h3 style="color:#16a34a;">
                Thank you for shopping with ShopNest ❤️
            </h3>

        </div>
    </div>
    `;
};

module.exports = orderSuccessEmail;