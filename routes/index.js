
var express = require('express');
var router = express.Router();


/* GET home page. */
// const {RegisterUser} = require('../service/User/UserAuth/regiserUser');


router.get('/home', function(req, res, next) {
    
    res.json({ title: 'hello' })
    
});



module.exports = router;
