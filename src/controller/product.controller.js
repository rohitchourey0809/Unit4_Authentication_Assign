

const express = require('express')
const Product = require('../models/product.model')
const authenticate = require("../middlerware/authenticate")
const router  = express.Router() 

router.post("/",authenticate,async (req,res)=>
// console.log(req)
{
    console.log(req)
    //  req.userID = decoded.user._id;
    req.body.user._id = req.user._id
    try{
        const product  = await Product.create(req.body)
        console.log(product)
        return res.status(200)
.send(product)   
 } catch(err){
     return res.status(400).send({message: err.message})
 }

})

module.exports = router;

