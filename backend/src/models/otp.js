const mongoose = require('mongoose');

const optSchema = new mongoose.Schema({
  email: String,
  code: String,
  expireAt: { type: Date, default: Date.now, index: { expires: '600s' } }, // Set TTL index for automatic deletion after 11 seconds
}, {
  timestamps: true,
});

module.exports = mongoose.model("Otp", optSchema);
