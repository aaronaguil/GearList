var express = require('express');
var router = express.Router();
var dao = require('../data/authDao');
var app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


