const express = require('express');
const dotenv = require('dotenv');
const cartRoutes = require('./routes/cartRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require('./config/db');  // your mongoose connection file

dotenv.config();
const app = express();

app.use(express.json());

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

// Connect to MongoDB before the server starts
connectDB();

module.exports = app;
