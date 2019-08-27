const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth') ;


const SoldProduct = require('../Models/soldProduct');

router.post('/' , (req, res) => {

    
    const addsoldProduct = new   SoldProduct({
        name: req.body.name ,
        surname:req.body.surname ,
        idNumber:req.body.idNumber ,
        paymentType:req.body.paymentType ,
        //paymentDay:req.body.paymentType
        productQuestion:req.body.productQuestion ,
        productAnswer:req.body. productAnswer
    });

    addsoldProduct.save().then(item => {
        res.json(item)
    })
})


// @route   GET api/product
// @desc    Get All Items
// @access  Public
router.get('/',   (req, res) => {
    SoldProduct.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

module.exports = router 