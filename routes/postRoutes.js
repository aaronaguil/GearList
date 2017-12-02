var express = require('express');
var router = express.Router();

router.post('/post/submit', function (req, res) {
    console.log("title: " + req.body.title)
    console.log("description: " + req.body.description)

 })

 module.exports = router; 