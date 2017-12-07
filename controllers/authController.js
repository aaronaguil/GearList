var express = require('express');
var router = express.Router();
var dao = require('../data/authDao');


exports.getCurrentUser =  function(req, res){
    var user = dao.getCurrentUser(req, res);
    console.log("user in auth controller: " + user);
}

exports.createUser = function(req, res){
    // console.log("req.body: " + req)
    dao.createUser(req, res);
}

exports.login = function(req, res){
    dao.login(req, res);    
}

exports.logout = function(req, res){
    dao.logout(req, res);    
}

exports.getUser = function(req, res){
   dao.getUser(req, res);
   console.log("user in authController: ");

    // res.render('index');
    // console.log('in controller: ' + user);
    // res.render('index', user);
}

exports.home = function(req, res){
    res.render('index');
}
