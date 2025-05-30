const express = require('express');
const { authToken } = require('../middleware/authenticateToken')
const {getAllProducts,getProductById,} = require('../controller/product.controller');



const productRouter = express.Router();


productRouter.get('/products',authToken, getAllProducts);
productRouter.get('/products/:id',authToken, getProductById);

module.exports = productRouter;
