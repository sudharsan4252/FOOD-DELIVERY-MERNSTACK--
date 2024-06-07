import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";

//login user
const loginUser =async (req,res)=>{
    const{email,password}=req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.json({success:false,message:"password incorrect"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res)=>{
    const{name,password,email}=req.body;
    try {
        const exists = await userModel.findOne({email});
        //checking the user aldready exixsts 
        if(exists){
            return res.json({success:true,message:"user aldready exists"})
        }
        //validating the password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter valid email id"})
        }
        
        if(password.length<8){
            return res.json({success:false,message:"password length is short"})
        }
        //hashing the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
    const user= await newUser.save();
    const token = createToken(user._id)
    res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

export {loginUser,registerUser}