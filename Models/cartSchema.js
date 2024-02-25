const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cartImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

})

const carts=mongoose.model("carts",cartSchema)
module.exports=carts