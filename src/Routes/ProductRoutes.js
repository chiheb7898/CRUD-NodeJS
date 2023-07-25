const express = require("express");
const { upload } = require('../Middleware/upload');

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts
} = require("../Controllers/ProductController");
 
const router = express.Router();

router.route("/search").get(searchProducts)
 
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProductById).put(upload.single('image'),updateProduct).delete(deleteProduct);

module.exports = router;