const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required:true ,
    
  },

  monthlyfee: {
    type: String,
    required:true
  },

  
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('product', productSchema);