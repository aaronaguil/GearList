var express = require('express');
var router = express.Router();
var dao = require('../data/postDao');



exports.createPost = function(req, res){
    // console.log("req.body: " + req)
    dao.createPost(req, res);
}

exports.getUserPosts = function(req, res, uid, pageNum){
    dao.getUserPosts(req, res, uid, pageNum);
}

exports.getAllPosts = function(req, res, pageNum){
    dao.getAllPosts(req, res, pageNum);
}

exports.getTotalPosts = function(req, res){
    console.log('in post controller getTotalPosts')
    dao.getTotalPosts(req, res);
}

exports.getPostsLikes = function(req, res, pid){
    dao.getPostsLikes(req, res, pid);
}

exports.userLikedPost = function(req, res, uid, pid){
    dao.userLikedPost(req, res, uid, pid);
}

exports.userUnlikedPost = function(req, res, uid, pid){
    dao.userUnlikedPost(req, res, uid, pid);
}

exports.getUserPostLikes = function(req, res, uid, pid){
    
    dao.getUserPostLikes(req, res, uid, pid);
}