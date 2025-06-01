const express = require('express');

const {addCartItem} = require('../controller/cart.controller');
const { authToken } = require('../middleware/authenticateToken');


const cartRouter=express.Router();

cartRouter.post('/user/cart-item',authToken,addCartItem)








module.exports = cartRouter;