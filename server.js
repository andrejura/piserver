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
    (username TEXT, \
    email TEXT, \
    password TEXT)");
});
app.use(express.static(path.join(__dirname, '/public')));
app.post("/", function(req, res) {
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, field, file) {
        if (err) {
            return res.sendStatus(500);
        }
            var stmt = db.prepare(" \ INSERT INTO Users \
            (username, \
            email, \
            password) \
            VALUES (?, ?, ?)");
            stmt.run(field.username, field.email, field.password);
            stmt.finalize();
            return res.sendFile(__dirname + "/public/index.html");
    });
});
app.get("/signup", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.post("/login", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, field, file) {
        if (err) {
            return res.sendStatus(500);
        }
        else {
            db.all('SELECT * FROM Users', function(err, rows) {
                if (err) {
                    return res.sendStatus(500);
                }
                else {
                    rows.forEach(function(row) {
                        if (row.username == field.username || row.email == field.username) {
                            if (row.password == field.password) {
                                console.log("Logged.");
                                return res.sendFile(__dirname + "/public/index2.html");
                            }
                            else {
                                console.log("Wrong password.");
                                return res.send("Wrong password!");
                            }
                        }
                    });
                }
            });
        }
    });
});


app.get('*', function(req, res) {
    res.send('Not yet available.');
});

app.listen(port);
// Console will print the message
console.log('Server running on port ' + port + "!");