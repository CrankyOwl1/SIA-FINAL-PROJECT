const express = require('express');
const router = express.Router();
const { getOrders, createOrder } = require('../controllers/orderController');

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders for a specific user by userId param
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders for the user
 */
router.get('/user/:userId', (req, res, next) => {
  req.query.userId = req.params.userId;
  getOrders(req, res, next);
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders or filter by userId query param
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID to filter orders
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', getOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', createOrder);

module.exports = router;
