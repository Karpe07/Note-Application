//imported a mongoose 
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

//created a function which is make the connection with the moongoDB
async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application if the connection fails
  }
}

//exporting the model to use it anywhere
export default connectToMongo;
// module.exports = connectToMongo;
