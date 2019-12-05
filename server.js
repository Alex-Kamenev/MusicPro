//A Node framework, which will create our server routes. Great for creating APIs and stuff
var express = require('express');
//Start our app
var app = express();

//creating a connection with our database, fill it with your database's data
var mysql = require('mysql');
//It will help us getting data from our request's body
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
    //host: 'shareddb-f.hosting.stackcp.net',
    host: 'localhost',
    //user: 'usernamegoeshere',
    user: 'root',
    //password: 'passwordhere_', 
    password: '',
    //database: 'firstdatabase-3639ae5b',
    database: 'firstdatabase',
    //port: '53201',
    port: '3306',
});

var server = app.listen (3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('start');
});

connection.connect(function(error){
    if(error) console.log(error);
    else console.log('connected');
});

//Creating a GET route that returns data from the 'users' table
app.get('/user', function(req, res){
    connection.query('SELECT * FROM user', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});

//https://www.youtube.com/watch?v=ztTM50ZuKNo
//https://www.youtube.com/watch?v=MY_DEKLQiOU&t=143