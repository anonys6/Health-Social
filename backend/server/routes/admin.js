const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); //Encryption and Decryption
const path = require('path');
const multer = require('multer');

//Models
// const user = require('../models/user');
const user = require('../models/user');
const blogpost = require('../models/blogpost');

//JWT secret
const jwtSecret = process.env.JWT_SECRET;

//Layouts
const indexLayout = '../views/layouts/index-layout';
const mainLayout = '../views/layouts/main';

//Multer Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});


//ROUTES
//GET - signup
router.get('/signup', (req,res)=>{
    try{
        res.render('signup', {layout: mainLayout});
    } catch(error){
        console.log(error);
    }
})


//POST - Signup User
router.post('/signup', upload.single('photo'), async(req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new user({
            name: req.body.name,
            username: req.body.username,
            photo: req.file.filename,
            password: hashedPassword
        });

        try{
            await newUser.save();
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


//To check login - utility to make functions exclusive when user is logged in
const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        // req.userId = decoded.userId;
        req.user = await user.findById(decoded.userId);
        next();
    } catch(error){
        return res.status(401).json({message:'Unauthorized'});
    }
}

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


//GET - Logout
router.get('/logout', (req,res)=>{
    res.clearCookie('token');
    // res.send({message:'Logged out'});
    res.redirect('/');
});


/*----------------------------------------- */
//ROUTES with controlled access

//GET - Home
router.get('/home', authMiddleware, (req,res)=>{
    try{
        res.render('home', {layout: mainLayout});
    } catch(error){
        console.log(error);
    }
})

//GET - Blogs
router.get('/blogs', authMiddleware, async(req,res)=>{
    try{
        // const allBlogPosts = await blogPost.find().populate('author');
        const blogposts = await blogpost.find();
        res.render('blogs', {data:blogposts ,layout : mainLayout});
    } catch(error){
        console.log(error);
    }
});

//GET - Add Blogpost
router.get('/add-blogpost', authMiddleware, (req,res)=>{
    try{
        res.render('blogPost/add-blogpost', {layout: mainLayout});
    } catch(error){
        console.log(error);
    }
});

//POST - Add Blogpost
router.post('/add-blogpost', authMiddleware, async(req,res)=>{
    try{
        const newBlogpost = new blogpost({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
        });
        // await newBlogPost.save();
        await blogpost.create(newBlogpost);
        res.redirect('/blogs');
    } catch(error){
        console.log(error);
    }
});


//GET- Edit blogpost
router.get('/edit-blogpost/:id', authMiddleware, async(req,res)=>{
    try{
        const data = await blogpost.findOne({_id: req.params.id});

        res.render('blogPost/edit-blogpost', {data});
    } catch(error){
        console.log(error);
    }
});


//PUT - Edit blogpost
router.put('/edit-blogpost/:id', authMiddleware, async(req,res)=>{
    try{
        await blogpost.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            updatedAt: Date.now()
        });
        res.redirect('/blogs');
    } catch(error){
        console.log(error);
    }
});


//DELETE - Delete blogpost
router.delete('/delete-blogpost/:id', authMiddleware, async(req, res)=>{
    try{
        await blogpost.deleteOne({_id: req.params.id});
        res.redirect('/blogs');
    } catch(error){
        console.log(error);
    }
});

/**********BMI ****************/
router.get('/bmi', authMiddleware, (req, res) => {
    try {
        res.render('bmi/bmi');
    } catch (error) {
        console.log(error);
    }
});



























module.exports = router;