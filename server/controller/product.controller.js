const Product = require('../model/Products')



const createProduct = async (req, res) => {
    try {
      const { title, description, images, category, thumbnail, brand, price, stock } = req.body;
      const product = new Product({ title, description, images, category,thumbnail, brand, price, stock });
      await product.save();
  
      return res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };



  const getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const totalProducts = await Product.countDocuments();
      const products = await Product.find().skip(skip).limit(limit);
  
      res.status(200).json({
        page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  



const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  


  module.exports={
    createProduct,
    getAllProducts,
    getProductById
  }