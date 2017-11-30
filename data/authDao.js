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


exports.createUser = function (req, res) {
    console.log('****IN DAO CREATE USER***')
    var date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    connection.query("SELECT * FROM USER WHERE username = '" + req.body.username + "';", function (err, result) {
        if (result.length==0) {
            connection.query("insert into user ( email_address, username, password, role, first_name, last_name, status, date_registered) values('"
                + req.body.email + "', '"
                + req.body.username + "', '"
                + req.body.password + "', '"
                + "user" + "', '"
                + req.body.firstname + "', '"
                + req.body.lastname + "', '"
                + "active" + "', '"
                + date + "')",
                function (err, result) {
                    if (err) throw err

                })
        }
        else if(result.length > 0){
            console.log("****************************" + err);
        }
        else if(err){

        }

        // res.render('index', { user: user });

    })





}


exports.login = function (req, res) {
    console.log('****IN DAO CREATE USER***')
    console.log("SELECT * FROM USER WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'; ")

    connection.query("SELECT * FROM USER WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'; ",
        function (err, result) {
            if (err) {
                console.log("****************************" + err);
            }
            else {
                
            }
        })


}



exports.getUser = function (req, res) {
    console.log('****IN DAO***');
    var userRes = {};
    connection.query("SELECT * FROM USER WHERE id = 1", function (err, result) {
        if (err) throw err
        var str = JSON.stringify(result);
        console.log("str: " + JSON.stringify(str))
        var resultJSON = JSON.parse(str);
        console.log('resultJSON ' + JSON.stringify(resultJSON[0]));
        userRes = resultJSON[0];
        console.log("userRes2: " + JSON.stringify(userRes))
        res.send(userRes);
        // var user = {

        //     address: {
        //         street: "7400 E Orchard Rd",
        //         city: 'Denver',
        //         state: 'Colorado',
        //         zip: '96797'
        //     },
        //     username: resultJSON[0].username,
        //     password: resultJSON[0].password
        // }
        // userRes= {
        //     username: resultJSON[0].username,
        //     password: resultJSON[0].password
        // }
        // console.log("userRes1: " + JSON.stringify(userRes))
        // console.log('user ' + JSON.stringify(user));
        // console.log('resultJSON[0] ' + resultJSON[0]);
        // console.log("result: " + result)
        // console.log('in controller: ' + user);
        // res.render('index', { user: user });
        
     
    })
    // setTimeout(function(){
    //     return userRes;
    // },500);
   
    // res.redirect('/views/contact.html');
}