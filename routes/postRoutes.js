var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

router.post('/post/submit', function (req, res) {
    console.log("title: " + req.body.title)
    console.log("description: " + req.body.description)
    postController.createPost(req, res);
 })

 module.exports = router; 