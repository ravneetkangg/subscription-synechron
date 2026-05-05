const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Not hashing for simplicity as requested
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  address: { type: String },
  phoneNumber: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
