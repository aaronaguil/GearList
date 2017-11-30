var express = require('express');                       // Express is a small framework for managing routing, require essentially imports it
var path = require('path');                             // [@aaron COMMENT REQUEST]
var app = express();                                    // express() creates an express application object stored in var app 
var bodyParser = require('body-parser');                // body-parser is a codebase that will help us format communications in JSON
app.use(bodyParser.urlencoded({extended:true}));        // [@aaron COMMENT REQUEST]
app.use(bodyParser.json());                             // Tell body-parser that our communication format is JSON
app.use(express.static(__dirname + '/public'));         // [@aaron COMMENT REQUEST]

var authRoutes = require('./routes/authRoutes');        // store an object that represents the authroutes fil in var authRoutes
app.use('', authRoutes);                                // tells the express application object app to look in authRoutes for routing
// var gearRoutes = require('./routes/gearRoutes');
// app.use('/gear/', gearRoutes);
// var userRoutes = require('./routes/userRoutes');
// app.use('/user/', userRoutes);

//handlebars
var handlebars = require('express-handlebars')
.create({defaultLayout: 'main'});
var hbs = require('handlebars');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Handlebars.registerHelper('login', function() {
//     return 'false'; //just return global variable value
//   });



//   hbs.registerHelper('ifEquals', function(a, b, opts) {
//     console.log("value of a: " + a)
//     console.log("value of b: " + b)
//     console.log("opts: " + opts.inverse(this))
//     if(a == b) // Or === depending on your needs
//         return opts.fn(this);
//     else
//         return opts.inverse(this);
// });

// hbs.registerHelper('ifLoggedIn', function(opts) {
//         return opts.fn(this);

// });

// app.get('/public/bootstrap.min.js',function(req,res){
//     res.sendFile(path.join(__dirname + '/public/bootstrap.min.js')); 
//  });
 
//  app.get('/appJS/contact.js',function(req,res){
//      res.sendFile(path.join(__dirname + '/appJS/contact.js')); 
//  });
 
//  app.get('/appJS/style.css',function(req,res){
//      res.sendFile(path.join(__dirname + '/appJS/style.css')); 
//  });


//  //custom 404
// app.use(function(req, res){
//     res.status(404);
//     res.render('404');
// });

// //custom 500
// app.use(function(err, req, res, next){
//     console.log(err.stack);
//     console.log("test")
//     res.status(500);
//     res.render('500');
// });

app.get('/', function(req, res) {                           // Render index.html when we go to the home page
    res.sendFile(path.resolve('./views/index.html'));
});

app.listen(8080);                                           // Wait for users on this port to send requests




// var express = require('express')


// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route

// define the about route

