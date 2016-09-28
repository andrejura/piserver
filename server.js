//Lets require/import the HTTP module
var http = require('http');
var port = process.env.PORT || 8080;
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.sqlite3');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (field INT, info TEXT)");
    var stmt = db.prepare("INSERT into users values(?,?)");
    app.post("/reg", function(req, res) {
        console.log(req.body);
    });
    stmt.finalize;
    
    db.each("SELECT id,dt FROM users", function(err, row) {
        if (err) {
            throw err;
        }
        console.log("User id:" + row.id, row.dt);  
    });
});


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));

app.get("/signup", function(req, res) {
    res.sendFile(__dirname + "/public/register.html");
});

app.post("/login", function(req, res) {
    console.log(req.body);
});
/*app.get('*', function(req, res) {
    res.send('Not yet available.');
});*/

app.listen(port);

// Console will print the message
console.log('Server running on port ' + port);

