import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', stock: '', imageUrl: ''
    });
    const [image, setImage] = useState(null);

    // ================= STEP 3 UPDATE START =================

    // Multiple Images
    const [images, setImages] = useState([""]);

    // Product Highlights
    const [keyFeatures, setkeyFeatures] = useState([""]);


    const [specifications, setSpecifications] = useState([
        {
            key: "",
            value: ""
        }
    ]);

    // ================= STEP 3 UPDATE END =================
    const [loading, setLoading] = useState(false);

    if (!user || user.role !== 'admin') {
        navigate('/');
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image && !formData.imageUrl) return alert('Please upload an image or enter  an imageUrl');

        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('image', image);
        data.append("imageUrl", formData.imageUrl);

        // ================= STEP 3 UPDATE START =================

        // Extra Images
        data.append("images", JSON.stringify(images));

        // Highlights
        data.append(
            "keyFeatures",

            JSON.stringify(keyFeatures)
        );

       



        const specificationObject = {};

        specifications.forEach((item) => {
            if (item.key.trim() !== "") {
                specificationObject[item.key] = item.value;
            }
        });

        data.append(
            "specifications",
            JSON.stringify(specificationObject)
        );

        // ================= STEP 3 UPDATE END =================


        try {
            // const res = await fetch('/api/products', {
                const res = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${user.token}` },
                body: data
            });
            const responseData = await res.json();
            if (res.ok) {
                alert('Product created successfully with Cloudinary Image URl!');
                navigate('/shop');
            } else {
                alert(responseData.message || 'Error creating product');
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };
    // ============================
    const inputStyle = {
        width: "100%",
        padding: "12px",
        border: "1px solid #27272a",
        borderRadius: "8px",
        background: "#09090b",
        color: "#fff",
        fontSize: "15px",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.3s ease"
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', background: '#18181b', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>

            <h2 style={{ color: '#f97316', marginBottom: '20px', }}>Add New Product</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <input type="text" placeholder="Product Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />

                <textarea placeholder="Description" required rows="4" onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={inputStyle} />

                <input type="text" placeholder="Price" required onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={inputStyle} />

                <select
                    style={inputStyle}
                    required
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            category: e.target.value
                        })
                    }
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
                <input type="text" placeholder="Stock Quantity" required onChange={(e) => setFormData({ ...formData, stock: e.target.value })} style={inputStyle} />

                <div style={{ padding: '15px', border: '1px dashed #f97316', borderRadius: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#a1a1aa' }}>Upload Product Image (Cloudinary)</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ color: '#fff' }} />
                </div>

                <p style={{ textAlign: 'center', color: '#a1a1aa', margin: '5px 0' }}>OR</p>

                {/* <input type="text" placeholder="Paste Image URL / Image Path" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} style={inputStyle}></input> */}

                {/* {formData.imageUrl && (<p style={{ color: "#22c55e", fontSize: "14px", marginTop: "6px", fontWeight: "500", }}>✅ Image URL Added Successfully</p>)} */}

                <h3 style={{ color: "#f97316" }}>
                    Extra Product Images
                </h3>

                {
                    images.map((img, index) => (

                        <input
                            key={index}
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

                    ))
                }

                <button
                    type="button"
                    className="btn"
                    onClick={() => setImages([...images, ""])}
                >
                    + Add Extra Image
                </button>

                {/* ================= STEP 3 UPDATE START ================= */}

                <h3 style={{ color: "#f97316" }}>
                    🔑 Key Features
                </h3>

                {
                    keyFeatures.map((item, index) => (

                        <input

                            key={index}

                            type="text"

                            placeholder="keyFeatures"

                            value={item}

                            onChange={(e) => {

                                const arr = [...keyFeatures];

                                arr[index] = e.target.value;

                                setkeyFeatures(arr);

                            }}

                            style={inputStyle}

                        />

                    ))
                }

                <button

                    type="button"

                    className="btn"

                    onClick={() => setkeyFeatures([...keyFeatures, ""])}

                >

                    + Add key Features

                </button>

                


                <h3 style={{ color: "#f97316" }}>
                    Specifications
                </h3>

                {
                    specifications.map((item, index) => (

                        <div
                            key={index}
                            style={{
                                display: "flex",
                                gap: "10px"
                            }}
                        >

                            <input
                                type="text"
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
                                type="text"
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

                    ))
                }

                <button
                    type="button"
                    className="btn"
                    onClick={() =>
                        setSpecifications([
                            ...specifications,
                            {
                                key: "",
                                value: ""
                            }
                        ])
                    }
                >
                    + Add Specification
                </button>

                {/* ================= STEP 3 UPDATE END ================= */}


                <button type="submit" disabled={loading} className="btn" style={{ marginTop: '10px' }}>{loading ? 'Uploading & Creating...' : 'Publish Product'}</button>
            </form>

        </div>
    )
};



export default AddProduct;