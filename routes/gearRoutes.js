var express = require('express');
var router = express.Router();


router.get('/gear/:category', function (req, res) {
    //get gear by category
    console.log("category: " + req.params.category)
 })

 module.exports = router; 