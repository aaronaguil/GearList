var express = require('express');
var router = express.Router();
var dao = require('../data/postDao');



exports.createPost = function(req, res){
    // console.log("req.body: " + req)
    dao.createPost(req, res);
}
