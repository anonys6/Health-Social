const express = require('express');
const router = express.Router();

//Routes
//GET - ROOT
router.get('/', (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.log(error);
    }
});


//GET - BMI
router.get('/bmi', (req, res) => {
    try {
        res.render('bmi/bmi');
    } catch (error) {
        console.log(error);
    }
});







module.exports = router;