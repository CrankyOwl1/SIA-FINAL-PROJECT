const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Add this ref so populate works
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [itemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
