const express = require('express');
const { signup, login,logout} = require('../controller/auth.controller');




const authRouter=express.Router();

authRouter.post('/auth/signup',signup)
authRouter.post('/auth/login',login)
authRouter.post("/auth/logout", logout);





module.exports = authRouter;