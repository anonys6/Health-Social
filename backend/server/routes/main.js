const express = require('express');
const router = express.Router();

//Routes
//GET - home
router.get('/', (req, res)=>{
    res.render('index');
})


module.exports = router;