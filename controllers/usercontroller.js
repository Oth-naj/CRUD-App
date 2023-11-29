const { validationResult, Result } = require('express-validator');
const user = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// get all users 
const getAllUsers = async (req, res) => {
    let users = await user.find();
   res.json(users)
}


// create new user
const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword

    })
    newUser.save().then(result => {
        res.json('user created successfully!')
    }).catch(error=>{
        res.json('error!')

    })

}

// post Login 

const Login = async(req,res)=>{
    console.log(req.body.email)
    const userExist =await user.findOne({   
        email : req.body.email
    }).then(user=>{
        console.log(user);
        const comparePassword = bcrypt.compareSync(req.body.password, user.password)
        if(!comparePassword){
            res.status(404).json({error: "wrong password!"})
        } 
        const token = jwt.sign({ user: user }, 'secret-key');
        res.status(200).json({message : "logged in successfully",token:token})
    })
    
    
    }

// update user

const updateUser=async(req,res)=>{
    let id =req.params.id
    let findUser= await user.findOne({
      _id: id

    });
    
    
    findUser.email=req.body.email
    findUser.password=req.body.password
    
    findUser.save();
     res.json(findUser);

   
}

// Delete user
const deleteUser =(req,res)=>{
    user.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id)})
    .then(result => {
        res.status(200).json({
            message: "User deleted!"
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
    getAllUsers, createUser, Login, updateUser, deleteUser
}