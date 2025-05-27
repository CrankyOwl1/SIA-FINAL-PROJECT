const express = require('express');
const router = express.Router();
const { getCart, addToCart, clearCart } = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/:userId', getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add or update an item in a user's cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               productId:
 *                 type: string
 *                 example: "product456"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added or updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', addToCart);

/**
 * @swagger
 * /api/cart/{userId}:
 *   delete:
 *     summary: Clear a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete('/:userId', clearCart);

module.exports = router;
