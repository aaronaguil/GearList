var express = require('express');
var router = express.Router();
var dao = require('../data/postDao');



exports.createPost = function(req, res){
    // console.log("req.body: " + req)
    dao.createPost(req, res);
}

exports.getUserPosts = function(req, res, uid){
    dao.getUserPosts(req, res, uid);
}

exports.getAllPosts = function(req, res, pageNum){
    dao.getAllPosts(req, res, pageNum);
}

exports.getTotalPosts = function(req, res){
    console.log('in post controller getTotalPosts')
    dao.getTotalPosts(req, res);
}