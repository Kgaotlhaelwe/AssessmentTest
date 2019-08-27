const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const soldProducts = new Schema({
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

paymentType: {
    type: String,
    required: true
  },

  productQuestion: {
    type: Array,
    required: true
  },


  productAnswer: {
    type: Array,
    required: true
  },

  register_date: {
    type: Date,
    default: Date.now
  }


});

module.exports = mongoose.model('soldProduct', soldProducts);