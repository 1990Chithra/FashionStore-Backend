const express=require('express');

const userController=require('../Controllers/userController')
const cartController=require('../Controllers/cartController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/multerMiddleware')

const router=new express.Router();


//Register API routes-localhost-4000/register

router.post('/register',userController.register)

//Register API routes-localhost-4000/login

router.post('/login',userController.login)

//add user product api routes-localhost:4000/product/add

router.post('/product/add',jwtMiddleware,multerConfig.single('cartImage'),cartController.addUserProduct)

//add user product api routes-localhost:4000/product/all-user-products
router.get('/product/all-user-products',jwtMiddleware,cartController.getUserProduct)

//add all product api routes-localhost:4000/product/all-products

router.get('/product/all-products',jwtMiddleware,cartController.getAllProducts)

//add home product api routes-localhost:4000/product/home-products

router.get('/product/home-products',cartController.getHomeProduct)

//update user product api routes-localhost:4000/product/update-product/678970000
router.put('/product/update-product/:id',jwtMiddleware,multerConfig.single('cartImage'),cartController.editProduct)

//delete user product api routes-localhost:4000/product/delete-product/563665765774
router.delete('/product/delete-product/:pid',jwtMiddleware,cartController.deleteProduct)


module.exports=router