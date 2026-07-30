 
// const express = require("express");

// const { registerUser, loginUser, getUser } = require("../controller/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { admin } = require("../middleware/adminMiddleware");
// const {getProduct,getProductById,createproduct,updateProduct,deleteProduct} =require('../controller/productController')
// const multer = require ('multer');
// const upload = multer({dest: 'uploads/'});



// const router = express.Router();

// router.route('/').get(getProduct).post(protect,admin,upload.single('image') ,createproduct);
// // router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);

// router.route("/:id").put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);

// module.exports = router;

const express = require("express");
const multer = require("multer");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  getProduct,
  getProductById,
  createproduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

/* ===========================
   GET ALL PRODUCTS
   POST NEW PRODUCT
=========================== */
router
  .route("/")
  .get(getProduct)
  .post(
    protect,
    admin,
    upload.single("image"),
    createproduct
  );

/* ===========================
   GET SINGLE PRODUCT
   UPDATE PRODUCT
   DELETE PRODUCT
=========================== */
router
  .route("/:id")
  .get(getProductById)
  .put(
    protect,
    admin,
    upload.single("image"),
    updateProduct
  )
  .delete(
    protect,
    admin,
    deleteProduct
  );

module.exports = router;