
const express = require("express");
const router = express.Router();
const { registerUser, loginUser,forgotPassword,resetPassword, getUser, getUsers } = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");



router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/user", protect, admin, getUser);
router.get("/users", protect, admin, getUsers);


module.exports = router;




