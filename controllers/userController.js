const userModel = require('../models/userModel')

const registerController = async(req, res) => {
    try{
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(400).json(error);
    }
}

const loginController = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email, password})

        if(!user){
            return res.status(400).json("User not found")
        }
        else{
            res.status(201).json(user);
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}

module.exports = {loginController, registerController}