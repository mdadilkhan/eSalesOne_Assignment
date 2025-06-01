const User = require('../model/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Login Controller
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
       console.log(email,password);
       
      if (!email || !password) {
        return res.status(400).json({ message: "All filed is required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Password" });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
  
      // console.log(token);

      const data={
        _id:user._id || null,
        name:user.name || null,
        email:user.email || null,
        cart:user.cart || null,
        isAdmin:user.isAdmin || null
      }

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
    
      return res.status(200).json({ message: "Login Success",data:data});
    } catch (err) {
      console.log(err);
    }
  };
  

const logout = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0), // Expire immediately
    });
    res.status(200).json({ message: "Logged out successfully" });
  };

  module.exports={
    signup,
    login,
    logout
  }