// import mongoose, { model } from 'mongoose';
import mongoose from 'mongoose';

// const mongoose = require('mongoose');
// const { model } = require('mongoose');

const { Schema } = mongoose;

// created a user schema to store the data into the mongoDb 
const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required : true,
    unique : true
  },
  password:{
    type : String,
    required : true
  },
  date:{
    type : Date,
    default : Date.now
  }

  
});
const User = mongoose.model('user' , UserSchema)
// module.exports = User
export default User;