var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'firstdatabase',
    port: '3306',
});

var server = app.listen (9090, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('start');
});

connection.connect(function(error){
    if(error) console.log(error);
    else console.log('connected');
});

app.get('/user', function(req, res){
    connection.query('SELECT * FROM account', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});