const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/test"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB URI
// const dbURI = 'mongodb://localhost/mydatabase';

// Connect to MongoDB
const connectToMongo = async () => {
    try {
      const conn = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

module.exports =  connectToMongo;