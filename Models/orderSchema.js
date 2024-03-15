const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
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
    userId:{
        type:String,
        required:true
    }

    
})

const profiles=mongoose.model("profiles",orderSchema)
module.exports=profiles