const {json} =require('express')
const profiles=require('../Models/orderSchema')


const jwt=require('jsonwebtoken')
exports.addOrders=async(req,res)=>{
    console.log("Inside the order function");
    //userId get
    const userId=req.payload

    //get addUserProduct
    const {name,address,pincode,phonenumber,reviews}=req.body
    //logic of adding new user product
    try{
        const existingProfile=await profiles.findOne({phonenumber})
        if(existingProfile){
            res.status(406).json(existingProfile)
        }
        else{
            const newProfile=new profiles({name,address,pincode,phonenumber,reviews,userId})
            await newProfile.save()//save new product into mongoDB
            res.status(200).json(newProfile)
        }
    }
    catch(err){
        res.status(404).json({message:err.message})

    }

}
exports.editOrders=async(req,res)=>{
    const {name,address,pincode,phonenumber,reviews}=req.body
    const userId=req.payload
    const {id}=req.params
    try{
        //find the particular productId in mongodb and add the update product details
        const updateProfile=await profiles.findByIdAndUpdate({_id:id},
        {name,address,pincode,phonenumber,reviews,userId},{new:true})
        //save the updated product details
        await updateProfile.save()
        //response send back to the client
        res.status(200).json(updateProfile)

    }
    catch(err){
        res.status(401).json(err)
    }

}
exports.getUserProfile=async(req,res)=>{
    //get user id
    const userId=req.payload
    //api request
    try{
        //get product details of particular user
        const userProfile=await profiles.find({userId})
        console.log(userProfile);
        res.status(200).json(userProfile)

    }
    catch(err){
        res.status(401).json(err.message)
    }


}
exports.getAllProfiles=async(req,res)=>{

   try{
       const Allprofiles=await profiles.find()
       res.status(200).json(Allprofiles)


   }
   catch(err){
       res.status(401).json(err.message)
   }
}
exports.deleteProfile=async(req,res)=>{
    const {psid}=req.params
    try{
        const deleteData=await profiles.findByIdAndDelete({_id:psid})
        res.status(200).json(deleteData)
    }
    catch(err){

        res.status(401).json(err)

    }
}