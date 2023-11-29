const express = require('express');
const {getAllUsers, createUser, Login, updateUser, deleteUser} = require('../controllers/usercontroller');
const routes = express.Router();




routes.get('/users', getAllUsers)
routes.post('/signup', createUser);
routes.post('/login', Login);
routes.put('/:id', updateUser)
routes.delete('/:id', deleteUser)









module.exports = routes;