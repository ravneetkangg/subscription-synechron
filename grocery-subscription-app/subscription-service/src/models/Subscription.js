const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Simple string for simplicity
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], required: true },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  startDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
