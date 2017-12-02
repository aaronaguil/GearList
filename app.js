var express = require('express');                       // Express is a small framework for managing routing, require essentially imports it
var path = require('path');                             // [@aaron COMMENT REQUEST]
var app = express();                                    // express() creates an express application object stored in var app 
var bodyParser = require('body-parser');                // body-parser is a codebase that will help us format communications in JSON
app.use(bodyParser.urlencoded({extended:true}));        // [@aaron COMMENT REQUEST]
app.use(bodyParser.json());                             // Tell body-parser that our communication format is JSON
app.use(express.static(__dirname + '/public'));         // [@aaron COMMENT REQUEST]

var authRoutes = require('./routes/authRoutes');        // store an object that represents the authroutes fil in var authRoutes
app.use('', authRoutes);                                // tells the express application object app to look in authRoutes for routing

var postRoutes = require('./routes/postRoutes');
app.use('', postRoutes);                                

// var gearRoutes = require('./routes/gearRoutes');
// app.use('/gear/', gearRoutes);
// var userRoutes = require('./routes/userRoutes');
// app.use('/user/', userRoutes);


app.get('/', function(req, res) {                           // Render index.html when we go to the home page
    res.sendFile(path.resolve('./views/index.html'));
});

app.listen(8080);                                           // Wait for users on this port to send requests

