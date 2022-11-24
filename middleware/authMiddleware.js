const jwt = require('jsonwebtoken')
const User = require('../models/userModule');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req, res, next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(' ')[1];
            //decode token id
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user =  await User.findById(decode.id).select('-password');
            next()
        } catch (error) {
            res.status(401)
            console.log('Not Authorized, token failed');
        }
    }
    if(!token){
        res.status(401)
        console.log('Not Authorized, token failed');
    }
})

module.exports={protect}