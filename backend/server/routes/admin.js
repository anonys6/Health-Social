const express = require('express');
const router = express.Router();

//Routes
//GET - 
router.get('/admin', (req, res)=>{
    try{
        res.render('admin');
    } catch(error){
        console.log(error);
    }
});







module.exports = router;