const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        ref:'User',
        type: mongoose.Schema.Types.ObjectId
    },
    Products:[{
          proId:{
            ref:'Product',
           type: mongoose.Schema.Types.ObjectId
        }
     }],
    price:{
        type: Number,
        required : true
    },
    quantite:{
        type: Number,
        required : true
    },
    status:{
        type:String,
        enum:['pending', 'done', 'error'],
        default: "pending"
    }
})

const order = mongoose.model('order',orderSchema)

module.exports = order ;