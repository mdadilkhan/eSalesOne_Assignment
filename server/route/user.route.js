const express = require('express');
// const { getUserDetials, getAllUsers} = require('../controllers/user.controller');
// const { authToken } = require('../middleware/authenticateToken');



const userRouter=express.Router();

userRouter.get('/user/getUserDetials',authToken,getUserDetials)








module.exports = userRouter;