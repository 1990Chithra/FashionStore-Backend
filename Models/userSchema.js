const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    pincode:{
        type:String,
    },
    phonenumber:{
        type:String,
    },
    reviews:{
        type:String,
    },
    brand:{
        type:String,
    },
    title:{
        type:String,
    },
    price:{
        type:String,
    },
    size:{
        type:String,
    },
    quantity:{
        type:String,
    },
    description:{
        type:String,
    },
    address:{
        type:String,
    },
    pincode:{
        type:String,
    },
    phonenumber:{
        type:String,
    }
})

const users=mongoose.model("users",userSchema)
module.exports=users