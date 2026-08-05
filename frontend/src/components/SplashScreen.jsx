// import React from "react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaShoppingBag,
    FaShoppingCart,
    FaGift,
    FaHeart,
    FaTag,
    FaCreditCard,
    FaMobileAlt,
} from "react-icons/fa";
import "../styles/SplashScreen.css";

const SplashScreen = () => {


    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIcons(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // ==================
    return (
        <div className="splash-container">
            {/* Background Glow */}
            <div className="bg-glow"></div>
            {/* Floating Icons */}
            {showIcons && (
                <motion.div
                    className="floating-icons"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <FaShoppingCart className="icon icon1" />
                    <FaHeart className="icon icon2" />
                    <FaGift className="icon icon3" />
                    <FaTag className="icon icon4" />
                    <FaShoppingBag className="icon icon5" />
                    <FaCreditCard className="icon icon6" />
                    <FaMobileAlt className="icon icon7" />
                </motion.div>
            )}
            {/* Logo */}
            <motion.div
                className="logo-wrapper"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                    scale: [0.8, 1.05, 1],
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                }}
            >
                <div className="logo-glow"></div>
                <motion.div
                    className="logo-circle"
                    animate={{
                        rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                    }}
                >
                    <FaShoppingBag />
                </motion.div>
                <motion.h1
                    className="logo-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    Shop<span>Nest</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Smart Shopping, Best Living
                </motion.p>


            </motion.div>

            {/* Bottom Glow */}
            <motion.div
                className="bottom-light"
                animate={{
                    opacity: [0.2, 0.7, 0.2],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                }}
            />
        </div>
    );
};

export default SplashScreen;