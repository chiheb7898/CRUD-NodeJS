const ProductService = require("../Services/ProductService");
const { upload } = require('../Middleware/upload');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json({ data: products, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    upload.single('image')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const imageUrl = req.file ? req.file.filename : '';
      const product = await ProductService.createProduct({
        ...req.body,
        image: imageUrl,
      });
      console.log(req.body.image)

      res.json({ data: product, status: 'success' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const tmpproduct = await ProductService.getProductById(req.params.id);

    const handleImageUpload = () => {
      return new Promise((resolve, reject) => {
        upload.single('image')(req, res, function (err) {
          if (err) {
            return reject(err);
          }
          const imageUrl = req.file ? req.file.filename : '';
          req.body.image = imageUrl;
          resolve();
        });
      });
    };

    if (req.file) {
      await handleImageUpload();
    } else {
      req.body.image = tmpproduct.image;
    }

    const product = await ProductService.updateProduct(req.params.id, req.body);
    if (product){
      ProductService.Deleteimage(tmpproduct.image);
    }
    res.json({ data: product, status: 'success' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductService.deleteProduct(productId);
    if (product){
      ProductService.Deleteimage(product.image);
    }
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { searchTerm } = req.query; 

    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term not provided.' });
    }

    const matchedProducts = await ProductService.searchProducts(searchTerm);
    res.json({ data: { products: matchedProducts }, status: 'success' });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: error.message });
  }
};