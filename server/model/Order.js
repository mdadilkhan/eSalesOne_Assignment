const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentInfo: {
    method: String, // e.g. 'Stripe', 'COD'
    transactionId: String,
    paidAt: Date,
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
