var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var authDao = require('./authDao');
var totalPosts = 0;
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

    exports.getUserPosts = function(req, res, uid){
        connection.query("SELECT p.id, p.title, p.description, i.image FROM POST p JOIN FOLDER f  ON f.id = p.folder_id JOIN IMAGE i ON i.post_id = p.id WHERE f.user_id = " + uid + ";",
        function (err, posts) {
            console.log("result length: " + posts.length)
            var strPosts = JSON.stringify(posts);
            console.log("str: " + JSON.stringify(strPosts))
            var postsJSON = JSON.parse(strPosts);
            for(var i = 0; i< posts.length; i++){
                console.log(postsJSON[i])
            }
            // console.log(postsJSON)
            res.send(postsJSON);
        });
    }

    exports.getAllPosts = function(req, res, pageNum){
        var min = ((pageNum-1) * 100) + 1;
        connection.query("SELECT COUNT(id) AS COUNT FROM POST",
        function (err, count) {
            var strCount = JSON.stringify(count[0]);
            var countJSON = JSON.parse(strCount);
            totalPosts = countJSON.COUNT
            console.log("totalPosts: " + totalPosts);
            
            connection.query("SELECT p.id, p.title, p.description, i.image FROM POST p JOIN IMAGE i ON i.post_id = p.id  GROUP BY p.id limit " + min + ", 100;",
            function (err, posts) {
                console.log("result length: " + posts.length)
                var strPosts = JSON.stringify(posts);
                // console.log("str: " + JSON.stringify(strPosts))
                var postsJSON = JSON.parse(strPosts);
                for(var i = 0; i< posts.length; i++){
                    console.log(postsJSON[i])
                }
                // console.log(postsJSON)
                res.send(postsJSON);
            });
        });
    }

    exports.getTotalPosts = function(req, res){
        console.log('in post dao get total posts')
        res.send(JSON.stringify(totalPosts));
    }
