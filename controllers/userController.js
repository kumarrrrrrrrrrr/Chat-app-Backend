const asyncHandler = require('express-async-handler');
const { create } = require('../models/userModule');
const User = require('../models/userModule');
const generateToken = require('../dbConfig/genToken')
const registerUser = asyncHandler(async(req,res)=>{
    const{name,email,password,pic}=req.body;
    if(!name||!email||!password){
        res.status(400);
        throw new Error("please Enter all the Fields")
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).send('user already exists')
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if(user){
        res.status(201).json({
            message:'user Created Successfully',
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Failed to create user")
    }
})

const authUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            message:"user login Successfully",
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400).send('Invalid Email and Password')
         console.log('Invalid Email and Password' );

    }
})
//  /api/user?search=sai
const allUser = asyncHandler(async(req,res)=>{
    const keyword = req.query.search?{
        $or:[
            {name:{$regex:req.query.search, $options:"i"}},
            {email:{$regex:req.query.search, $options:"i"}}
        ]
    } : {};

    const users =await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users)
})

module.exports={registerUser,authUser,allUser};