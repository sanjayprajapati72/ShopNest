

import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {

    // ================= NEW UPDATE =================
    // Home Page -> Sirf Main Image Show Hogi
    // ================= END UPDATE =================

    const mainImage =
        product.images && product.images.length > 0
            ? product.images[0]
            : product.ImageUrl;

    return (
        <div className="product-card">

            {/* ================= NEW UPDATE ================= */}
            {/* Home Page Main Image */}
            <img
                src={mainImage}
                alt={product.name}
                className="product-image"
            />
            {/* ================= END UPDATE ================= */}

            <div className="product-info">

                <h3 className="product-name">
                    {product.name}
                </h3>

                {/* ================= NEW UPDATE ================= */}
                <p className="product-price">
                    ₹{Number(product.price).toLocaleString()}
                </p>
                {/* ================= END UPDATE ================= */}

                {/* ================= NEW UPDATE ================= */}
                <p className="stock">
                    Stock : {product.stock}
                </p>
                {/* ================= END UPDATE ================= */}

                {/* ================= NEW UPDATE ================= */}
                <p className="category">
                    {product.category}
                </p>
                {/* ================= END UPDATE ================= */}

                <Link
                    to={`/products/${product._id}`}
                    className="view-details-button"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
};

export default ProductCard;