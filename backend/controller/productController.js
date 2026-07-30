const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");

// Get All Products
const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create Product
const createproduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      keyFeatures,
      specifications
    } = req.body;

    let ImageUrl = "";

    // Handle main image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      ImageUrl = result.secure_url;
    } else if (req.body.imageUrl) {
      ImageUrl = req.body.imageUrl;
    }

    // Handle multiple images
    let images = [];
    if (req.body.images) {
      images = JSON.parse(req.body.images);
    }

    // If main image exists and images array is empty, add main image to images
    if (ImageUrl && images.length === 0) {
      images.push(ImageUrl);
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      ImageUrl,
      images,
      keyFeatures: keyFeatures ? JSON.parse(keyFeatures) : [],
      specifications: specifications ? JSON.parse(specifications) : {},
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Product - COMPLETE WORKING VERSION
const updateProduct = async (req, res) => {
  console.log("BODY =>", req.body);
  console.log("FILE =>", req.file);
  console.log("PARAMS =>", req.params);

  try {
    // Find the product
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update basic fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // Update keyFeatures if provided
    if (req.body.keyFeatures) {
      try {
        const keyFeatures = JSON.parse(req.body.keyFeatures);
        if (keyFeatures.length > 0) {
          product.keyFeatures = keyFeatures;
        }
      } catch (error) {
        console.error("Error parsing keyFeatures:", error);
      }
    }

    // Update specifications if provided
    if (req.body.specifications) {
      try {
        const specifications = JSON.parse(req.body.specifications);
        if (Object.keys(specifications).length > 0) {
          product.specifications = specifications;
        }
      } catch (error) {
        console.error("Error parsing specifications:", error);
      }
    }

    // Update extra product images
    if (req.body.images) {
      try {
        product.images = JSON.parse(req.body.images);
      } catch (error) {
        console.error("Error parsing images:", error);
      }
    }



    // ========== MAIN IMAGE UPDATE LOGIC ==========
    let oldImageUrl = product.ImageUrl;

    // Case 1: New file uploaded
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const newImageUrl = result.secure_url;

      // Remove old image completely
      product.images = product.images.filter(
        img => img !== oldImageUrl
      );


      // Replace main image
      product.ImageUrl = newImageUrl;


      // Add new image at first position
      product.images = [
        newImageUrl,
        ...product.images
      ];
      // Optional: Delete old image from Cloudinary
      if (oldImageUrl) {
        try {
          const publicId = oldImageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
          console.log("Old image deleted from Cloudinary:", publicId);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }
    }
    // Case 2: New image URL provided in body
    else if (req.body.imageUrl && req.body.imageUrl !== oldImageUrl) {
      const newImageUrl = req.body.imageUrl;

      // Remove old main image from images array
      product.images = product.images.filter(img => img !== oldImageUrl);

      // Update main ImageUrl
      product.ImageUrl = newImageUrl;

      // Add new main image at the beginning of images array
      product.images.unshift(newImageUrl);
    }
    // ========== END MAIN IMAGE UPDATE LOGIC ==========

    // Ensure main image is always at the beginning of images array

    // Remove duplicate images
    product.images = [...new Set(product.images)];


    // Keep main image first
    product.images = [
      product.ImageUrl,
      ...product.images.filter(
        img => img !== product.ImageUrl
      )
    ];
    // Save the updated product
    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete main image from Cloudinary
    if (product.ImageUrl) {
      try {
        const publicId = product.ImageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        console.log("Main image deleted from Cloudinary:", publicId);
      } catch (error) {
        console.error("Error deleting main image:", error);
      }
    }

    // Delete all additional images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        if (imageUrl !== product.ImageUrl) {
          try {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            console.log("Additional image deleted from Cloudinary:", publicId);
          } catch (error) {
            console.error("Error deleting additional image:", error);
          }
        }
      }
    }

    // Delete product from database
    await product.deleteOne();

    res.status(200).json({
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createproduct,
  updateProduct,
  deleteProduct,
};