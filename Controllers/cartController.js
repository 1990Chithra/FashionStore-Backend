const carts=require('../Models/cartSchema')

exports.addUserProduct=async(req,res)=>{
    console.log('Inside addUserProduct');
    // res.status(200).json("Add user product request")
    //userId get
    const userId=req.payload
    //get addUserProduct
    const {brand,title,price,size,quantity,description}=req.body

    //get the image
    cartImage=req.file.filename
    console.log(cartImage);
    //logic of adding new user product
    try{
        const existingProduct=await carts.findOne({brand})
        if(existingProduct){
            res.status(406).json("Product already exist")
        }
        else{
            const newProduct=new carts({brand,title,price,size,quantity,description,cartImage,userId})
            await newProduct.save()//save new product into mongoDB
            res.status(200).json(newProduct)
        }
    }
    catch(err){
        res.status(404).json({message:err.message})

    }
}
//get user-product
exports.getUserProduct=async(req,res)=>{
    //get user id
    const userId=req.payload
    //api request
    try{
        //get product details of particular user
        const userProduct=await carts.find({userId})
        console.log(userProduct);
        res.status(200).json(userProduct)

    }
    catch(err){
        res.status(401).json(err.message)
    }


}
exports.getAllProducts=async(req,res)=>{
         const searchKey=req.query.search
         const query={
            brand:{
                $regex:searchKey,
                $options:"i"
            }
         }
        try{
            const Allproducts=await carts.find()
            res.status(200).json(Allproducts)


        }
        catch(err){
            res.status(401).json(err.message)
        }
}
//get all home products
exports.getHomeProduct=async(req,res)=>{
    try{
        const HomeProduct=await carts.find().limit(6)
        res.status(200).json(HomeProduct)

    }
    catch(err){
        res.status(401).json(err.message)
    }

}
exports.editProduct=async(req,res)=>{
    const {brand,title,price,size,quantity,description,cartImage}=req.body
    const uploadImage=req.file?req.file.filename:cartImage
    const userId=req.payload
    const {id}=req.params
    try{
        //find the particular productId in mongodb and add the update product details
        const updateProduct=await carts.findByIdAndUpdate({_id:id},
        {brand,title,price,size,quantity,description,cartImage:uploadImage,userId},{new:true})
        //save the updated product details
        await updateProduct.save()
        //response send back to the client
        res.status(200).json(updateProduct)

    }
    catch(err){
        res.status(401).json(err)
    }


}
exports.deleteProduct=async(req,res)=>{
    const {pid}=req.params
    try{
        const deleteData=await carts.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }
    catch(err){

        res.status(401).json(err)

    }
}