var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// main.js


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gear_list'
})

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')
})


exports.createPost = function (req, res) {
    console.log('****IN DAO CREATE POST***')
    var date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    connection.query("insert into post (title, description, timestamp, folder_id, user_id) values('"
                     + req.body.title + "', '"
                     + req.body.description + "', '"
                     + date + "', "
                     + 1 + ", "
                     + 1 + ")",
                     function (err, result) {
                        if (err) throw err
                   
                     })
    res.send();
}
