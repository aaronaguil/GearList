var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

router.post('/post/submit', function (req, res) {
    console.log("title: " + req.body.title)
    console.log("description: " + req.body.description)
    postController.createPost(req, res);
 })

router.get('/posts/user/:id', function (req, res) {
    var uid = req.params.id;
    postController.getUserPosts(req, res, uid);
 })
 
 router.get('/posts/total', function (req, res) {
     console.log('in /posts/total')
     postController.getTotalPosts(req, res);
  })

router.get('/posts/:pageNum', function (req, res) {
    var pageNum = req.params.pageNum;
    postController.getAllPosts(req, res, pageNum);
 })

router.get('/posts/likes/:pid', function (req, res) {
    var pid = req.params.pid;
    postController.getPostsLikes(req, res, pid);
 })

 module.exports = router; 