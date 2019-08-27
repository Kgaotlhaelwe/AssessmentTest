const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth') ;


const Customer = require('../Models/customer');

router.post('/',auth,(req, res) => {

    
    const newCustomer = new Customer({
        name: req.body.name ,
        surname:req.body.surname ,
        idNumber:req.body.idNumber
    });

    newCustomer.save().then(item => {
        res.json(item)
    })
})


router.get('/' , (req, res) => {
    Customer.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

module.exports = router 