const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false, // deprecated in mongoose 6+
      // useCreateIndex: true,    // deprecated in mongoose 6+
    });
    console.log('MongoDB connected (Cart Service)');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
