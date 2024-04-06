const express = require('express');
const router = express.Router();

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
router.get('/home',(req,res)=>{
    try{
        res.render('home');
    } catch(error){
        console.log(error);
    }
})

//GET - CHAT
router.get('/chat', (req,res)=>{
    try{
        res.render('chat/chat', {layout: chatLayout});
    } catch(error){
        console.log(error);
    }
})

//GET - BMI
router.get('/bmi', (req, res) => {
    try {
        res.render('bmi/bmi');
    } catch (error) {
        console.log(error);
    }
});







module.exports = router;