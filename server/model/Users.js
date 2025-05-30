const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
