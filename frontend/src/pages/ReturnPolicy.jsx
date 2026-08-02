import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {

    const containerStyle = {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "40px",
        background: "#18181b",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        color: "#fff",
        lineHeight: "1.8",
    };

    const headingStyle = {
        color: "#f97316",
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "2.5rem",
        fontWeight: "700",
    };

    const subHeadingStyle = {
        color: "#fff",
        marginTop: "25px",
        marginBottom: "10px",
        fontSize: "1.3rem",
    };

    const textStyle = {
        color: "#a1a1aa",
        fontSize: "1rem",
    };

    return (
        <>
            {/* Breadcrumb */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "125px auto 10px", // 👈 25px ki jagah 60px
                    // margin: "25px auto 10px",
                    padding: "0 20px",
                    fontSize: "16px",
                    color: "#a1a1aa",
                    fontWeight: "500",

         
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: "#f97316",
                        textDecoration: "none",
                    }}
                >
                    Home
                </Link>

                <span style={{ margin: "0 8px" }}>/</span>

                <span style={{ color: "#f97316" }}>
                    Return Policy
                </span>
            </div>

            {/* Main Content */}
            <div style={containerStyle}>

                <h1 style={headingStyle}>Return & Refund Policy</h1>

                <p style={textStyle}>
                    Thank you for shopping with{" "}
                    <strong style={{ color: "#f97316" }}>ShopNest</strong>.
                    We want you to be completely satisfied with your purchase.
                    If you are not satisfied, you may request a return or refund
                    under the conditions below.
                </p>

                <h3 style={subHeadingStyle}>📦 Return Eligibility</h3>

                <p style={textStyle}>
                    • Products can be returned within <strong>7 days</strong> of delivery.
                    <br />
                    • The product must be unused and in its original packaging.
                    <br />
                    • The original invoice or proof of purchase is required.
                </p>

                <h3 style={subHeadingStyle}>❌ Non-Returnable Items</h3>

                <p style={textStyle}>
                    • Gift Cards
                    <br />
                    • Digital Products
                    <br />
                    • Personalized Items
                    <br />
                    • Products damaged by misuse
                </p>

                <h3 style={subHeadingStyle}>💰 Refund Policy</h3>

                <p style={textStyle}>
                    After we receive and inspect your returned product, your
                    refund will be processed within <strong>5–7 business days</strong>.
                    The amount will be credited to your original payment method.
                </p>

                <h3 style={subHeadingStyle}>🚚 Shipping Charges</h3>

                <p style={textStyle}>
                    Shipping charges are non-refundable unless the return is due
                    to our mistake or a defective product.
                </p>

                <h3 style={subHeadingStyle}>📞 Need Help?</h3>

                <p style={textStyle}>
                    If you have any questions regarding returns or refunds,
                    feel free to contact our support team.
                </p>

                <div
                    style={{
                        marginTop: "35px",
                        padding: "20px",
                        borderRadius: "10px",
                        background: "rgba(249,115,22,0.1)",
                        border: "1px solid rgba(249,115,22,0.3)",
                        textAlign: "center",
                    }}
                >
                    <h3 style={{ color: "#f97316", marginBottom: "10px" }}>
                        ShopNest Support
                    </h3>

                    <p style={{ color: "#fff" }}>
                        📧 Email: support@shopnest.com
                    </p>

                    <p style={{ color: "#fff" }}>
                        📱 WhatsApp: +91 6266858217
                    </p>
                </div>

            </div>
        </>
    );
};

export default ReturnPolicy;