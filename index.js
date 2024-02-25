//load env file into process.env
require('dotenv').config()

const express=require('express');

const cors=require('cors');

const db=require('./DB/connection')

const router=require('./Router/route')

const jwtMiddleware=require('./Middlewares/jwtMiddleware')

const cartServer=express("");

cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(router)
cartServer.use('/uploads',express.static('uploads'))//to export image from server to client

//port creation

const PORT = 4000 || process.env.PORT

//server listen

cartServer.listen(PORT,()=>{
    console.log('listening on port' +PORT);
})

cartServer.get("/",(req,res)=>{
    res.send(`<h1>Fashion store is started...</h1>`)
})