const Order = require('../models/Order');
const Product = require('../../product-service/models/Product'); // import Product model

const getOrders = async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { userId } : {};
    const orders = await Order.find(filter).populate('items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'userId and items are required' });
  }

  try {
    const order = new Order({ userId, items });
    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};


module.exports = {
  getOrders,
  createOrder,
};
