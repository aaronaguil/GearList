var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

router.post('/post/submit', function (req, res) {
    console.log("title: " + req.body.title)
    console.log("description: " + req.body.description)
    postController.createPost(req, res);
 })

router.get('/posts/user/:id/:pageNum', function (req, res, pageNum) {
    var uid = req.params.id;
    var pageNum = req.params.pageNum;
    postController.getUserPosts(req, res, uid, pageNum);
 })
 
 router.get('/posts/total', function (req, res) {
     console.log('in /posts/total')
     postController.getTotalPosts(req, res);
  })
 
 router.get('/post/:id', function (req, res) {
     postController.getPostById(req, res);
  })
 
 router.get('/post/comments/:id', function (req, res) {
     postController.getPostComments(req, res);
  })
 
 router.get('/post/images/:id', function (req, res) {
     postController.getPostImages(req, res);
  })

router.get('/posts/:pageNum', function (req, res) {
    var pageNum = req.params.pageNum;
    postController.getAllPosts(req, res, pageNum);
 })

router.post('/post/like/user/add/:uid/:pid', function (req, res) {
    var uid = req.params.uid;
    var pid = req.params.pid;
    postController.userLikedPost(req, res, uid, pid);
 })

router.post('/post/like/user/delete/:uid/:pid', function (req, res) {
    var uid = req.params.uid;
    var pid = req.params.pid;
    postController.userUnlikedPost(req, res, uid, pid);
 })

router.get('/posts/likes/user/:uid/:pid', function (req, res) {
    var uid = req.params.uid;
    var pid = req.params.pid;
    postController.getUserPostLikes(req, res, uid, pid);
 })

router.get('/posts/likes/:pid', function (req, res) {
    var pid = req.params.pid;
    postController.getPostsLikes(req, res, pid);
 })

 module.exports = router; 