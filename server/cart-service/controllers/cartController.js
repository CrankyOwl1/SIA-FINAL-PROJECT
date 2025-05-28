const Cart = require('../models/Cart');
const axios = require('axios');

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5004';

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ userId, items: [] });

    const itemsWithDetails = await Promise.all(cart.items.map(async item => {
      try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${item.productId}`);
        const product = response.data;
        return {
          product,
          quantity: item.quantity
        };
      } catch {
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
        item => item.productId.toString() === productId.toString()
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // No cart found, just return success
      return res.status(200).json({ message: 'Cart already empty' });
    }

    // Clear the items array
    cart.items = [];

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};



module.exports = {
  getCart,
  addToCart,
  clearCart

};
