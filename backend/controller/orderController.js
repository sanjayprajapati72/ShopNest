
const Order = require("../models/order");
const User = require("../models/User");
const Product = require("../models/product");
const sendEmail = require("../utils/sendEmail");

// ==============================
// Create New Order
// ==============================
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;


        // ==============================
        // Check Product Stock
        // ==============================
        for (const item of items) {

            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock. Only ${product.stock} item(s) available.`
                });
            }
        };
        // =================================================

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({
                message: "Invalid order data"
            });
        }

        // ==============================
        // Create Order Object
        // ==============================
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId,
            status: "confirmed" //ye mai add kiya hu fek patment ke liye
        });

        // ==============================
        // Save Order in Database
        // ==============================
        await order.save();
        // ==============================


        // ==============================
        // Update Product Stock
        // ==============================
        for (const item of items) {

            await Product.findByIdAndUpdate(
                item.productId,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );

        }

        // ==============================
        // Get Product Names
        // ==============================
        await order.populate("items.productId", "name");

        const productNames = order.items
            .map((item) => item.productId.name)
            .join(", ");

        // Get User Details
        // ==============================
        const user = await User.findById(order.user);

        // ==============================
        // Send Order Confirmation Email
        // ==============================
        await sendEmail(
            user.email,
            "Order Confirmation - ShopNest",
            `
            <h4>Hello ${user.name},</h4>

            <p>Thank you for your purchase!</p>

            <p>Your order has been successfully placed and is now being processed.</p>

            <p><b>Order ID:</b> ${order._id}</p>
            <p><b>Payment ID:</b> ${order.paymentId}</p> 
            <p><b>Product Name:</b> ${productNames}</p>           
            <p><b>Total Amount:</b> ₹${order.totalAmount}</p>
            <p><b>Shipping Address:</b> ${order.address}</p>

            <p>We'll notify you once your order has been shipped.</p>

            <p>Thank you for shopping with ShopNest.</p>

            <br>

            <p><b>Best Regards,</b></p>
            <p>The ShopNest Team</p>
            `
        );

        // ==============================
        // Send Success Response
        // ==============================
        res.status(201).json({
            message: "Order Created Successfully",
            order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};

// ==============================
// My Orders
// ==============================
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate("items.productId", "name price");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// ==============================
// Get All Orders (Admin)
// ==============================
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email")
            .populate("items.productId", "name price");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// ==============================
// Update Order Status
// ==============================
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        // ==============================
        // Optional: Send Status Update Email
        // ==============================
        const user = await User.findById(order.user);

        if (user && status === "shipped") {
            await sendEmail(
                user.email,
                "Order Shipped - ShopNest",
                `
                <h4>Hello ${user.name},</h4>

                <p>Great news! Your order has been shipped.</p>

                <p><b>Order ID:</b> ${order._id}</p>

                <p>You can track your order status in your account.</p>

                <p>Thank you for shopping with ShopNest.</p>

                <br>

                <p><b>Best Regards,</b></p>
                <p>The ShopNest Team</p>
                `
            );
        }

        res.json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating order status",
            error: error.message
        });
    }
};



// ==============================
// Cancel Order
// ==============================
const cancelOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Sirf order owner hi cancel kar sakta hai
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        // Sirf Pending ya Confirmed order cancel hoga
        if (
            order.status !== "pending" &&
            order.status !== "confirmed"
        ) {
            return res.status(400).json({
                message: "This order cannot be cancelled"
            });
        }

        // Stock wapas add karo
        for (const item of order.items) {

            const product = await Product.findById(item.productId);

            if (product) {
                product.stock += item.quantity;
                await product.save();
            }

        }

        // Status update
        order.status = "cancelled";
        order.cancelledAt = new Date();

        await order.save()


        // ===========================================;

        const user = await User.findById(order.user);

        await sendEmail(
            user.email,
            "Order Cancelled - ShopNest",
            `
    <h2>Hello ${user.name},</h2>

    <p>Your order has been cancelled successfully.</p>

    <p><b>Order ID:</b> ${order._id}</p>

    <p><b>Total Amount:</b> ₹${order.totalAmount}</p>

    <p>If this was a mistake, you can place a new order anytime.</p>

    <br>

    <p>Thanks for shopping with ShopNest ❤️</p>
    `
        );





        // =================================================

        res.json({
            message: "Order cancelled successfully",
            order
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error cancelling order",
            error: error.message
        });

    }
};


// ==============================
// Get Cancelled Orders (Admin)
// ==============================
const getCancelledOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            status: "cancelled"
        })
            .populate("user", "name email")
            .populate("items.productId", "name price")
            .sort({ cancelledAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error fetching cancelled orders",
            error: error.message
        });

    }
};



// =======================================
// Admin - Get Orders By Status
// =======================================
const getOrdersByStatus = async (req, res) => {
    try {

        const { status } = req.params;

        const orders = await Order.find({ status })
            .populate("user", "name email")
            .populate("items.productId", "name price")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });

    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus,
    cancelOrder,
    getCancelledOrders,
    getOrdersByStatus
};