
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productId: String,
    name: String,
    quantity: Number,
    price: Number
});

const orderSchema = new mongoose.Schema({
    userId: String,
    items: [itemSchema],
    totalAmount: Number
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
