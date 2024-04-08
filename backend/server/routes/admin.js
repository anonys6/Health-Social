const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); //Encryption and Decryption
const user = require('../models/user');


//JWT secret
const jwtSecret = process.env.JWT_SECRET;

//To check login - utility to make functions exclusive when user is logged in
const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch(error){
        return res.status(401).json({message:'Unauthorized'});
    }
}

//ROUTES
//GET - Login
router.get('/login', (req, res)=>{
    try{
        res.render('login');
    } catch(error){
        console.log(error);
    }
});

//POST - Check login
router.post('/login', async(req,res)=>{
    try{
        const {username, password} = req.body;

        const loginUser = await user.findOne({username});
        if(!loginUser){
            return res.status(401).json({message:'invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, loginUser.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId:loginUser._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});
        
        // return res.status(200).json({message:'logged in'});
        res.redirect('/home');
    } catch(error){
        console.log(error);
    }
})

//GET - signup
router.get('/signup', (req,res)=>{
    try{
        res.render('signup');
    } catch(error){
        console.log(error);
    }
})

//POST - Signup User
router.post('/signup', async(req, res)=>{
    try {
        const {name, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            const signupUsers = await user.create({name, username, password:hashedPassword});
            // res.status(201).json({message:"User created", signupUsers});
            res.redirect('/login');
        } catch(error){
            console.log(error);
        }

    } catch(error){
        if(error.code===11000){
            res.status(409).json({message:"User already exists"});
        }
        res.status(500).json({message:"Internal Server Error"});
    }
})


module.exports = router;