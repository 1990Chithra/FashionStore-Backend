const {json} =require('express')
const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')
//register logic
exports.register=async(req,res)=>{
    console.log("Inside the register function");

    const {username,email,password,address,pincode,phonenumber}=req.body
    const existingUser= await users.findOne({email})
    try{
        if(existingUser){
            res.status(401).json("user already registered")
        }
        else{
            const newUser= await users({
                username,email,password,address,pincode,phonenumber,brand:"",title:"",price:"",size:"",quantity:"",description:""
    
            })
            await newUser.save()
            res.status(200).json("user registration successful")
    
        }
    }
    catch(err){
        res.status(500).json("server error:" + err.message)

    }

    // console.log(`${username},${email},${password}`);

}
//login logic
exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await users.findOne({email,password})
        if(user){
            //token generation
            const token=jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})//login successful
            // res.status(401).json("Login Successful")

        }
        else{
            res.status(404).json("Invalid Login")

        }
    }
    catch(err){
        res.status(500).json("server error:" +err.message)
    }


}