const mongoose = require('mongoose');
const order = require('../models/order')
const {  validationResult } = require('express-validator');



// get all orders
const getOrders = async (req, res) => {
    let orders = await order.find();
   res.json(orders)
}

// create order
const createOrder= (req,res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({erreur:result.array()});
    }
  
  
 let newOrder = new order({
    userId:req.body.userId,
    Products:req.body.Products,
    price: req.body.price,
    quantite: req.body.quantite,
    status: req.body.status
 })
 newOrder.save();


 res.json(newOrder);
}

// update order

const updateOrder = async (req,res) => {
    let id = req.params.id
    let findOrder = await order.findOne({
      _id: id
    })

    console.log(findOrder)
    
    findOrder.quantite = req.body.quantite
       
    findOrder.save();

    res.json(findOrder);

}

// delete order

const deletOrder = (req,res) => {
    order.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id)})
    .then(result => {
        res.status(200).json({
            message: "Order deleted!"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}


module.exports = {
    createOrder, updateOrder, deletOrder, getOrders
}