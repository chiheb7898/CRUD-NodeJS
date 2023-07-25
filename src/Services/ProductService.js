const ProductModel = require("../models/product");
const fs = require('fs');
const path = require('path');
 
exports.getAllProducts = async () => {
  return await ProductModel.find();
};
 
exports.createProduct = async (product) => {
  return await ProductModel.create(product);
};
exports.getProductById = async (id) => {
  return await ProductModel.findById(id);
};
 
exports.updateProduct = async (id, product) => {
  return await ProductModel.findByIdAndUpdate(id, product,{ new: true });
};
 
exports.deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id);
};

exports.searchProducts = async (searchTerm) => {
  try {
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, 
        { description: { $regex: searchTerm, $options: 'i' } }, 
      ],
    });
    return products;
  } catch (err) {
    console.error('Error searching for products:', err);
    throw new Error('An error occurred while searching for products.');
  }
};

exports.Deleteimage = (imagename) => {
  if (imagename) {
    const imagePath = path.join(__dirname, '..', 'Uploads', imagename);

    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
        console.log(`Deleted image: ${imagePath}`);
      } catch (unlinkError) {
        console.error('Error deleting image:', unlinkError);
      }
    } else {
      console.log('Image file not found:', imagePath);
    }
  }
};




