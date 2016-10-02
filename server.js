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
var db = new sqlite3.Database('./database.db');
var formidable = require('formidable');

db.serialize(function() {
    db.run(" \ CREATE TABLE IF NOT EXISTS Users \
    (Username TEXT, \
    Email TEXT, \
    password TEXT)");
});

app.use(express.static(path.join(__dirname, '/public')));


app.post("/", function(req, res) {
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, field, file) {
        if (err) {
            res.sendStatuss(500);
        }
            var stmt = db.prepare(" \ INSERT INTO Users \
            (Username, \
            Email, \
            Password) \
            VALUES (?, ?, ?)");
            stmt.run(field.Username, field.Email, field.Password);
            stmt.finalize();
            res.sendFile(__dirname + "/public/index.html");
    });
});
app.get("/signup", function(req, res) {
    res.sendFile(__dirname + "/public/register.html");
});


app.post("/login", function(req, res) {
    console.log(req.body);
    res.redirect('back');
});
app.get('*', function(req, res) {
    res.send('Not yet available.');
});

app.listen(port);

// Console will print the message
console.log('Server running on port ' + port + "!");
