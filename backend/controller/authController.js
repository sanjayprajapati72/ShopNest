
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Generate JWT Token
const genrateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// ===============================
// Register User
// ===============================
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Send Welcome Email
        try {
            await sendEmail({

                email,

                subject: "Welcome to ShopNest",

                message: `
                    <h4>Hello ${name},</h4>
            
                    <p>Welcome to <b>ShopNest!</b></p>
            
                    <p>Thank you for joining us. Your account has been created successfully.</p>
            
                    <p>We're excited to have you as part of our community.</p>
            
                    <p>Explore a wide range of products and enjoy a seamless shopping experience.</p>
            
                    <p><b>Happy Shopping! 🛍️</b></p>
            
                    <br>
            
                    <p>Best Regards,</p>
            
                    <h4>The ShopNest Team</h4>
                `,

            });

            console.log("✅ Welcome email sent successfully.");
        } catch (emailError) {
            console.error("❌ Email Error:", emailError.message);
        }

        // Response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genrateToken(user._id),
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

// ===============================
// Login User
// ===============================
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: genrateToken(user._id),
            });
        }

        res.status(400).json({
            message: "Invalid email or password",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// ===============================
// Get All Users
// ===============================
const getUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// ==========================
// Get All Users (Admin)
// ==========================
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};





// ===============================
// Forgot Password
// ===============================
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate Token
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}`;

        // const resetUrl =
        // `http://localhost:5173/reset-password/${resetToken}`;


        const message = `
            <h2>Password Reset Request</h2>
        
            <p>Hello <b>${user.name}</b>,</p>
        
            <p>You requested to reset your password.</p>
        
            <p>Click the link below to reset your password:</p>
        
            <p>
                <a href="${resetUrl}">
                    ${resetUrl}
                </a>
            </p>
        
            <p><b>This link will expire in 10 minutes.</b></p>
        
            <p>If you didn't request this, simply ignore this email.</p>
        
            <br>
        
            <p>Regards,</p>
            <b>ShopNest Team</b>
        `;

        await sendEmail({

            email: user.email,

            subject: "Reset Your Password",

            message,

        });

        res.json({
            message: "Password reset link sent to email."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Reset Password
// ===============================
const resetPassword = async (req, res) => {

    try {

        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({

            resetPasswordToken: hashedToken,

            resetPasswordExpire: {
                $gt: Date.now()
            }

        });

        if (!user) {

            return res.status(400).json({
                message: "Token is invalid or expired"
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            req.body.password,
            salt
        );

        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        res.json({
            message: "Password updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Send Magic Link
// ===============================

const sendMagicLink = async (req, res) => {

    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "Please register first."
            });

        }

        // Generate Token

        const magicToken = crypto.randomBytes(32).toString("hex");

        user.magicLoginToken = crypto
            .createHash("sha256")
            .update(magicToken)
            .digest("hex");

        user.magicLoginExpire =
            Date.now() + 10 * 60 * 1000;

        await user.save();

        const magicLink =
            `${FRONTEND_URL}/magic-login/${magicToken}`;

        const message = `
            <h2>ShopNest Magic Login</h2>
            
            <p>Hello <b>${user.name}</b>,</p>
            
            <p>
            Click the secure link below to login without entering your password.
            </p>
            
            <p>
            <a href="${magicLink}">
            ${magicLink}
            </a>
            </p>
            
            <p>
            This link will expire in <b>10 minutes</b>.
            </p>
            
            <p>
            If you didn't request this login, you can safely ignore this email.
            </p>
            
            <hr>
            
            <p>
            Regards,<br/>
            <b>ShopNest Team</b>
            </p>
            `;

        await sendEmail({
            email: user.email,
            subject: "Magic Login - ShopNest",
            message,
        });

        res.json({
            message:
                "Magic Link sent successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// ===============================
// Magic Login
// ===============================

const magicLogin = async (req, res) => {

    try {

        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({

            magicLoginToken: hashedToken,

            magicLoginExpire: {
                $gt: Date.now()
            }

        });

        if (!user) {

            return res.status(400).json({
                message:
                    "Magic Link is invalid or expired."
            });

        }

        user.magicLoginToken = null;
        user.magicLoginExpire = null;

        await user.save();

        res.json({

            _id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

            token: genrateToken(user._id),

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    sendMagicLink,
    magicLogin,
    getUser,
    getUsers,
};
