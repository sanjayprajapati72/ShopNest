console.log("✅ orderRoutes Loaded");
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
    createOrder,
    getOrders,
    // getOrderById,
    updateOrderStatus,
    myOrders,
    cancelOrder,
    getCancelledOrders,
    getOrdersByStatus
} = require("../controller/orderController");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);

router.route("/myOrders").get(protect, myOrders);

router.route("/:id/status").put(protect, admin, updateOrderStatus);

router.route("/:id/cancel").put(protect, cancelOrder);

router.get("/admin/cancelled-orders", protect, admin, getCancelledOrders);

router.get("/status/:status",protect,admin,getOrdersByStatus);

module.exports = router;