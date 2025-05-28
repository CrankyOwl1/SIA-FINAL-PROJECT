const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();
const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected (Order Service)'))
  .catch(err => console.error(err));

// ✅ Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'API for managing orders',
    },
    servers: [{ url: 'http://localhost:5003' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Routes
app.use('/api/orders', orderRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Order Service is running');
});

module.exports = app;
