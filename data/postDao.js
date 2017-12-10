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

exports.getUserPosts = function (req, res, uid, pageNum) {
    var min = ((pageNum - 1) * 100);

    console.log("select p.id,  p.title, p.description, (select image from image where post_id = p.id limit 1) as image, (select count(id) from user_like_post where post_id = p.id) as likes, (select count(id) from user_like_post"
    + " where user_id = " + uid + " and post_id = p.id) as user_liked, p.timestamp from user_followed_folder uff join folder f on f.id = uff.folder_id join post p on p.folder_id = f.id where uff.user_id = " + uid
    + " and p.timestamp != '0000-00-00 00:00:00' order by p.timestamp desc limit " + min + ", 100;");

    connection.query("select p.id,  p.title, p.description, (select image from image where post_id = p.id limit 1) as image, (select count(id) from user_like_post where post_id = p.id) as likes, (select count(id) from user_like_post"
    + " where user_id = " + uid + " and post_id = p.id) as user_liked, p.timestamp from user_followed_folder uff join folder f on f.id = uff.folder_id join post p on p.folder_id = f.id where uff.user_id = " + uid
    + " and p.timestamp != '0000-00-00 00:00:00' order by p.timestamp desc limit " + min + ", 100;",
        function (err, posts) {
            console.log(err)
            var strPosts = JSON.stringify(posts);
            var postsJSON = JSON.parse(strPosts);
            for(var i = 0; i <postsJSON.length; i++){
                if(postsJSON[i].user_liked == '1'){
                    console.log('*********************************')
                    console.log(postsJSON[i])
                    console.log('*********************************')
                }
            }
            // console.log(postsJSON)
            res.send(postsJSON);
        });
}

exports.getPostsLikes = function (req, res, pid) {
    connection.query("SELECT COUNT(id) AS COUNT FROM USER_LIKE_POST WHERE post_id = " + pid + ";",
        function (err, likes) {
            var strLikesCount = JSON.stringify(likes[0]);
            var likesCountJSON = JSON.parse(strLikesCount);
            var totalPostLikes = likesCountJSON.COUNT
            res.send(JSON.stringify(totalPostLikes));
        });
}

exports.getUserPostLikes = function (req, res, uid, pid) {
    connection.query("SELECT id FROM USER_LIKE_POST WHERE user_id = " + uid + " and post_id = " + pid + ";",
        function (err, userLiked) {
            
            if(userLiked.length == 0){
                res.send("FALSE")
            }
            else{
                res.send("TRUE")
            }
        });
}

exports.userLikedPost = function (req, res, uid, pid) {
    var date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    connection.query("INSERT INTO USER_LIKE_POST (timestamp, user_id, post_id) VALUES('" + date + "', " + uid + ", " + pid + ");",
        function (err, userLiked) {
            if(err) console.log(err);
          res.send("updated");
        });
}

exports.userUnlikedPost = function (req, res, uid, pid) {
    connection.query("DELETE FROM USER_LIKE_POST WHERE user_id = " + uid + " and post_id = " + pid + ";",
        function (err, userLiked) {
            if(err) console.log(err);            
            res.send("updated")
        });
}

exports.getAllPosts = function (req, res, pageNum) {
    var min = ((pageNum - 1) * 100);
    connection.query("SELECT COUNT(id) AS COUNT FROM POST",
        function (err, count) {
            var strCount = JSON.stringify(count[0]);
            var countJSON = JSON.parse(strCount);
            totalPosts = countJSON.COUNT

            connection.query("select p.id, p.title, p.description, (select image from image where post_id = p.id limit 1) as image, (select count(id) from user_like_post where post_id = p.id) as likes, p.timestamp from post p where "
            + "p.timestamp != '0000-00-00 00:00:00' order by p.timestamp limit " + min + ", 100;",
                function (err, posts) {
                    var strPosts = JSON.stringify(posts);
                    var postsJSON = JSON.parse(strPosts);
                    // console.log(postsJSON)
                    res.send(postsJSON);
                });
        });
}

exports.getTotalPosts = function (req, res) {
    console.log('in post dao get total posts')
    res.send(JSON.stringify(totalPosts));
}
