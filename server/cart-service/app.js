const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cartRoutes = require('./routes/cartRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require('./config/db');  // your mongoose connection file

dotenv.config();
const app = express();

// ✅ Enable CORS — this is what you were missing
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend
  credentials: true,               // Only needed if you use cookies/auth headers
}));

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Cart Service is running');
});

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cart Service API',
      version: '1.0.0',
      description: 'API for managing shopping carts in EverydayBaskets',
    },
    servers: [{ url: 'http://localhost:5002' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/cart', cartRoutes);

// Connect to MongoDB
connectDB();

module.exports = app;
