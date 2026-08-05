
// const Order = require("../models/order");
// const User = require("../models/User");
// const Product = require("../models/product");

// const getAdminStatus = async (req, res) => {
//     try {

//         const totalUsers = await User.countDocuments();
//         const totalOrders = await Order.countDocuments();
//         const totalProducts = await Product.countDocuments();


//         // ========================= UPDATE =========================
//         // Calculate Total Stock of All Products
//         const products = await Product.find();

//         const totalStock = products.reduce((total, product) => {
//             return total + product.stock;
//         }, 0);
//         // ======================= END UPDATE =======================




//         const orders = await Order.find({});

//         const totalRevenueData = orders.reduce(
//             (acc, order) => acc + order.totalAmount,
//             0
//         );

//         // ===========================
//         // UPDATE START
//         // Order Status Count
//         // ===========================

//         const pendingOrders = await Order.countDocuments({
//             status: "pending",
//         });

//         const confirmedOrders = await Order.countDocuments({
//             status: "confirmed",
//         });

//         const shippedOrders = await Order.countDocuments({
//             status: "shipped",
//         });

//         const deliveredOrders = await Order.countDocuments({
//             status: "delivered",
//         });

//         const cancelledOrders = await Order.countDocuments({
//             status: "cancelled",
//         });

    
//         res.json({
//             totalUsers,
//             totalOrders,
//             totalProducts,
//             totalRevenue: totalRevenueData,
//             totalStock,

//             // ===========================
//             // UPDATE START
//             // Send Order Status Counts
//             // ===========================
//             pendingOrders,
//             confirmedOrders,
//             shippedOrders,
//             deliveredOrders,
//             cancelledOrders,
           
//             // ===========================
//             // UPDATE END
//             // ===========================
//         });

//     } catch (error) {

//         res.status(500).json({
//             message: "Error fetching stats",
//             error: error.message
//         });

//     }
// };

// module.exports = {
//     getAdminStatus
// };


const Order = require("../models/order");
const User = require("../models/User");
const Product = require("../models/product");

const getAdminStatus = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        // =========================
        // Total Stock
        // =========================
        const products = await Product.find();

        const totalStock = products.reduce((total, product) => {
            return total + product.stock;
        }, 0);

        // =========================
        // TODAY REVENUE
        // =========================

        const today = new Date();

        // Today 12:00 AM
        today.setHours(0, 0, 0, 0);

        // Tomorrow 12:00 AM
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayOrders = await Order.find({
            createdAt: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        const totalRevenueData = todayOrders.reduce(
            (acc, order) => acc + order.totalAmount,
            0
        );

        // =========================
        // Order Status Count
        // =========================

        const pendingOrders = await Order.countDocuments({
            status: "pending",
        });

        const confirmedOrders = await Order.countDocuments({
            status: "confirmed",
        });

        const shippedOrders = await Order.countDocuments({
            status: "shipped",
        });

        const deliveredOrders = await Order.countDocuments({
            status: "delivered",
        });

        const cancelledOrders = await Order.countDocuments({
            status: "cancelled",
        });

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalStock,

            // Today Revenue
            totalRevenue: totalRevenueData,

            pendingOrders,
            confirmedOrders,
            shippedOrders,
            deliveredOrders,
            cancelledOrders,
        });

    } catch (error) {

        res.status(500).json({
            message: "Error fetching stats",
            error: error.message,
        });

    }
};

module.exports = {
    getAdminStatus,
};