const express = require('express');
const router = express.Router();

//Models
const blogpost = require('../models/blogpost');

//Layouts
const indexLayout = '../views/layouts/index-layout';
const chatLayout = '../views/layouts/chat-layout';

//Routes
//GET - ROOT/INDEX
router.get('/', (req, res) => {
    try {
        res.render('index', {layout: indexLayout});
    } catch (error) {
        console.log(error);
    }
});

//GET - HOME
// router.get('/home', authMiddleware, (req,res)=>{
//     try{
//         res.render('home');
//     } catch(error){
//         console.log(error);
//     }
// });

//GET - BMI
router.get('/bmi', (req, res) => {
    try {
        res.render('bmi/bmi');
    } catch (error) {
        console.log(error);
    }
});


/*-----------------------------------------*/
//Routes for blogposts

//GET - BLOGPOST
router.get('/blogpost/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const blogposts = await blogpost.findById({_id: slug});
        res.render('blogPost/blogpost', { data: blogposts });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;