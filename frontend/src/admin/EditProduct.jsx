import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../config/api";

/**
 * EditProduct Component
 * 
 * This component provides a form for editing an existing product.
 * It fetches product data by ID, allows modification of all fields,
 * and submits updates to the server via PUT request.
 */
const EditProduct = () => {
    // Get product ID from URL parameters
    const { id } = useParams();
    // Get authenticated user from context
    const { user } = useContext(AuthContext);
    // Navigation hook for redirecting after successful update
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
        imageUrl: "",
        images: [],
        keyFeatures: []
    });

    // State for specifications (key-value pairs)
    const [specifications, setSpecifications] = useState([
        { key: "", value: "" }
    ]);

    // State for main product image file
    const [image, setImage] = useState(null);
    // State for additional product images
    const [images, setImages] = useState([]);

    const [showImageEditor, setShowImageEditor] = useState(false);

    // Loading state for form submission
    const [loading, setLoading] = useState(false);



    /**
     * Fetch product data when component mounts or ID changes
     */
    useEffect(() => {
        const fetchProduct = async () => {
            // const res = await fetch(`/api/product/${id}`);
            // const res = await fetch(`/api/products/${id}`);
            const res = await fetch(`${API_URL}/api/products/${id}`);
            const data = await res.json();
            console.log(data);

            // setFormData({
            //     name: data.name || "",
            //     description: data.description || "",
            //     price: data.price || "",
            //     category: data.category || "",
            //     stock: data.stock || "",
            //     // image: data.image || "",
            //     image: data.ImageUrl || "",
            //     imageUrl: data.ImageUrl || "",
            //     images: data.images || [],
            //     keyFeatures: data.keyFeatures || [],
            // });


            setFormData({
                name: data.name || "",
                description: data.description || "",
                price: data.price || "",
                category: data.category || "",
                stock: data.stock || "",
                image: "",                  // <-- CHANGE
                imageUrl: data.ImageUrl || "",
                images: data.images || [],
                keyFeatures: data.keyFeatures || [],
            });
            setImages(data.images || []);

            // Convert specifications object to array for editing
            if (data.specifications) {
                setSpecifications(
                    Object.entries(data.specifications).map(([key, value]) => ({
                        key,
                        value
                    }))
                );
            }
        };
        fetchProduct();
    }, [id]);

    /**
     * Handle form submission to update product
     * Uses FormData for multipart/form-data encoding (supports file uploads)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();

        // Append basic product fields
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);


        if (image) data.append('image', image);

        if (formData.imageUrl) {
            data.append("imageUrl", formData.imageUrl);
        }
        else {
            data.append("imageUrl", "");
        }

        // data.append("imageUrl", formData.imageUrl);
        // if (!image && formData.imageUrl.trim() !== "") {
        //     data.append("imageUrl", formData.imageUrl);
        // }

        // Convert specifications array to object
        const specificationObject = {};
        specifications.forEach((item) => {
            if (item.key.trim() !== "") {
                specificationObject[item.key] = item.value;
            }
        });
        data.append("specifications", JSON.stringify(specificationObject));

        // Append key features as JSON string
        data.append("keyFeatures", JSON.stringify(formData.keyFeatures));

        // Append extra images as JSON string
        data.append("images", JSON.stringify(images));

        // Send PUT request to update product
        // const res = await fetch(`/api/products/${id}`, {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${user.token}` },
            body: data
        });

        setLoading(false);

        if (res.ok) {
            alert('Product updated successfully!');
            navigate('/admin/products');
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin:'100px auto 40px',
            // margin: '40px auto',
            background: '#18181b',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <h2 style={{ color: '#f97316', marginBottom: '20px' }}>
                Edit Product
            </h2>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {/* Product Name Input */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                />

                {/* Product Description Textarea */}
                <textarea
                    placeholder="Description"
                    required
                    value={formData.description}
                    rows="4"
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={inputStyle}
                />

                {/* Product Price Input */}
                <input
                    type="text"
                    placeholder="Price"
                    value={formData.price}
                    required
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={inputStyle}
                />

                {/* Category Dropdown */}
                <select
                    style={inputStyle}
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="">Select Category</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Watch">Watch</option>
                    <option value="TV">TV</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Grocery">Grocery</option>
                </select>

                {/* Stock Quantity Input */}
                <input
                    type="text"
                    placeholder="Stock Quantity"
                    value={formData.stock}
                    required
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    style={inputStyle}
                />

                {/* Main Image Upload Section */}
                <div style={{
                    padding: '15px',
                    border: '1px dashed #f97316',
                    borderRadius: '8px'
                }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '10px',
                        color: '#a1a1aa'
                    }}>
                        Main Product Image
                    </label>

                    {/* Display current image with action buttons */}
                    {(formData.imageUrl || formData.image) && (
                        <div style={{ marginTop: "15px" }}>
                            <img
                                src={formData.imageUrl || formData.image}
                                alt="Product"
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    objectFit: "contain",
                                    borderRadius: "10px",
                                    border: "1px solid #333",
                                    display: "block",
                                    marginBottom: "10px"
                                }}
                            />

                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button
                                    type="button"
                                    style={{
                                        ...buttonStyle,
                                        background: '#f97316'
                                    }}
                                    onClick={() => {
                                        setShowImageEditor(!showImageEditor);
                                    }}
                                >
                                    {showImageEditor ? "✏️ Close Image Editor" : "✏️ Edit Main Image"}
                                </button>

                                <button
                                    type="button"
                                    style={{
                                        ...buttonStyle,
                                        background: "#dc2626"
                                    }}
                                    onClick={() => {
                                        setImage(null);
                                        setFormData({
                                            ...formData,
                                            image: "",
                                            ImageUrl: ""
                                        });
                                        setShowImageEditor(false);
                                    }}
                                >
                                    🗑 Remove Main Image
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Image Editor - shown when Edit button is clicked */}
                    {showImageEditor && (
                        <div style={{
                            marginTop: '20px',
                            padding: '20px',
                            border: '1px solid #f97316',
                            borderRadius: '8px',
                            background: 'rgba(249, 115, 22, 0.05)'
                        }}>
                            <h4 style={{ color: '#f97316', marginBottom: '15px' }}>
                                Upload New Image
                            </h4>

                            <input
                                id="mainImageInput"
                                type="file"
                                accept="image/*"
                                // onChange={(e) => {
                                //     const file = e.target.files[0];
                                //     if (!file) return;
                                //     setImage(file);
                                //     setFormData({
                                //         ...formData,
                                //         image: file,
                                //         imageUrl: URL.createObjectURL(file)
                                //     });
                                // }}

                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (!file) return;

                                    const preview = URL.createObjectURL(file);

                                    setImage(file);

                                    setFormData((prev) => ({
                                        ...prev,
                                        image: file,
                                        imageUrl: preview,
                                    }));
                                }}
                                style={{ color: "#fff", marginBottom: '15px' }}
                            />

                            <p style={{
                                textAlign: "center",
                                margin: "15px 0",
                                color: "#999",
                                fontWeight: "bold"
                            }}>
                                OR
                            </p>

                            {/* <input
                                type="text"
                                placeholder="Paste Image URL"
                                value={formData.imageUrl}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        imageUrl: e.target.value,
                                        image: e.target.value,
                                    })
                                }
                                style={inputStyle}
                            /> */}



                            <input
                                type="text"
                                placeholder="Paste Image URL"
                                value={formData.imageUrl}
                                onChange={(e) => {
                                    setImage(null); // Agar file select thi to hata do

                                    setFormData((prev) => ({
                                        ...prev,
                                        imageUrl: e.target.value,
                                    }));
                                }}
                                style={inputStyle}
                            />

                            {/* Preview new image if available */}
                            {(formData.imageUrl || formData.image) && (
                                <img
                                    // src={formData.imageUrl || (formData.image && URL.createObjectURL(formData.image))}

                                    src={
                                        formData.imageUrl
                                            ? formData.imageUrl
                                            : formData.image instanceof File
                                                ? URL.createObjectURL(formData.image)
                                                : ""
                                    }
                                    alt="New Preview"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        marginTop: "15px",
                                        objectFit: "contain",
                                        borderRadius: "10px",
                                        border: "1px solid #333"
                                    }}
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Extra Images Section */}
                <h3 style={{ color: "#f97316" }}>
                    Extra Product Images
                </h3>

                {images.map((img, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder={`Extra Image ${index + 1}`}
                            value={img}
                            onChange={(e) => {
                                const arr = [...images];
                                arr[index] = e.target.value;
                                setImages(arr);
                            }}
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const arr = [...images];
                                arr.splice(index, 1);
                                setImages(arr);
                            }}
                            style={buttonStyle}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn"
                    onClick={() => setImages([...images, ""])}
                    style={buttonStyle}
                >
                    + Add Extra Image
                </button>

                {/* Key Features Section */}
                <h3 style={{ color: "#f97316" }}>
                    🔑 Key Features
                </h3>

                {formData.keyFeatures.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input
                            value={feature}
                            style={inputStyle}
                            onChange={(e) => {
                                const arr = [...formData.keyFeatures];
                                arr[index] = e.target.value;
                                setFormData({
                                    ...formData,
                                    keyFeatures: arr
                                });
                            }}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    className="btn"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            keyFeatures: [...formData.keyFeatures, ""]
                        })
                    }
                    style={buttonStyle}
                >
                    + Add Key Feature
                </button>

                {/* Specifications Section */}
                <h3 style={{ color: "#f97316" }}>
                    Specifications
                </h3>

                {specifications.map((item, index) => (
                    <div key={index} style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                        width: "100%",
                        flexWrap: "wrap",
                    }}>
                        <input
                            placeholder="Specification Name"
                            value={item.key}
                            style={inputStyle}
                            onChange={(e) => {
                                const arr = [...specifications];
                                arr[index].key = e.target.value;
                                setSpecifications(arr);
                            }}
                        />
                        <input
                            placeholder="Specification Value"
                            value={item.value}
                            style={inputStyle}
                            onChange={(e) => {
                                const arr = [...specifications];
                                arr[index].value = e.target.value;
                                setSpecifications(arr);
                            }}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    className="btn"
                    onClick={() =>
                        setSpecifications([
                            ...specifications,
                            { key: "", value: "" }
                        ])
                    }
                    style={buttonStyle}
                >
                    + Add Specification
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn"
                    style={{
                        marginTop: '10px',
                        ...buttonStyle
                    }}
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

// Shared input styles
const inputStyle = {
    padding: '12px',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',

     width: "100%",
    boxSizing: "border-box"
};

// Shared button styles (added for consistency)
const buttonStyle = {
    padding: '10px 16px',
    background: '#f97316',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s'
};

export default EditProduct;