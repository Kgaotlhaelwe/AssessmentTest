const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth') ;


const Product = require('../Models/product');

router.post('/' ,auth , (req, res) => {

    
    const newProduct = new  Product({
        name: req.body.name ,
        description:req.body.description ,
        monthlyfee:req.body.monthlyfee
    });

    newProduct.save().then(item => {
        res.json(item)
    })
})


// @route   GET api/product
// @desc    Get All Items
// @access  Public
router.get('/',   (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

module.exports = router 