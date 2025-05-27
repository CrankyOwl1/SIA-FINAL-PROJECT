

// GET /api/cart/:userId
const Cart = require('../models/Cart');
const axios = require('axios');

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5004'; // your product service base URL

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ userId, items: [] });

    // Fetch product details for each item
    const itemsWithDetails = await Promise.all(cart.items.map(async item => {
      try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${item.productId}`);
        const product = response.data;
        return {
          product,
          quantity: item.quantity
        };
      } catch (err) {
        // If product service call fails, still return productId with quantity
        return {
          product: { _id: item.productId, name: 'Unknown Product' },
          quantity: item.quantity
        };
      }
    }));

    res.status(200).json({ userId, items: itemsWithDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};


// POST /api/cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || typeof quantity !== 'number') {
    return res.status(400).json({ message: 'userId, productId, and quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const index = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity; // Increment quantity
      } else {
        cart.items.push({ productId, quantity }); // Add new item
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

// DELETE /api/cart/:userId
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  clearCart,
};
