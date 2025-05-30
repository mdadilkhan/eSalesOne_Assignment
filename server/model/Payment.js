const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  method: String,
  status: { type: String, enum: ['Success', 'Failed'], default: 'Success' },
  transactionId: String,
  paidAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
