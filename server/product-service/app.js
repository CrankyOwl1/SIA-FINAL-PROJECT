const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Service API',
      version: '1.0.0',
      description: 'API documentation for Product Service in EverydayBaskets',
    },
    servers: [
      {
        url: 'http://localhost:5004',
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your annotated route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/products', productRoutes);

module.exports = app;
