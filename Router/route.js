const express=require('express');

const userController=require('../Controllers/userController')
const cartController=require('../Controllers/cartController')
const orderController=require('../Controllers/orderController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/multerMiddleware')


const router=new express.Router();


//Register API routes-localhost-4000/register

router.post('/admin/register',userController.register)


//Register API routes-localhost-4000/login

router.post('/admin/login',userController.login)
router.post('/user/register',userController.userregister)

router.post('/user/login',userController.userlogin)


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
router.post('/profile/add',jwtMiddleware,orderController.addOrders)
router.put('/profile/update/:id',jwtMiddleware,orderController.editOrders)
router.get('/profile/all-user-profiles',jwtMiddleware,orderController.getUserProfile)
router.get('/profile/all-profiles',jwtMiddleware,orderController.getAllProfiles)
router.delete('/profile/delete-profile/:psid',jwtMiddleware,orderController.deleteProfile)





module.exports=router