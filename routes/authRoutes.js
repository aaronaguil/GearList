var express = require('express');
var app = express();
var router = express.Router();
var authController = require('../controllers/authController');


router.post('/auth/register', function (req, res) {
    console.log('****IN authRoutes.js /auth/register****')
    console.log('username: ' + req.body.username)
    console.log('password: ' + req.body.password)
    console.log('email: ' + req.body.email)
    console.log('first name: ' + req.body.firstname)
    console.log('last name: ' + req.body.lastname)
    console.log("insert into user (username, password) values('" + req.body.username + "', '" + req.body.password + "')")
    authController.createUser(req, res);
    
})



router.post('/auth/login', function (req, res) {
    console.log('****IN authRoutes.js /auth/login****')
    authController.login(req, res);
    
})

router.get('/auth/', function (req, res) {
    console.log('testing index')
   authController.home();
})

router.get('/auth/user/:id', function (req, res) {
    console.log("/user/:id " + req.params.id)
    console.log("SELECT * FROM USER WHERE id = 1");
    authController.getUser(req, res);
    
    
})

router.get('/auth/user/:uid', function (req, res) {
    console.log("/user/:uid " + req.params.uid)
    console.log(req.body.username)
    console.log(req.body.password)
    console.log("SELECT * FROM USER WHERE id = 1");
    authController.getUser(req, res);
    
    
})


module.exports = router;