const Product = require('../models/product')
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');


// get car product 

const getProduct = async(req, res) => {
    let product = await product.find()
    res.json(product)
}



// create Car product 

const createCar = (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({error: result.array()})
    }


    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file.originalname
    })

    newProduct.save()

    res.json(newProduct)
}

// update Product 

const updateCar = async(req, res) => {
    let id = req.params.id
    
    let findProduct = await Product.findOne({
        _id : id
    })
    findProduct.name = req.body.name
    findProduct.description = req.body.description
    findProduct.price = req.body.price
    findProduct.save()
    res.json(findProduct)
}

// delete product 

const deleteCar = (req, res) => {
    Product.deleteOne({
        _id: new mongoose.Types.ObjectId(req.params.id)
    }).then(result => {
        res.status(200).json({
            message: "Car deleted successfuly"
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}


module.exports = {createCar, getProduct, updateCar, deleteCar} ;