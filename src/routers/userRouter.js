const express = require("express")
const userModel = require("../schemas/userSchmea")
const bcrypt = require('bcrypt')

const userRouter = express.Router()

userRouter.post('/post',async(req,res)=>{
    const {username,email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            return res.send({message:"user already exists"})
        }
        else{
            const hashedPswd = await bcrypt.hash(password,10)
            const newUsers = new userModel({username,email,password:hashedPswd})
            await newUsers.save()
            res.send(newUsers)
        }
    } catch (error) {
        console.log(error);
        res.send({message:"failed creating users"}) 
    }
})

userRouter.get('/users',async(req,res)=>{
    try {
       const allUsers = await userModel.find()
       res.send(allUsers)
    } catch (error) {
        res.send({message:"failed getting users"})
    }
})

userRouter.get('/users/:id',async(req,res)=>{
    const id = req.params.id
    try {
       const selectedUser = await userModel.findById(id)
       res.send(selectedUser)
    } catch (error) {
        res.send({message:"failed getting users"})
    }
})

userRouter.put('/edit/:id',async(req,res)=>{
    const {username,email,password} = req.body
    const id = req.params.id
    try {
        const user = await userModel.findOne({email})
        if (user && user._id.toString() !== id){
            return res.send({message:"emailID already exists"})
        }
        else{
            const hashedPswd = await bcrypt.hash(password,10)
            const editedUser = await userModel.findByIdAndUpdate(id,{username,email,password:hashedPswd})
            res.send({message:"user updated"})
        }
        
    } catch (error) {
        console.log(error);
        res.send({message:"failed editing users"}) 
    }
})

userRouter.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    try {
        await userModel.findByIdAndDelete(id)
        res.send({message:"user deleted"})
    } catch (error) {
        res.send({message:"failed deleting users"}) 
    }
})

module.exports = userRouter

//$2b$10$PiJr9XsSJoKno95py9NZ9ucemmRhdEv6FL6RvwRBzyD5R0yHCLC0S
//$2b$10$1t9xMU7dzneCPieXEAmQ4..3ja8gHfAYOneQ/Cz/blJpCqOXz.z/S