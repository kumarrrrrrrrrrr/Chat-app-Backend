var express = require('express');
var router = express.Router();
var {chats} = require('../data');
const dotenv = require('dotenv')
const connectDB=require('../dbConfig/db');
dotenv.config()
connectDB()

router.get('/chat',(req,res)=>{
  res.send(chats)
})











module.exports = router;
