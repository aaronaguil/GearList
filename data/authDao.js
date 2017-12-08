var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var userId = null;
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

exports.getCurrentUser = function(req, res){
    console.log("userId in authDao: " + userId)
    if(userId){
        console.log("in if authDao")
        this.getUser(req, res, userId);
    }
    else{
        console.log("in else authDao")
        res.send();
    }
}

exports.createUser = function (req, res) {
    console.log('****IN authDAO.js CREATE USER****')
    var date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    var queryString_findDupeUserNames = "SELECT * FROM USER WHERE username = '" + req.body.username + "';"
    var queryString_findDupeEmails = "SELECT * FROM USER WHERE email_address = '" + req.body.email + "';"
    connection.query(queryString_findDupeUserNames, function (err, res_usernamesQuery) {
            if (res_usernamesQuery.length == 0) {
                connection.query(queryString_findDupeEmails, function(err, res_emailsQuery) {
                    if (res_emailsQuery.length == 0) {
                        connection.query("insert into user ( email_address, username, password, role, first_name, last_name, status, date_registered) values('"
                        + req.body.email + "', '"
                        + req.body.username + "', '"
                        + req.body.password + "', '"
                        + "user" + "', '"
                        + req.body.firstname + "', '"
                        + req.body.lastname + "', '"
                        + "active" + "', '"
                        + date + "')",
                        function (err, res_insertQuery) {
                            if (err) throw err;
                        })
                        var strUser = JSON.stringify(result.body);
                        console.log("strUser: " + strUser);
                        console.log("strUser.username: " + strUser.username);
                        var user = JSON.parse(strUser);
                        console.log("user: " + user);
                        console.log("user.username: " + user.username);
                        res.send(user);
                    } else if (err){
                        throw err;
                    } else {
                        console.log("PREXISTING EMAIL DETECTED");
                        res.send('Prexisting email address');
                    }
                })
            } else if (err) {
                throw err;
            } else {
                console.log('****PREXISTING USERNAME DETECTED****');
                res.send('Prexisting username');
            }   
    })
}

exports.login = function (req, res) {
    console.log('****IN DAO CREATE USER***')
    console.log("SELECT * FROM USER WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'; ")

    connection.query("SELECT * FROM USER WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'; ",
        function (err, result) {
            if (result.length == 0) {
                console.log("****************************" + result.length);
                var str = JSON.stringify(result);
                // console.log("str: " + JSON.stringify(str))
                var resultJSON = JSON.parse(str);
                // console.log(resultJSON)
                res.send('invalid')
            }
            else if (result.length > 0) {
                var str = JSON.stringify(result[0]);
                // console.log("str: " + JSON.stringify(str))
                var resultJSON = JSON.parse(str);
                // console.log(resultJSON)
                userId = resultJSON.id;
                
                res.send(JSON.stringify(resultJSON.id));
                
            }
            
        })

}

exports.logout = function(req, res){
    userId = null;
    res.send();
}

exports.getUser = function (req, res, id) {
    console.log('****IN DAO***');
    var userRes = {};
    connection.query("SELECT * FROM USER WHERE id = " + id, function (err, result) {
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