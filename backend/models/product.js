



const mongoose = require("mongoose");

// ================= Review Schema =================
const reviewSchema = new mongoose.Schema(
{
    user: {
        type: String,
        default: ""
    },

    rating: {
        type: Number,
        default: 5
    },

    comment: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    _id: false
});

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    // Main Image
    ImageUrl: {
        type: String,
        required: true
    },

    // Multiple Images
    images: [
        {
            type: String,
            default: ""
        }
    ],

    // ================= Key Features =================
    keyFeatures: [
        {
            type: String,
            default: ""
        }
    ],

    // ================= Dynamic Specifications =================
    specifications: {
        type: Map,
        of: String,
        default: {}
    },

    // Product Reviews
    reviews: [reviewSchema],

    createdAt: {
        type: Date,
        default: Date.now
    },

    rating: {
        type: Number,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    }

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;