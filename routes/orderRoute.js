const express = require('express');
const { createOrder, updateOrder, deletOrder, getOrders } = require('../controllers/ordercontroller');
const routes = express.Router();



routes.get('/orders', getOrders)
routes.post('/',createOrder)
routes.put('/uporder/:id', updateOrder)
routes.delete('/del/:id', deletOrder)




module.exports = routes