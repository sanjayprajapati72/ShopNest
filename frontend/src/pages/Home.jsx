

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API_URL from "../config/api";
// import { backendURL } from "../config";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const res = await fetch("/api/products");
                const res = await fetch(`${ API_URL}/api/products`);
                const data = await res.json();

                setProducts(data.slice(0, 11));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            <div className="hero-banner">
                <h1>Welcome to ShopNest</h1>
                <p>Discover the best products at unbeatable prices.</p>

                <Link to="/shop" className="btn-shop">
                    Shop Now
                </Link>
            </div>

            <h2>Featured Products</h2>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;