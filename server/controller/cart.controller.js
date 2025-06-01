// routes/user.js or routes/cart.js
const User = require('../model/Users');

// Add item to user's cart
const addCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find(item => item.product_id.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product_id: productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    addCartItem
};
