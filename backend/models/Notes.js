// import mongoose, { model } from 'mongoose';
// const mongoose = require('mongoose');
// const { model } = require('mongoose');
// const { Schema } = mongoose;
import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required : true
 },
  tag:{
    type : String,
    default : "Genaral"
  },
  date:{
    type : Date,
    default : Date.now
  }

  
});

const notes = mongoose.model('notes' , NotesSchema)

export default notes;