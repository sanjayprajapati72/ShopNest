
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

// ================= NEW UPDATE =================
import ProductCard from "../components/ProductCard";
// ================= END UPDATE =================

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        // ================= NEW UPDATE =================
        fetch(`${API_URL}/api/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
        // ================= END UPDATE =================

    }, []);

    return (
        <>
            {/* Breadcrumb */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "25px auto 10px",
                    padding: "0 20px",
                    color: "#a1a1aa",
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: "#f97316",
                        textDecoration: "none",
                        fontWeight: "600",
                    }}
                >
                    Home
                </Link>

                <span style={{ margin: "0 8px" }}>/</span>

                <span
                    style={{
                        color: "#f97316",
                        fontWeight: "600",
                    }}
                >
                    Shop
                </span>
            </div>

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "auto",
                    padding: "20px",
                }}
            >
                <h1
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    Our Products
                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(260px,1fr))",
                        gap: "25px",
                    }}
                >
                    {products.length > 0 ? (

                        // ================= NEW UPDATE =================
                        products.map((item) => (
                            <ProductCard
                                key={item._id}
                                product={item}
                            />
                        ))
                        // ================= END UPDATE =================

                    ) : (
                        <h2
                            style={{
                                color: "#fff",
                                textAlign: "center",
                                gridColumn: "1/-1",
                            }}
                        >
                            No Products Found
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default Shop;