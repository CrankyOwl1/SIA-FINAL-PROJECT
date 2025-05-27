// server.js
const app = require('./app'); // Import the Express app
const mongoose = require('mongoose'); // If you're using MongoDB
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 5004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/product-service';

// Optional: Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  // Start the server after DB connection is successful
  app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
