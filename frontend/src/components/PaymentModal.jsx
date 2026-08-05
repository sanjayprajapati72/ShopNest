

import React, { useState } from "react";

import {
    FaGooglePay,
    FaCreditCard,
    FaArrowLeft,
    FaCheckCircle,
} from "react-icons/fa";

const PaymentModal = ({
    isOpen,
    onClose,
    paymentMethod,
    setPaymentMethod,
    totalPrice,
    onPaymentSuccess,
}) => {
    const [upiId, setUpiId] = useState("");

    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });
    const [processing, setProcessing] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [selectedUpiApp, setSelectedUpiApp] = useState("");
    const upiSuffix = {
        "Google Pay": "@okaxis",
        "PhonePe": "@ybl",
        "Paytm": "@paytm",
        "BHIM": "@upi",
    };
    const [otp, setOtp] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transactionId] = useState(
        "TXN" + Date.now()
    );

    const [paymentTime] = useState(
        new Date().toLocaleString()
    );
    // 👇 YAHAN YE FUNCTION ADD KARO
    const handleFakePayment = async () => {

        // UPI Validation

        if (paymentMethod === "upi") {

            // UPI App Select Validation
            if (selectedUpiApp === "") {
                alert("Please select a UPI App");
                return;
            }

            // UPI ID Validation
            if (upiId.trim() === "") {
                alert("Please enter your UPI ID");
                return;
            }
            const finalUpiId =
                upiId + upiSuffix[selectedUpiApp];

            console.log("UPI ID :", finalUpiId);

        }
        // Card Validation
        if (paymentMethod === "card") {

            if (
                cardData.number.trim() === "" ||
                cardData.name.trim() === "" ||
                cardData.expiry.trim() === "" ||
                cardData.cvv.trim() === ""
            ) {
                alert("Please fill all card details");
                return;
            }

            if (cardData.number.length < 16) {
                alert("Card number must be 16 digits");
                return;
            }

            if (cardData.cvv.length !== 3) {
                alert("CVV must be 3 digits");
                return;
            }
        }

        setProcessing(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setProcessing(false);

        setShowOtp(true);
    };

    const verifyOtp = async () => {

        if (otp !== "123456") {
            alert("Invalid OTP");
            return;
        }

        // Reset all payment states
        setOtp("");
        setShowOtp(false);
        setPaymentMethod("");
        setUpiId("");

        setCardData({
            number: "",
            name: "",
            expiry: "",
            cvv: "",
        });

        setProcessing(false);

        // Close modal
        setPaymentSuccess(true);

        setTimeout(() => {
            setPaymentMethod("");

            onClose();

            onPaymentSuccess({
                preventDefault: () => { },
            });

        }, 60000);

    };

    if (!isOpen) return null;

    return (
        <div className="payment-overlay">
            <div className="payment-modal">

                {/* ===========================
            STEP 1
        =========================== */}

                {paymentMethod === "" && !paymentSuccess && (
                    <>
                        <h2>Select Payment Method</h2>
                        <p>Choose your preferred payment option</p>

                        <button
                            className="payment-option"
                            onClick={() => setPaymentMethod("upi")}
                        >
                            <FaGooglePay className="payment-icon" />
                            <span>UPI Payment</span>
                        </button>

                        <button
                            className="payment-option"
                            onClick={() => setPaymentMethod("card")}
                        >
                            <FaCreditCard className="payment-icon" />
                            <span>Debit / Credit Card</span>
                        </button>

                        <button
                            className="cancel-payment"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </>
                )}

                {/* ===========================
            UPI SCREEN
        =========================== */}

                {paymentMethod === "upi" && !showOtp && !paymentSuccess && (
                    <>
                        <button
                            className="back-btn"
                            onClick={() => setPaymentMethod("")}
                        >
                            <FaArrowLeft />
                        </button>

                        <h2>UPI Payment</h2>

                        <div className="upi-apps">

                            <div
                                className={`upi-box ${selectedUpiApp === "Google Pay" ? "active-upi" : ""}`}
                                onClick={() => setSelectedUpiApp("Google Pay")}
                            >
                                Google Pay
                            </div>

                            <div
                                className={`upi-box ${selectedUpiApp === "PhonePe" ? "active-upi" : ""}`}
                                onClick={() => setSelectedUpiApp("PhonePe")}
                            >
                                PhonePe
                            </div>

                            <div
                                className={`upi-box ${selectedUpiApp === "Paytm" ? "active-upi" : ""}`}
                                onClick={() => setSelectedUpiApp("Paytm")}
                            >
                                Paytm
                            </div>

                            <div
                                className={`upi-box ${selectedUpiApp === "BHIM" ? "active-upi" : ""}`}
                                onClick={() => setSelectedUpiApp("BHIM")}
                            >
                                BHIM
                            </div>

                        </div>

                        {/* <input
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        /> */}
                        <input
                            type="text"
                            placeholder={
                                selectedUpiApp
                                    ? `Enter UPI ID (${upiSuffix[selectedUpiApp]})`
                                    : "Select UPI App First"
                            }
                            value={upiId}
                            disabled={selectedUpiApp === ""}
                            onChange={(e) => {
                                let value = e.target.value;

                                // agar user @ likhe to uske baad ka remove kar do
                                value = value.split("@")[0];

                                setUpiId(value);
                            }}
                        />

                        <button
                            className="pay-btn-modal"
                            onClick={handleFakePayment}
                            disabled={processing}
                        >
                            {processing
                                ? "Processing Payment..."
                                : `Pay ₹${totalPrice.toFixed(2)}`}
                        </button>
                    </>
                )}

                {/* ===========================
            CARD SCREEN
        =========================== */}
        

                {/* {paymentMethod === "card" && !showOtp && ( */}
                {paymentMethod === "card" && !showOtp && !paymentSuccess && (
                    <>
                        <button
                            className="back-btn"
                            onClick={() => setPaymentMethod("")}
                        >
                            <FaArrowLeft />
                        </button>

                        <h2>Card Payment</h2>

                        <input
                            type="text"
                            placeholder="Card Number"
                            maxLength="16"
                            value={cardData.number}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    number: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Card Holder Name"
                            value={cardData.name}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    name: e.target.value,
                                })


                            }
                        />

                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardData.expiry}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    expiry: e.target.value,
                                })
                            }
                        />

                        <input
                            type="password"
                            placeholder="CVV"
                            maxLength="3"
                            value={cardData.cvv}
                            onChange={(e) =>
                                setCardData({
                                    ...cardData,
                                    cvv: e.target.value,
                                })


                            }
                        />
                        {/* 👇 YEH CODE INPUT KE BAAD ADD KARO */}

                        {selectedUpiApp && upiId && (
                            <div className="upi-preview">
                                <span>Your UPI ID</span>

                                <h4>
                                    {upiId}
                                    {upiSuffix[selectedUpiApp]}
                                </h4>
                            </div>
                        )}

                        <button
                            className="pay-btn-modal"
                            onClick={handleFakePayment}
                            disabled={processing}
                        >
                            {processing
                                ? "Processing Payment..."
                                : `Pay ₹${totalPrice.toFixed(2)}`}
                        </button>
                    </>
                )}

                {/* ===========================
                    OTP SCREEN
                =========================== */}

                {showOtp && !paymentSuccess && (
                    <>
                        <h2>OTP Verification</h2>

                        <p>
                            Enter the 6 digit OTP sent to your mobile
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button
                            className="pay-btn-modal"
                            onClick={verifyOtp}
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {/* Payment Success Screen */}


                {paymentSuccess && (
                    <div className="success-payment">

                        <FaCheckCircle className="success-icon" />

                        <h2>Payment Successful</h2>

                        <p>Your payment has been completed successfully.</p>

                        <div className="payment-info">

                            <div className="info-row">
                                <span>Transaction ID</span>
                                <strong>{transactionId}</strong>
                            </div>

                            <div className="info-row">
                                <span>Payment Method</span>
                                <strong>
                                    {paymentMethod === "upi"
                                        ? "UPI"
                                        : "Debit / Credit Card"}
                                </strong>
                            </div>

                            <div className="info-row">
                                <span>Amount</span>
                                <strong>
                                    ₹{totalPrice.toFixed(2)}
                                </strong>
                            </div>

                            <div className="info-row">
                                <span>Date & Time</span>
                                <strong>{paymentTime}</strong>
                            </div>

                        </div>

                        <small>
                            Redirecting to Order Success...
                        </small>

                    </div>
                )}



            </div>
        </div>
    );
};

export default PaymentModal;