const express = require('express')
const {createCar, getProduct, updateCar, deleteCar} = require('../controllers/carcontroller')
const { body } = require('express-validator')
const { uploads } = require('../helpers/multerMidlewar')
const routes = express.Router()

routes.get('/', getProduct)

routes.post('/create', 
    uploads,
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty(),
    createCar
)

routes.put('/update/:id', updateCar)
routes.delete('/delete/:id', deleteCar)



module.exports = routes