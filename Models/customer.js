const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  surname: {
    type: String,
    required: true ,
   
  },

  idNumber: {
    type: String,
    required: true
  },

  
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('customer', customerSchema);