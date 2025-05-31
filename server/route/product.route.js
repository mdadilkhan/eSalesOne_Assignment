const express = require('express');
const { authToken } = require('../middleware/authenticateToken')
const {getAllProducts,getProductById,} = require('../controller/product.controller');



const productRouter = express.Router();


productRouter.get('/products', getAllProducts);
productRouter.get('/products/:id', getProductById);

module.exports = productRouter;
