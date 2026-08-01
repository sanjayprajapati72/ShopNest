



import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setBuyNowItem } from "../redux/cartSlice";
import API_URL from "../config/api";
// import { backendURL } from "../config";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [showDescription, setShowDescription] = useState(false);
    const [showSpecification, setShowSpecification] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // const res = await fetch(`/api/products/${id}`);
                const res = await fetch(`${ API_URL}/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        if (product.stock <= 0) {
            alert("❌ Product is Out of Stock");
            return;
        }

        dispatch(
            addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.ImageUrl,
                stock: product.stock,
                qty: 1,
            })
        );

        alert("✅ Successfully added to your cart!");
    };

    const handleBuyNow = () => {
        if (!product) return;

        if (product.stock <= 0) {
            alert("❌ Product is Out of Stock");
            return;
        }

        dispatch(
            setBuyNowItem({
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.ImageUrl,
                stock: product.stock,
                qty: 1,
            })
        );

        navigate("/checkout");
    };

    if (loading) {
        return <div className="loading-container">Loading Product...</div>;
    }

    if (!product) {
        return <div className="error-container">Product Not Found</div>;
    }

    const images =
        product.images && product.images.length > 0
            ? product.images
            : [product.ImageUrl];

    return (
        <div className="product-detail-wrapper">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">
                    Home
                </Link>
                {" / "}
                <Link to="/shop" className="breadcrumb-link">
                    Shop
                </Link>
                {" / "}
                <span className="breadcrumb-current">{product.name}</span>
            </div>

            <div className="product-detail">
                {/* Left Column - Images */}
                <div className="detail-image-container">
                    <div className="main-image-wrapper">
                        <button
                            className="slider-arrow left"
                            onClick={() =>
                                setCurrentImage(
                                    currentImage === 0 ? images.length - 1 : currentImage - 1
                                )
                            }
                        >
                            ◀
                        </button>

                        <img
                            src={images[currentImage]}
                            alt={product.name}
                            className="detail-image"
                        />

                        <button
                            className="slider-arrow right"
                            onClick={() =>
                                setCurrentImage(
                                    currentImage === images.length - 1 ? 0 : currentImage + 1
                                )
                            }
                        >
                            ▶
                        </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="thumbnail-container">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`thumb-${index}`}
                                className={
                                    currentImage === index ? "thumbnail active" : "thumbnail"
                                }
                                onClick={() => setCurrentImage(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="detail-info">
                    <h2 className="product-name">{product.name}</h2>

                    <p className="product-price">
                        ₹{Number(product.price).toLocaleString()}
                    </p>

                    {/* Stock Status */}
                    <div className="stock-status">
                        {product.stock > 0 ? (
                            <span className="in-stock">✅ In Stock ({product.stock} Available)</span>
                        ) : (
                            <span className="out-of-stock">❌ Out of Stock</span>
                        )}
                    </div>

                    {/* Action Buttons - Desktop */}
                    <div className="desktop-action-buttons">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className={`add-to-cart-btn ${product.stock > 0 ? "available" : "unavailable"}`}
                        >
                            Add to Cart
                        </button>
                        <button onClick={handleBuyNow} disabled={product.stock <= 0} className="buy-now-btn">
                            Buy Now
                        </button>
                    </div>

                    {/* Key Features */}
                    <div className="key-features-section">
                        <h3 className="key-features-title">🔑 Key Features</h3>
                        {product.keyFeatures && product.keyFeatures.length > 0 ? (
                            // product.keyFeatures.map((item, index) => (
                            //     <p key={index} className="key-features-item">
                            //         • {item}
                            //     </p>
                            // ))


                            <ul className="key-features-list">
                                {product.keyFeatures?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>



                        ) : (
                            <p className="key-features-empty">No Key Features Available</p>
                        )}
                    </div>

                    {/* Accordion Sections */}
                    <div className="accordion-container">
                        {/* Description */}
                        <div
                            className="accordion-title"
                            onClick={() => setShowDescription(!showDescription)}
                        >
                            <h3>📄 Description</h3>
                            <span>{showDescription ? "▲" : "▼"}</span>
                        </div>
                        {showDescription && (
                            <div className="accordion-content">
                                <p>{product.description}</p>
                            </div>
                        )}

                        {/* Specifications */}
                        <div
                            className="accordion-title"
                            onClick={() => setShowSpecification(!showSpecification)}
                        >
                            <h3>⚙ Specifications</h3>
                            <span>{showSpecification ? "▲" : "▼"}</span>
                        </div>
                        {/* {showSpecification && (
                            <div className="accordion-content"> */}
                        {/* <p><b>Brand :</b> {product.specifications?.brand}</p>
                                <p><b>Processor :</b> {product.specifications?.processor}</p>
                                <p><b>RAM :</b> {product.specifications?.ram}</p>
                                <p><b>Storage :</b> {product.specifications?.storage}</p>
                                <p><b>Display :</b> {product.specifications?.display}</p>
                                <p><b>Battery :</b> {product.specifications?.battery}</p>
                                <p><b>Warranty :</b> {product.specifications?.warranty}</p>
                                <p><b>Color :</b> {product.specifications?.color}</p> */}
                        {/* </div> */}


                        {showSpecification && (
                            <div className="accordion-content">

                                {product.specifications &&
                                    Object.entries(product.specifications).length > 0 ? (

                                    Object.entries(product.specifications).map(([key, value]) => (

                                        <p key={key}>
                                            <b>{key} :</b> {value}
                                        </p>

                                    ))

                                ) : (

                                    <p>No Specifications Available</p>

                                )}

                            </div>
                        )}


                        {/* Reviews */}
                        <div
                            className="accordion-title"
                            onClick={() => setShowReview(!showReview)}
                        >
                            <h3>⭐ Reviews</h3>
                            <span>{showReview ? "▲" : "▼"}</span>
                        </div>
                        {showReview && (
                            <div className="accordion-content">
                                <p>⭐ {product.rating} / 5</p>
                                <p>{product.numReviews} Reviews</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Action Buttons - Fixed Bottom */}
            <div className="mobile-action-buttons">
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`mobile-add-to-cart ${product.stock > 0 ? "available" : "unavailable"}`}
                >
                    Add to Cart
                </button>
                <button onClick={handleBuyNow} disabled={product.stock <= 0} className="mobile-buy-now">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
